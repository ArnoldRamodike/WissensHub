'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Chapter, Course } from '@prisma/client';
import axios from 'axios';
import { Loader2, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import ChaptersList from './ChaptersList';

interface ChaptersFormProps{
    initialData: Course & { chapters: Chapter[]};
    courseId: string;
}


const formSchema = z.object({
    title: z.string().min(1),
});

const ChaptersForm = ({initialData, courseId}: ChaptersFormProps) => {
    const form  = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });

    const [isCreating, setIsCreating] = useState(false)
    const {isSubmitting, isValid} = form.formState;
    const [isUpdating, setIsUpdating] = useState(false)
    const router = useRouter();



    const toggleCreating = () => setIsCreating((current) => !current)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/chapters`, values)
            toast.success("Chapter created successfully");
            toggleCreating();
            router.refresh();
        } catch (error) {
            toast.error("something went wrong")
        }
    }

    const onReorder = async (updatedData: {id: string, position: number}[] ) => {
        try {
            setIsUpdating(true);

            await axios.put(`api/courses/${courseId}/chapters/reorder`, {
                list: updatedData
            });
            toast.success("Chapters reorderd susccefully");
            router.refresh();
        } catch (error) {
            toast.error("something went wrong")
        }finally{
            setIsUpdating(false);
        }
    }

  return (
    <div className='relative mt-6 border bg-slate-100 rounded-md p-4'>
        {isUpdating && (
            <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center" >
                <Loader2 className='h-6 w-6 text-sky-700 animate-spin'/>
            </div>
        )}
        <div className="font-medium flex items-center justify-between">
            Course Chapters

            <Button variant={'ghost'} onClick={toggleCreating}>
                {isCreating ?(
                    <> cancel</>
                ): (
                    <>
                     <PlusCircle className='h-4 w-4 mr-2'/> Add a Chapter
                    </>
                )}
                
            </Button>
        </div>

        {isCreating  &&(
   
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        disabled={isSubmitting}
                                        placeholder="e.g 'Introduction to course'"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                        <Button disabled={!isValid || isSubmitting }>
                            Create
                        </Button>
                </form>
            </Form>
        )}

        {!isCreating && (
            <div className={cn("text-sm mt-2", !initialData.chapters.length && "text-slate-500 italic")}>
               {!initialData.chapters.length && "No chapters"}
               <ChaptersList
                 onEdit={() => {}}
                 onReorder={onReorder}
                 items= {initialData.chapters || []}
               />
            </div>
        )}
        {!isCreating && (
            <p className="text-xs text-muted-foreground mt-4">
                Drag and drop to re order the chapters
            </p>
        )}
    </div>
  )
}


export default ChaptersForm
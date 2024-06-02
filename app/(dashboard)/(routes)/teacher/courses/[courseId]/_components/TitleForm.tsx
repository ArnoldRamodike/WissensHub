'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

interface TitleFormProps{
    initialData: {
        title: string
    };
    courseId: string;
}


const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
});

const TitleForm = ({initialData, courseId}: TitleFormProps) => {

    const form  = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const {isSubmitting, isValid} = form.formState;
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const toggleEdit = () => setIsEditing((current) => !current)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values)
            toast.success("Course updated successfully");
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("something went wrong")
        }
        
    }

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
        <div className="font-medium flex items-center justify-between">
            Course Tititle

            <Button variant={'ghost'} onClick={toggleEdit}>
                {isEditing ?(
                    <> cancel</>
                ): (
                    <>
                     <Pencil className='h-4 w-4 mr-2'/> Edit Title
                    </>
                )}
                
            </Button>
        </div>

        {!isEditing ? (
            <p className='text-sm mt-2'> {initialData.title} </p>
        ): (
            <>
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
                                     placeholder="e.g 'Avanced accounting for beginners'"
                                     {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className=" flex items-center gap-x-2">
                        <Button disabled={!isValid || isSubmitting }>
                            Save
                        </Button>
                    </div>
                </form>
            </Form>
            </>
        )}
    </div>
  )
}

export default TitleForm
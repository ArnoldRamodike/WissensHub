'use client'

import FileUpload from '@/components/file-upload';
import { Button } from '@/components/ui/button';
import { Course } from '@prisma/client';
import axios from 'axios';
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { z } from 'zod';

interface DescriptionFromProps{
    initialData: Course;
    courseId: string;
}

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required"
    }),
});

const ImageForm = ({initialData, courseId}: DescriptionFromProps) => {

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
            Course Image

            <Button variant={'ghost'} onClick={toggleEdit}>
                {isEditing &&(
                    <> cancel</>
                )}
                {!isEditing && !initialData.imageUrl && (
                    <>
                    <PlusCircle className='h-4 w-4 mr-2'/> Add Image
                    </>
                )}
                {!isEditing && initialData.imageUrl && (
                    <>
                     <Pencil className='h-4 w-4 mr-2'/> Edit Image
                    </>
                )}
                
            </Button>
        </div>

        {!isEditing ? (
            <>
            {!initialData.imageUrl ? (
                <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                    <ImageIcon className='h-10 w-10 text-slate-500'/>
                </div>
            ):
            <div className="relative aspect-video mt-2">
                <Image alt='Upload' fill className='object-cover rounded-md' src={initialData.imageUrl}/>
            </div>
            }
            </>
        ): (
            <>
            <div className="">
                <FileUpload 
                    endpoint='courseImage'
                    onChange={(url) => {
                        if (url) {
                            onSubmit({imageUrl: url});
                        }
                    }}
                />

                <div className="text-xs text-muted-foreground mt-4">
                    16:9 aspect ratio reccomeded.
                </div>
            </div>
            </>
        )}
    </div>
  )
}


export default ImageForm
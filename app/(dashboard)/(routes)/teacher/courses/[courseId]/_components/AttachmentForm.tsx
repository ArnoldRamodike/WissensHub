'use client'

import FileUpload from '@/components/file-upload';
import { Button } from '@/components/ui/button';
import { Attachment, Course } from '@prisma/client';
import axios from 'axios';
import { File, Loader2, PlusCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { z } from 'zod';

interface AttachmentFormProps{
    initialData: Course & {attachments: Attachment[]};
    courseId: string;
}

const formSchema = z.object({
    url: z.string().min(1)
});

const AttachmentForm = ({initialData, courseId}: AttachmentFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const router = useRouter();

    const toggleEdit = () => setIsEditing((current) => !current)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/attachments`, values)
            toast.success("Course updated successfully");
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("something went wrong")
        }
    }

    const onDelete =  async (id: string) => {
        try {
            setDeletingId(id);
            await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
            toast.success("Attachment deleted.")
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        }finally{
            setDeletingId(null);
        }
    } 

    

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
        <div className="font-medium flex items-center justify-between">
            Course Attchements

            <Button variant={'ghost'} onClick={toggleEdit}>
                {isEditing &&(
                    <> cancel</>
                )}
                {!isEditing && (
                    <>
                    <PlusCircle className='h-4 w-4 mr-2'/> Add a file
                    </>
                )}
                {/* {!isEditing && initialData.imageUrl && (
                    <>
                     <Pencil className='h-4 w-4 mr-2'/> Edit Image
                    </>
                )} */}
                
            </Button>
        </div>

        {!isEditing ? (
            <>
            {initialData?.attachments?.length === 0 && (
                <p className='text-sm mt-2 text-slate-200 italic'> No attachments</p>
            )}
            {initialData?.attachments?.length > 0 && (
               <div className="space-y-2">
                    {initialData.attachments.map((attachemnt) => (
                        <div className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md" key={attachemnt.id}>
                            <File className='h-4 w-4 mr-2 flex-shrink-0'/>
                            <p className='text-xs line-clamp-1'>{attachemnt.name}</p>
                            {deletingId === attachemnt.id && (
                                <div className="">
                                    <Loader2 className='h-4 w-4 animate-spin'/>
                                </div>
                            )}
                            {deletingId !== attachemnt.id && (
                                <Button className="ml-auto hover:opacity-75" onClick={() => onDelete(attachemnt.id)}>
                                    <X className='h-4 w-4 '/>
                                </Button>
                            )}
                        </div>
                    ))}
               </div>
            )}
            </>
        ): (
            <>
            <div className="">
                <FileUpload 
                    endpoint='courseAttachment'
                    onChange={(url) => {
                        if (url) {
                            onSubmit({url: url});
                        }
                    }}
                />

                <div className="text-xs text-muted-foreground mt-4">
                    Add anything your students might need.
                </div>
            </div>
            </>
        )}
    </div>
  )
}


export default AttachmentForm
'use client'

import FileUpload from '@/components/file-upload';
import { Button } from '@/components/ui/button';
import { Chapter, Course, MuxData } from '@prisma/client';
import axios from 'axios';
import { ImageIcon, Pencil, PlusCircle, Video } from 'lucide-react';
import MuxPlayer from '@mux/mux-player-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { z } from 'zod';

interface ChapterVideoFormProps{
    initialData: Chapter & {muxData?: MuxData | null};
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    videoUrl: z.string().min(1,),
});

const ChapterVideoForm = ({initialData, courseId, chapterId }: ChapterVideoFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const toggleEdit = () => setIsEditing((current) => !current)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
            toast.success("Chapter updated successfully");
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("something went wrong")
        }
        
    }

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
        <div className="font-medium flex items-center justify-between">
            Course Video

            <Button variant={'ghost'} onClick={toggleEdit}>
                {isEditing &&(
                    <> cancel</>
                )}
                {!isEditing && !initialData.videoUrl && (
                    <>
                    <PlusCircle className='h-4 w-4 mr-2'/> Add a Video
                    </>
                )}
                {!isEditing && initialData.videoUrl && (
                    <>
                     <Pencil className='h-4 w-4 mr-2'/> Edit a Video
                    </>
                )}
                
            </Button>
        </div>

        {!isEditing ? (
            <>
            {!initialData.videoUrl ? (
                <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                    <Video className='h-10 w-10 text-slate-500'/>
                </div>
            ):
            <div className="relative aspect-video mt-2">
                <MuxPlayer playbackId={initialData?.muxData?.playbackId || "" }/>
            </div>
            }
            </>
        ): (
            <>
            <div className="">
                <FileUpload 
                    endpoint='chapterVideo'
                    onChange={(url) => {
                        if (url) {
                            onSubmit({videoUrl: url});
                        }
                    }}
                />

                <div className="text-xs text-muted-foreground mt-4">
                    Upload this chatper&apos;s video
                </div>
            </div>
            </>
        )}

        {initialData.videoUrl && !isEditing && (
            <div className="text-xs text-muted-foreground mt-2">
                Video can take a few minutes to process. Refresh the page if video does not appear
            </div>
        ) }
    </div>
  )
}


export default ChapterVideoForm
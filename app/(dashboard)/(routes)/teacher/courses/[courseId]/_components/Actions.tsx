"use client"

import ConfirmModal from '@/components/modals/confirmModal';
import { Button } from '@/components/ui/button';
import { useConfettiStore } from '@/hooks/use-confetti-store';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';


interface ActionsProps{
    disabled: boolean;
    courseId: string;

    isPublished: boolean;
}

const Actions = ({disabled, courseId, isPublished}: ActionsProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const confetti = useConfettiStore()

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/courses/${courseId}`);
            toast.success("Course deleted successfully.");
            router.refresh();
            router.push(`/teacher/courses`);
        } catch (error) {
            toast.error("Something went wrong.")
        }finally{
            setIsLoading(false)
        }
    }

    const onClick  = async () => {
        try {
            setIsLoading(true);
            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/unpublish`, );
                toast.success("Course Unpublished successfully.");
            } else{
                await axios.patch(`/api/courses/${courseId}/publish`, );
                toast.success("Course Published successfully.");
                confetti.onOpen();
            }
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong.")
        }finally{
            setIsLoading(false)
        }
    }

  return (
    <div className='flex items-center gap-x-2'>
        <Button onClick={onClick} variant='outline' size='sm' disabled={disabled || isLoading}>
            {isPublished ? "Unpublish": "Publish"}
        </Button>  

        <ConfirmModal onConfirm={onDelete} >
            <Button disabled={isLoading}  size='sm'>
                <Trash className='h-4 w-4'/>
            </Button>  
        </ConfirmModal>
          
    </div>
  )
}

export default Actions
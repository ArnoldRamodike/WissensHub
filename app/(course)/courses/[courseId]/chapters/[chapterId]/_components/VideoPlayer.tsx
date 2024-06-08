'use client'

import { useConfettiStore } from '@/hooks/use-confetti-store'
import { cn } from '@/lib/utils'
import MuxPlayer from '@mux/mux-player-react'
import axios from 'axios'
import { Loader2, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface VideoPlayerProps{
    chapterId: string
    title: string;
    courseId: string;
    nextChapterId?: string;
    playbackId: string;
    isLocked: boolean;
    completedOnEnd: boolean
}

const VideoPlayer = ({chapterId, completedOnEnd, courseId, isLocked, playbackId, title, nextChapterId }: VideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false);

    const router = useRouter();
    const confetti = useConfettiStore();


    const onEnded = async () => {
      try {
        if (completedOnEnd) {
          await axios.put(`/api/course/${courseId}/chapters/${chapterId}/progress`,{
            isCompleted: true,
          });

          if (!nextChapterId) {
            confetti.onOpen();
          }

          toast.success("Progress updated");
          router.refresh();

          if (nextChapterId) {
            router.push(`/courses/${chapterId}/chapters/${nextChapterId}`)
          }
        }
      } catch (error) {
        toast.error("Sometging went wrong")
      }
    }

  return (
    <div className='relative aspect-video'>
        {!isLocked && isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                <Loader2 className='h-8 w-8 animate-spin text-secondary'/>
            </div>
        )}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col text-secondary gap-y-2">
            <Lock className='h-8 w-8 '/>
            <p className='text-sm'>This chapter is locked</p>
         </div>
        )}

        {!isLocked &&  (
          <MuxPlayer  
          
          title={title}
          className={cn(!isReady && 'hidden')}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnded}
          autoPlay
          playbackId={playbackId}
          />
        )}
    </div>
  )
}

export default VideoPlayer
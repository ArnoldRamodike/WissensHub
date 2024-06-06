import { getChapter } from '@/actions/get-chapter';
import Banner from '@/components/banner';
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation'
import React from 'react'
import VideoPlayer from './_components/VideoPlayer';

const ChapterIdPage = async ({params}: {params:{courseId: string, chapterId: string}}) => {

    const {userId} = auth();

    if (!userId) {
        return redirect("/");
    }

    const {attachments, chapter, course, muxData, nexChapter, purchase, userProgress} = await getChapter({
        userId: userId,
        chapterId: params.chapterId,
        courseId: params.courseId,
    })
        
    if (!chapter || !course) {
        return redirect('/')
    }

    const isLocked = !chapter?.isFree && !purchase;
    const completedOnEnd = !!purchase && !userProgress?.isCompleted;
  return (
    <div className=''>
        {userProgress?.isCompleted && (
            <Banner
            variant='success'
                label='You already completed this chapter'
            />
        )}
        {isLocked && (
            <Banner
            variant='warning'
                label='You need to purchase this course to watch this chapter'
            />
        )}

        <div className="flex flex-col max-w-4xl mx-auto pb-20">
            <div className="p-4">
                <VideoPlayer
                    chapterId={params.chapterId}
                    title={chapter.title}
                    courseId={params.courseId}
                    nexChapterId={nexChapter?.id}
                    playbackId={muxData?.playbackId!}
                    isLocked={isLocked}
                    completedOnEnd={completedOnEnd}
                />
            </div>
        </div>
    </div>
  )
}

export default ChapterIdPage   
import { getChapter } from '@/actions/get-chapter';
import Banner from '@/components/banner';
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation'
import React from 'react'
import VideoPlayer from './_components/VideoPlayer';
import CourseEnrollButton from './_components/CourseEnrollButton';
import { Separator } from '@/components/ui/separator';
import Preview from '@/components/preview';
import { File } from 'lucide-react';

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

            <div className="">
                <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                    <h2 className='text-2xl font-semibold mb-2'>{chapter.title}</h2>
                    {purchase ? (
                        <div className="">

                        </div>
                    ):(
                        <CourseEnrollButton
                            courseId={params.chapterId}
                            price={course.price!}

                        />
                    )}
                </div>

                <Separator/>

                <div className="">
                    <Preview  value={chapter.description!}/>
                </div>
                {!!attachments.length && (
                    <>
                    <Separator/>
                    <div className="p-4">
                        {attachments.map((attachment) => (
                            <a
                            key={attachment.id}
                            href={attachment.url}
                            target='_blank'
                            className='flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline'
                            >

                              <File/>  <p>{attachment.name}</p>
                            </a>
                        ))}
                    </div>
                    </>
                )}
            </div>
        </div>
    </div>
  )
}

export default ChapterIdPage   
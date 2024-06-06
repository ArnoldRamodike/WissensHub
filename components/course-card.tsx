import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import IconBadge from './icon-badge';
import { BookOpen } from 'lucide-react';
import { formatPrice } from '@/lib/format';

interface CourseCardProps{
    id: string;
    title: string;
    imageUrl: string;
    chapterLength: number | null;
    price: number;
    progress: number | null;
    category: string;
}

const CourseCard = ({category, chapterLength, id, price, title, progress, imageUrl}: CourseCardProps) => {

  return (
    <Link href={`/courses/${id}`}>
        <div className="group hover:shadow-sm transition overflow-auto border rounded-lg p-3 h-full">
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
                <Image fill alt={title} className='object-cover' src={imageUrl} />
            </div>

            <div className="flex flex-col pt-2">
                <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                    {title}
                </div>
                <p className='text-sm text-muted-foreground'>{category}</p>

                <div className="my-3 flex items-center gap-x-2 text-sm md:text-sm">
                    <div className="flex items-center gap-x-1 text-slate-500">
                        <IconBadge size='sm' icon={BookOpen}  />
                        <span className=''>{chapterLength}{chapterLength === 1 ? " Chapter": " Chapters"}</span>
                    </div>
                </div>

                {progress !== null ? (
                    <div className="">

                    </div>
                ): (
                    <p className='text-md md:text-sm font-medium text-slate-700'> 
                        {formatPrice(price)} 
                    </p>
                )}
            </div>
        </div>
    </Link>
  )
}

export default CourseCard
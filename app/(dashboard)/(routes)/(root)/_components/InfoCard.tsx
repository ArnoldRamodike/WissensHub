import IconBadge from '@/components/icon-badge';
import { LucideIcon } from 'lucide-react';
import React from 'react'


interface InfoCardProps{
 label: string;
 varient?: "default" | "success";
 icon: LucideIcon
 numberOfItems: number
}

const InfoCard = ({icon: Icon, label, numberOfItems, varient}: InfoCardProps) => {
  return (
    <div className='border rounded-md flex items-center gap-x-2 p-3'>
        <IconBadge 
            variant={varient}
             icon={Icon} 
        />

        <div className="">
            <p className='font-medium'>{label}</p>
            <p className='text-sm text-gray-500'>{numberOfItems} {numberOfItems === 1 ? "Course" : "Courses" }</p>
        </div>
    </div>
  )
}

export default InfoCard
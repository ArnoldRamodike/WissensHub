import React from 'react'
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';

interface CourseProgressProps{
    value: number;
    variant?: "default" | "success", 
    size?: "default" | "sm", 
}

const colorByVarient = {
    default: "text-sky-700",
    success: "text-emerald-700",
};
const sizeyVarient = {
    default: "text-sm",
    sm: "text-xs",
};


const CourseProgress = ({value, variant,size }: CourseProgressProps) => {

  return (
    <div>
        <Progress className='h-2' value={value} variant={variant} />

        <p className={cn("font-medium mt-2 text-sky-700", colorByVarient[variant || "default"], sizeyVarient[size || "default"])}>
            {Math.round(value)} % Complete
        </p>
    </div>
  )
}

export default CourseProgress
import React from 'react'
import {LucideIcon} from 'lucide-react'
import { cva, VariantProps} from  'class-variance-authority'
import { cn } from '@/lib/utils'

const backgroundVarients = cva(
    "rounded-full flex item-centre justify-centre",
    {
        varients: {
            varient: {
                default: "bg-sky-100",
                success: "bg-emerald-100",
            },
            sizeVarient: {
                default: "p-2",
                success: "p-1",
            },
        },
        defaultVarients: {
            varient: "default",
            size: "default"
        }
    }
);

const iconVarients = cva(
    "",
    {
        varients: {
            varient: {
                default: "text-sky-700",
                success: "text-emerald-700",
            },
            size: {
                default: "h-8 w-8",
                sm: "h-4 w-4",
            },
        },
        defaultVarients: {
            varient: "default",
            size: "default"
        }
    }
);

type backgroundVarientsProps = VariantProps<typeof backgroundVarients>
type iconVarientsProps = VariantProps<typeof iconVarients>

interface IconBadgeProps extends backgroundVarientsProps, iconVarientsProps{
    icon: LucideIcon;
}

const IconBadge = ({icon: Icon, varient, size}: IconBadgeProps) => {

  return (
    <div className={cn(backgroundVarients({varient, size}))}>
        <Icon className={cn(iconVarients({varient, size}))}/>
    </div>
  )
}

export default IconBadge
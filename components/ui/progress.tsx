"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const progressVarients = cva(
  "h-full w-full flex-1 bg-primary transition-all",
  {
    variants:{
      variant: {
        default: "bg-sky-600",
        success: "bg-emarald-700"
      },
      defaultVarients:{
        variant: "default",
      }
    }
  }
)

export interface ProgressProps 
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
  VariantProps<typeof progressVarients> {}

type combinedprogressProps = ProgressProps & React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  combinedprogressProps
>(({ className, value, variant, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(progressVarients({variant}))}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

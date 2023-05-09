"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "lib/utils"

type PopoverProps = PopoverPrimitive.PopoverProps

export function Popover({ ...props }: PopoverProps) {
  return <PopoverPrimitive.Root  {...props} />
}

Popover.Trigger = React.forwardRef<HTMLButtonElement,
  PopoverPrimitive.PopoverTriggerProps>(function PopoverTrigger({ ...props }, ref) {
  return <PopoverPrimitive.Trigger {...props} ref={ref}/>
})

Popover.Portal = PopoverPrimitive.Portal

Popover.Content = React.forwardRef<HTMLDivElement,
  PopoverPrimitive.PopoverContentProps>(function PopoverContent({ className, ...props }, ref) {
  return (
    <Popover.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align="end"
        // alignOffset={30}
        className={cn(
          "relative z-10 overflow-hidden p-[5px] rounded-md border border-slate-50 bg-white shadow-lg drop-shadow-2xl animate-in min-w-56",
          // "overflow-hidden rounded-md border border-slate-50 bg-white shadow-lg drop-shadow-2xl animate-in slide-in-from-top-1 md:w-32",
          className
        )}
        {...props}
      />
    </Popover.Portal>
  )
})

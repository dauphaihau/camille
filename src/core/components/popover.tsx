"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "lib/utils"

type PopoverProps = PopoverPrimitive.PopoverProps

// type PopoverProps = PopoverPrimitive.PopoverProps

export function Popover({ ...props }: PopoverProps) {
  return <PopoverPrimitive.Root {...props} />
}

Popover.Trigger = React.forwardRef<HTMLButtonElement,
  PopoverPrimitive.PopoverTriggerProps>(function PopoverTrigger({ ...props }, ref) {
  return <PopoverPrimitive.Trigger {...props} ref={ref}/>
})

Popover.Portal = PopoverPrimitive.Portal

Popover.Content = React.forwardRef<HTMLDivElement,
  PopoverPrimitive.PopoverContentProps>(function PopoverContent({ className, ...props }, ref) {
  return (
    <Popover.Portal className='z-20' style={{zIndex: 2}}>
      <PopoverPrimitive.Content
        ref={ref}
        align="end"
        // alignOffset={30}
        className={cn(
          "overflow-hidden p-[5px] rounded-md border border-slate-50 bg-white shadow-lg drop-shadow-2xl animate-in min-w-56",
          // "overflow-hidden rounded-md border border-slate-50 bg-white shadow-lg drop-shadow-2xl animate-in slide-in-from-top-1 md:w-32",
          className
        )}
        {...props}
      />
    </Popover.Portal>
  )
})

// Popover.Item = React.forwardRef<
//   HTMLDivElement,
//   PopoverPrimitive.DropdownMenuItemProps
// >(function DropdownMenuItem({ className, ...props }, ref) {
//   return (
//     <PopoverPrimitive.Item
//       ref={ref}
//       className={cn(
//         "flex cursor-pointer select-none rounded-[3px] items-center py-2 px-3 text-sm text-[#373530] outline-none hover:bg-[#efefef] focus:text-black",
//         // "flex cursor-default select-none rounded-[3px] items-center py-2 px-3 text-sm text-[#373530] outline-none hover:bg-[#efefef] focus:text-black",
//         // "flex cursor-default select-none items-center py-2 px-3 text-sm text-slate-600 outline-none focus:bg-slate-50 focus:text-black",
//         className
//       )}
//       {...props}
//     />
//   )
// })
//

// DropdownMenu.Separator = React.forwardRef<
//   HTMLDivElement,
//   PopoverPrimitive.DropdownMenuSeparatorProps
// >(function DropdownMenuItem({ className, ...props }, ref) {
//   return (
//     <PopoverPrimitive.Separator
//       ref={ref}
//       className={cn("h-px my-2 bg-[#ededec]", className)}
//       {...props}
//     />
//   )
// })

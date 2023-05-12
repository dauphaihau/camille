"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"

import { cn } from "core/helpers"

type DropdownMenuProps = DropdownMenuPrimitive.DropdownMenuProps

export function DropdownMenu({ ...props }: DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root {...props} />
}

DropdownMenu.Trigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuPrimitive.DropdownMenuTriggerProps
>(function DropdownMenuTrigger({ ...props }, ref) {
  return <DropdownMenuPrimitive.Trigger {...props} ref={ref} />
})

DropdownMenu.Portal = DropdownMenuPrimitive.Portal

DropdownMenu.Content = React.forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.MenuContentProps
>(function DropdownMenuContent({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Content
      ref={ref}
      align="end"
      className={cn(
        "relative z-10 p-[5px] rounded-md border border-slate-50 bg-white shadow-lg drop-shadow-2xl animate-in slide-in-from-top-1 min-w-56",
        // "overflow-hidden p-[5px] rounded-md border border-slate-50 bg-white shadow-lg drop-shadow-2xl animate-in slide-in-from-top-1 min-w-56",
        // "overflow-hidden rounded-md border border-slate-50 bg-white shadow-lg drop-shadow-2xl animate-in slide-in-from-top-1 md:w-32",
        className
      )}
      {...props}
    />
  )
})

DropdownMenu.Item = React.forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuItemProps
>(function DropdownMenuItem({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        "flex cursor-pointer select-none rounded-[3px] items-center py-2 px-3 text-sm text-[#373530] outline-none hover:bg-[#efefef] focus:text-black",
        // "flex cursor-default select-none rounded-[3px] items-center py-2 px-3 text-sm text-[#373530] outline-none hover:bg-[#efefef] focus:text-black",
        className
      )}
      {...props}
    />
  )
})

DropdownMenu.Separator = React.forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuSeparatorProps
>(function DropdownMenuItem({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn("h-px my-2 bg-[#ededec]", className)}
      {...props}
    />
  )
})

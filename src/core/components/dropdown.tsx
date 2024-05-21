'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { cn } from 'core/helpers';

type DropdownMenuProps = DropdownMenuPrimitive.DropdownMenuProps

export function DropdownMenu({ ...props }: DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root { ...props } />;
}

DropdownMenu.Trigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuPrimitive.DropdownMenuTriggerProps
>(function DropdownMenuTrigger({ ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Trigger
      { ...props }
      ref={ ref }
    />
  );
});

DropdownMenu.Portal = DropdownMenuPrimitive.Portal;

DropdownMenu.Content = React.forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.MenuContentProps
>(function DropdownMenuContent({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Content
      ref={ ref }
      align='end'
      className={ cn(
        'relative z-10 p-[5px] rounded-md bg-white min-w-56',
        'animate-in slide-in-from-top-1',
        'shadow-lg drop-shadow-2xl',
        'border border-slate-50',
        className
      ) }
      { ...props }
    />
  );
});

DropdownMenu.Item = React.forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuItemProps
>(function DropdownMenuItem({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ ref }
      className={ cn(
        'flex items-center cursor-pointer select-none outline-none rounded-md py-2 px-3',
        'text-sm text-secondary focus:text-black font-medium',
        'hover:bg-accent-light',
        props.disabled && 'opacity-50 cursor-not-allowed',
        className
      ) }
      { ...props }
    />
  );
});

DropdownMenu.Separator = React.forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuSeparatorProps
>(function DropdownMenuItem({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ ref }
      className={ cn('h-px my-2 bg-[#ededec]', className) }
      { ...props }
    />
  );
});

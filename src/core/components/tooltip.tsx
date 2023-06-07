import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from 'core/helpers';

type TooltipProps = TooltipPrimitive.TooltipProps

export function Tooltip({ delayDuration = 300, ...props }: TooltipProps) {
  return <TooltipPrimitive.Provider>
    <TooltipPrimitive.Root disableHoverableContent delayDuration={delayDuration} {...props} />
  </TooltipPrimitive.Provider>
}

Tooltip.Trigger = React.forwardRef<HTMLButtonElement,
  TooltipPrimitive.TooltipTriggerProps>(function TooltipTrigger({ ...props }, ref) {
  return <TooltipPrimitive.Trigger {...props} ref={ref}/>
})

Tooltip.Portal = TooltipPrimitive.Portal

Tooltip.Content = React.forwardRef<HTMLDivElement, TooltipPrimitive.TooltipContentProps>(
  function TooltipContent({ side = 'bottom', className, ...props }) {
    return (
      <Tooltip.Portal className='z-[999999px]'>
        <TooltipPrimitive.Content
          // className="bg-black text-white py-1 px-1.5 rounded-[3px] text-xs mt-0.5 font-semibold drop-shadow-2xl"
          className={cn(`bg-black text-white py-1.5 px-2 rounded-[5px] text-xs
           mt-0.5 font-semibold drop-shadow-2xl`,
            className
          )}
          sideOffset={5}
          side={side}
          {...props}
        >
          {/*<div className='p-[2px]'>*/}
          {/*  {content}*/}
          {/*</div>*/}
          {/*<TooltipPrimitive.Arrow className="TooltipArrow" />*/}
        </TooltipPrimitive.Content>
      </Tooltip.Portal>
    )
  }
)

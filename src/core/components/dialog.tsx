"use client"

import * as React from "react"
import * as DialogPrimitives from '@radix-ui/react-dialog';
import { cn } from "lib/utils"

type DialogProps = DialogPrimitives.DialogProps

export default function Dialog({ ...props }: DialogProps) {
  return <DialogPrimitives.Root {...props} />
}

Dialog.Trigger = React.forwardRef<
  HTMLButtonElement,
  DialogPrimitives.DialogProps
>(function DialogTrigger({ ...props }, ref) {
  return <DialogPrimitives.Trigger {...props} ref={ref} />
})

Dialog.Portal = DialogPrimitives.Portal

Dialog.Content = React.forwardRef<
  HTMLDivElement,
  DialogPrimitives.DialogContentProps
>(function DialogContent({ className, ...props }, ref) {
  return (
    <Dialog.Portal>
      <DialogPrimitives.Overlay className="fixed inset-0 z-40 bg-black/50 opacity-100 transition-opacity animate-in fade-in">
        <div className="fixed inset-0 z-40 flex items-center justify-center" style={{top: '-22rem'}}>
          <DialogPrimitives.Content
            ref={ref}
            className={cn(
              "fixed z-50 grid w-[95vw] max-w-md scale-100 gap-4 rounded-lg bg-white p-6 opacity-100 animate-in fade-in-90 zoom-in-90 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 md:w-full",
              className
            )}
            {...props}
          />
        </div>
      </DialogPrimitives.Overlay>
    </Dialog.Portal>
  )
})

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>

Dialog.Header = function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return <div className={cn("grid gap-1", className)} {...props} />
}

Dialog.Title = React.forwardRef<
  HTMLHeadingElement,
  DialogPrimitives.DialogTitleProps
>(function DialogTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitives.Title
      ref={ref}
      className={cn("text-lg font-semibold text-slate-900", className)}
      {...props}
    />
  )
})

Dialog.Description = React.forwardRef<
  HTMLParagraphElement,
  DialogPrimitives.DialogDescriptionProps
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitives.Description
      ref={ref}
      className={cn("text-sm text-neutral-500", className)}
      {...props}
    />
  )
})

Dialog.Footer = function DialogFooter({ className, ...props }: DialogHeaderProps) {
  return (
    <div className={cn("flex justify-end space-x-2", className)} {...props} />
  )
}

Dialog.Cancel = React.forwardRef<
  HTMLButtonElement,
  DialogPrimitives.DialogCloseProps
>(function DialogCancel({ className, ...props }, ref) {
  return (
    <DialogPrimitives.Close
      ref={ref}
      className={cn(
        "relative inline-flex h-9 items-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-brand-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2",
        className
      )}
      {...props}
    />
  )
})

// Dialog.Action = React.forwardRef<
//   HTMLButtonElement
//   // DialogPrimitives.Dialog
// >(function DialogAction({ className, ...props }, ref) {
//   return (
//     <DialogPrimitives.Action
//       ref={ref}
//       className={cn(
//         "relative inline-flex h-9 items-center rounded-md border border-transparent bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
//         className
//       )}
//       {...props}
//     />
//   )
// })



// export default () => (
//   <Dialog.Root>
//     <Dialog.Trigger />
//     <Dialog.Portal>
//       <Dialog.Overlay />
//       <Dialog.Content>
//         <Dialog.Title />
//         <Dialog.Description />
//         <Dialog.Close />
//       </Dialog.Content>
//     </Dialog.Portal>
//   </Dialog.Root>
// );

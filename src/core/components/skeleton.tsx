import { cn } from "core/helpers"
import { ComponentPropsWithoutRef } from "react";

type SkeletonProps = {
  width?: string | number
  height?: string | number
} & ComponentPropsWithoutRef<'div'>

export function Skeleton({ className, width, height, ...props }: SkeletonProps) {
  return (
    <div
      style={{
        height, width
      }}
      className={cn(
        // "h-5 w-2/5 animate-pulse rounded-lg bg-slate-100",
        "h-[235px] w-2/5 animate-pulse rounded bg-[#efeeed]",
        // "h-[235px] w-2/5 animate-pulse rounded bg-[#d1d1d1]",
        className
      )}
      {...props}
    />
  )
}

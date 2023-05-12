import { cn } from "core/helpers";
import { ComponentPropsWithoutRef } from "react";

type TitleProps = {classesText?: string, maxW?: number} & ComponentPropsWithoutRef<'div'>

export default function Title({ children, className, classesText, maxW = 240, ...others }: TitleProps) {
  return (
    <div className={cn('inline-flex whitespace-nowrap', className)} {...others}>
      <span
        style={{ maxWidth: maxW }}
        className={cn('text-sm overflow-hidden text-ellipsis', classesText)}
      >{children}</span>
    </div>
  );
}

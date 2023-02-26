import * as React from "react"

import { cn } from "lib/utils"

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardSettingsShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className={cn("grid items-start gap-8 max-w-[600px] mx-auto", className)} {...props}>
      {children}
    </div>
  )
}

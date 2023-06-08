import { Skeleton } from "core/components";

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-wide text-slate-900">
          {heading}
        </h1>
        {text && <div className="text-primary">{text}</div>}
      </div>
      {children}
    </div>
  )
}

DashboardHeader.Skeleton = function DashboardHeaderSkeleton() {
  // return (
  //   <div className="p-4">
  //     <div className="space-y-3">
  //       <Skeleton className="h-5 w-2/5"/>
  //       {/*<Skeleton className="h-4 w-4/5"/>*/}
  //     </div>
  //   </div>
  // )
  return (
    <Skeleton className="h-10 w-2/5"/>
  )
}

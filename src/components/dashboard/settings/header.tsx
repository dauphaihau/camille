interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardSettingsHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex ">
      {/*<div className="flex justify-between">*/}
      {/*<div className="grid gap-1">*/}
      <div className="grid gap-1 border-gray-200 border-b pb-3 w-full">
        <h1 className="text-2xl font-bold tracking-wide text-slate-900">
          {heading}
        </h1>
        {text && <p className="text-neutral-500">{text}</p>}
      </div>
      {children}
    </div>
  )
}

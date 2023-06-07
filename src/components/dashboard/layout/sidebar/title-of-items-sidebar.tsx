import { Tooltip } from "core/components";
import { cn } from "core/helpers";

interface IItemSidebarProps {
  title: string
  settings?: boolean
  subTitleTooltip?: string
  onClick?: () => void
}

export function TitleOfItemsSidebar({
  title, subTitleTooltip, onClick, settings = false
}: IItemSidebarProps) {

  const Title = () => <div
    className={cn('text-xs font-bold tracking-wider text-[#a3a39f] rounded-sm px-1 select-none',
      { 'hover:bg-[#dedddb] hover:text-[#5b5954] cursor-pointer': !settings }
    )}
    onClick={onClick}
  >{title}
  </div>

  if (settings) {
    return <Title/>
  }

  return (
    <Tooltip>
      <Tooltip.Trigger>
        <Title/>
      </Tooltip.Trigger>
      <Tooltip.Content side='top' className='ml-2.5 mt-1'>
        <div>Click to hide section</div>
        <div className='text-primary-tooltip'>{subTitleTooltip}</div>
      </Tooltip.Content>
    </Tooltip>
  )
}

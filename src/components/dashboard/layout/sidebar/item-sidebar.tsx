import { Icons, Row, Tooltip } from "core/components";

interface IItemSidebarProps {
  title: string
  titleTooltip: string
  subTitleTooltip?: string
  icon: keyof typeof icons
  onClick?: () => void
}

const classesNameIcon = 'font-semibold rounded text-lg text-primary-medium flex items-center justify-center'
const icons = {
  basket: <Icons.basket className={classesNameIcon}/>,
  settings: <Icons.settings className={classesNameIcon}/>,
  search: <Icons.search className={classesNameIcon}/>,
  trash: <Icons.trash className={classesNameIcon}/>,
  fillPlusCircle: <Icons.fillPlusCircle className={classesNameIcon}/>,
}

export function ItemSidebar({
  title, icon, titleTooltip, subTitleTooltip, onClick
}: IItemSidebarProps) {
  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <Row onClick={onClick} align='center' gap={2} classes='hover:bg-accent rounded px-3 py-2 cursor-pointer'>
          <Row justify={'center'} align={'center'} classes="w-[22px] h-[22px]">
            {icons[icon]}
          </Row>
          <p className='text-sm font-semibold text-primary tracking-wider'>{title}</p>
        </Row>
      </Tooltip.Trigger>
      <Tooltip.Content side='right'>
        <div>{titleTooltip}</div>
        {subTitleTooltip && <div className='text-primary-tooltip'>{subTitleTooltip}</div>}
      </Tooltip.Content>
    </Tooltip>
  )
}

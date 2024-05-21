import { Icons, Tooltip } from 'core/components';

export default function ViewAllUpdatesButton() {
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <div className='btn-icon-header'>
          <Icons.clock className='h-5 w-5' />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>
        Feature are developing
      </Tooltip.Content>
    </Tooltip>
  );
}

import { Button, Icons, Tooltip } from "core/components";

export default function ShareButton() {
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <Button classes='text-[14px] font-medium' color='gray' variant='text' size='xs'>Share</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        Feature are developing
      </Tooltip.Content>
    </Tooltip>
  );
}


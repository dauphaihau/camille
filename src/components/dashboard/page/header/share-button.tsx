import React, { useCallback, useEffect, useState } from 'react';
import {
  Button, Popover, Tooltip
} from 'core/components';
import { useGetCurrentPage } from 'lib/request-client/page';
import { Tabs } from 'core/components/tabs';
import useStore from 'lib/store';
import { useKeyboardShortcut } from 'core/hooks';
import PublishTab from './publish-tab';

export default function ShareButton() {
  const { data: page } = useGetCurrentPage();

  const [state, setState] = useState({
    showPopover: false,
    published: page?.published as boolean,
    webLink: '',
  });

  const [triggerShortcutShare, setTriggerShortcutShare] = useState(false);

  const shortcutOverrideSystem = useStore(state => state.shortcutOverrideSystem);

  const shortcutSidebar = ['Meta', 's'];
  const handleShortcutSidebar = useCallback(() => {
    setTriggerShortcutShare(!triggerShortcutShare);
  }, [triggerShortcutShare]);
  useKeyboardShortcut(shortcutSidebar, handleShortcutSidebar, { overrideSystem: shortcutOverrideSystem });

  useEffect(() => {
    setState({ ...state, showPopover: triggerShortcutShare });
  }, [triggerShortcutShare]);

  return (
    <Popover
      open={ state.showPopover }
      onOpenChange={ (open) => setState({ ...state, showPopover: open }) }
    >
      <Popover.Trigger asChild>
        <div>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <Button
                classes='text-[14px] font-medium'
                color='gray'
                variant='text'
                size='xs'
              >Share
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content className='ml-2.5 mr-2 mt-1'>
              <div>Share or publish to web</div>
              <div className='text-primary-tooltip text-center'>⌘ + S</div>
            </Tooltip.Content>
          </Tooltip>
        </div>
      </Popover.Trigger>

      <Popover.Content
        side='bottom'
        className='w-[500px] ml-16 mt-6 z-[1000px]'
      >
        <Tabs>
          <Tabs.List defaultValue='publish'>
            <Tabs.Trigger value='publish'>Publish</Tabs.Trigger>
            <Tabs.Trigger
              value='share'
              disabled
            >Share
            </Tabs.Trigger>
          </Tabs.List>

          <div className='p-5'>
            <Tabs.Content value='publish'>
              <PublishTab />
            </Tabs.Content>
          </div>
        </Tabs>

      </Popover.Content>
    </Popover>
  );
}

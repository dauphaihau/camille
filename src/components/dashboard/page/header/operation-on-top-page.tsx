'use client'

import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { usePathname } from "next/navigation";

import { Icons, Row } from "core/components";
import PageBreadcrumb from "./page-breadcrumb";
import { useWorkspaceContext } from "components/context/workspace-context";
import { PageOperations } from "../../page-operations";
import FavoriteButton from "./favorite-button";
import ShareButton from "./share-button";
import ViewAllUpdatesButton from "./view-all-updates-button";
import useStore from "lib/store";
import { useCallback, useState } from "react";
import { useKeyboardShortcut } from "core/hooks";

dayjs.extend(relativeTime)

export default function OperationOnTopPage({ page }) {
  const { pagesFavorite } = useWorkspaceContext()
  const [triggerShortcutShare, setTriggerShortcutShare] = useState(false)

  const showSidebar = useStore(state => state.showSidebar)
  const setShowSidebar = useStore(state => state.setShowSidebar)
  const shortcutOverrideSystem = useStore(state => state.shortcutOverrideSystem)

  const pathName = usePathname()
  const pageId = pathName && pathName.split('/')[3]
  const isFavorite = pagesFavorite?.some(p => p.id === pageId)

  const shortcutSidebar = ['Meta', 's'];
  const handleShortcutSidebar = useCallback(() => {
    setTriggerShortcutShare(!triggerShortcutShare)
  }, [triggerShortcutShare])
  useKeyboardShortcut(shortcutSidebar, handleShortcutSidebar, { overrideSystem: shortcutOverrideSystem })

  return (
    <div className="sticky top-0 z-40 bg-white px-4">
      <Row align='center' justify='between' classes="h-11">
        <Row align='center' gap={2}>
          {
            !showSidebar &&
            <Icons.doubleArrowRight
              size={30}
              className='text-md text-[#54535f] hover:bg-[#efefef] rounded p-2'
              onClick={setShowSidebar}
              // onClick={() => setShowSidebar?.(!showSidebar)}
            />
          }
          <PageBreadcrumb/>
        </Row>

        <Row align='center' gap={2}>
          <div className={'text-[14px] text-[#9b9a97] font-medium'}>
            Edited {dayjs(page.updatedAt).fromNow()}
          </div>
          <ShareButton page={page} triggerShortcutShare={triggerShortcutShare}/>
          <FavoriteButton page={page}/>
          <ViewAllUpdatesButton/>
          <div className='btn-icon-header'>
            <PageOperations
              page={page}
              classesTrigger='hover:bg-[#efefef]'
              classesContent='top-4'
              favorite={isFavorite}
            />
          </div>
        </Row>
      </Row>
    </div>
  );
}

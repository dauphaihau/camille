import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Icons, Tooltip } from "core/components";
import { cn } from "core/helpers";
import { useWorkspaceContext } from "components/context/workspace-context";
import { addToFavorite } from "lib/request-by-swr/page";
import { toast } from "core/components/Toast";
import { useKeyboardShortcut } from "core/hooks";
import useStore from "lib/store";

export default function FavoriteButton({ page }) {
  const { workspace, pagesFavorite, setReFetchNotebookId } = useWorkspaceContext()
  const pathName = usePathname()
  const router = useRouter()
  const pageId = pathName && pathName.split('/')[3]
  const isFavorite = pagesFavorite?.some(p => p.id === pageId)
  const shortcutOverrideSystem = useStore(state => state.shortcutOverrideSystem)

  async function handleAddToFavorite() {
    if (!workspace) return null
    const response = await addToFavorite({
      workspaceId: workspace.id,
      pageId: page.id,
    })

    if (response.code !== '200') {
      return toast({
        title: "Something went wrong.",
        message: "Your page was not add to favorite. Please try again.",
        type: "error",
      })
    }

    setReFetchNotebookId?.(page.notebookId)
    router.refresh();
  }

  const shortcutPinPage = ['Meta', 'P'];
  const handleShortcutPinPage = useCallback(() => {
    handleAddToFavorite()
  }, [handleAddToFavorite])
  useKeyboardShortcut(shortcutPinPage, handleShortcutPinPage, { overrideSystem: shortcutOverrideSystem })

  return (
    <Tooltip>
      <Tooltip.Trigger>
        <div className='btn-icon-header' onClick={handleAddToFavorite}>
          {
            isFavorite ?
              <Icons.star
                className={cn('h-5 w-5',
                  isFavorite && 'fill-[#eec264]'
                )}
              />
              : <Icons.starOutline className='h-5 w-5'/>
          }
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <div>Pin this page in your sidebar</div>
        <div className='text-[#82817f] text-center'>⌘ + P</div>
      </Tooltip.Content>
    </Tooltip>
  );
}

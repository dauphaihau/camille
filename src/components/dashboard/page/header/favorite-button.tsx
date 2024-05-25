import { useCallback, useEffect, useState } from 'react';

import * as React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Icons, Loading, Tooltip } from 'core/components';
import { cn } from 'core/helpers';
import { useAddPageToFavorite, useGetCurrentPage } from 'services/query-hooks/page';
import { toast } from 'core/components';
import { useKeyboardShortcut } from 'core/hooks';
import { useStoreMulti } from 'stores/layout-store';
import { useGetDetailWorkspace } from 'services/query-hooks/workspace';

export default function FavoriteButton() {
  const queryClient = useQueryClient();

  const { data: { workspace } = {} } = useGetDetailWorkspace();
  const { data: page } = useGetCurrentPage();
  const [isFavorite, setIsFavorite] = useState(page?.isFavorite);

  useEffect(() => {
    setIsFavorite(page?.isFavorite);
  },[page?.isFavorite]);

  const {
    isPending: isPendingAddPageToFavorite,
    mutateAsync: addPageToFavorite,
    isError: isErrorAddPageToFavorite,
  } = useAddPageToFavorite();

  const {
    shortcutOverrideSystem,
  } = useStoreMulti('shortcutOverrideSystem');

  async function handleAddToFavorite() {
    if (!workspace || !page?.id) return;

    await addPageToFavorite({
      workspaceId: workspace.id,
      pageId: page.id,
    });
    setIsFavorite(!isFavorite);

    if (isErrorAddPageToFavorite) {
      toast({
        title: 'Something went wrong.',
        message: 'Your page was not add to favorite. Please try again.',
        type: 'error',
      });
      return;
    }
    await queryClient.invalidateQueries({
      queryKey: ['favorites-pages', workspace.id],
    });
    if (page.teamspaceId) {
      await queryClient.invalidateQueries({
        queryKey: ['teamspace-pages', page.teamspaceId],
      });
    }
    else {
      await queryClient.invalidateQueries({
        queryKey: ['private-pages', workspace.id],
      });
    }
  }

  const shortcutPinPage = ['Meta', 'P'];
  const handleShortcutPinPage = useCallback(() => {
    handleAddToFavorite();
  }, [handleAddToFavorite]);
  useKeyboardShortcut(shortcutPinPage, handleShortcutPinPage, { overrideSystem: shortcutOverrideSystem });

  return (
    <Tooltip>
      <Tooltip.Trigger>
        <div
          className='btn-icon-header'
          onClick={ handleAddToFavorite }
        >
          {
            isPendingAddPageToFavorite ?
              <Loading /> :
              isFavorite ?
                <Icons.star
                  className={ cn('h-5 w-5 ',
                    isFavorite && 'fill-[#eec264]'
                  ) }
                /> :
                <Icons.starOutline className='h-5 w-5 stroke-[2px]' />
          }
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <div>Pin this page in your sidebar</div>
        <div className='text-primary-tooltip text-center'>⌘ + P</div>
      </Tooltip.Content>
    </Tooltip>
  );
}

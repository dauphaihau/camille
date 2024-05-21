'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Loading, Row } from 'core/components';
import { toast } from 'core/components';
import { useCreatePage } from 'lib/request-client/page';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';

interface PostCreateButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  notebookId: string
}

export function PageCreateButton({
  notebookId, children,
}: PostCreateButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: { workspace } = {} } = useGetDetailWorkspace();

  const {
    mutateAsync: createPage,
    isPending: isPendingCreatePage,
    isError: isErrorCreatePage,
  } = useCreatePage();

  async function onClick() {

    const response = await createPage({
      notebookId,
      title: 'Untitled Page',
    });

    if (isErrorCreatePage) {
      toast({
        title: 'Something went wrong.',
        message: 'Your page was not created. Please try again.',
        type: 'error',
      });
      return;
    }

    queryClient.invalidateQueries({
      queryKey: ['notebook', notebookId],
    });

    if (response && response?.data?.pageId && workspace) {
      router.push(`/${workspace?.domain}/${notebookId}/${response.data.pageId}`);
    }
  }

  if (children) {
    return (
      <div onClick={ onClick }>
        {
          isPendingCreatePage ?
            <Row
              justify='center'
              align='center'
              classes='btn-icon hidden group-hover/notebook:flex text-[#686662] p-[3px]'
            >
              <Loading />
            </Row> :
            children
        }
      </div>
    );
  }

  return (
    <Button
      onClick={ onClick }
      disabled={ isPendingCreatePage }
    >
      New page
    </Button>
  );
}

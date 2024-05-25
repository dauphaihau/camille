import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Col, Icons, Row
} from 'core/components';
import { toast } from 'core/components';
import { SUFFIX_DOMAIN_SHARE_PUBLIC } from 'config/const';
import { useGetCurrentPage, useUpdatePage } from 'services/query-hooks/page';
import { DashboardSlugs } from 'types/workspace';

export default function PublishTab() {
  const slugs = useParams<DashboardSlugs>();
  const { data: page } = useGetCurrentPage();
  const queryClient = useQueryClient();

  const [state, setState] = useState({
    showPopover: false,
    published: page?.published ?? false,
    publicLink: '',
  });

  const {
    mutateAsync: updatePage,
    isError: isErrorUpdatePage,
  } = useUpdatePage();

  useEffect(() => {
    if (slugs && typeof window !== 'undefined') {
      const { domainWorkspace, pageId } = slugs;
      const link = `${window.location.origin}/${domainWorkspace + SUFFIX_DOMAIN_SHARE_PUBLIC}/${pageId}`;
      if (link) {
        setState({ ...state, publicLink: link });
      }
    }
  }, []);

  async function copyToClipBoard() {
    if (!state.publicLink) {
      toast({
        message: 'Failed to copy!',
        type: 'success',
      });
      return;
    }
    await navigator.clipboard.writeText(state.publicLink);
    toast({
      message: 'Copied link to clipboard!',
      type: 'success',
    });
  }

  const onChangePublish = async (value: boolean) => {
    if (!page?.id) return;
    setState({ ...state, published: value });
    await updatePage({
      id: page?.id,
      published: value,
    });

    if (isErrorUpdatePage) {
      toast({
        message: 'Something went wrong.',
        type: 'error',
      });
      return;
    }
    await queryClient.invalidateQueries({
      queryKey: ['page', slugs?.pageId],
    });
  };

  if (state.published) {
    return (
      <Col gap={ 4 }>
        <Row
          align='center'
          gap={ 2 }
        >
          <span className='relative flex h-2 w-2'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75' />
            <span className='relative inline-flex rounded-full h-2 w-2 bg-sky-600' />
          </span>
          <p className='font-semibold text-sky-600 text-sm'>Live on the web.</p>
        </Row>

        <Row
          align='center'
        >
          <div
            style={ {
              borderRadius: '4px 0px 0px 4px',
              boxShadow: 'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset',
            } }
            className='flex-1 p-2 cursor-text flex w-full bg-[#f7f7f5]'
          >
            <input
              className=' text-sm w-full bg-transparent'
              style={ { border: 'medium none' } }
              type='text'
              disabled
              value={ state.publicLink }
            />
          </div>

          <Row
            style={ {
              borderRadius: '0px 4px 4px 0px',
              boxShadow: 'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset',
              borderStyle: 'solid solid solid none',
              borderColor: 'rgba(55, 53, 47, 0.16) rgba(55, 53, 47, 0.16) rgba(55, 53, 47, 0.16) currentcolor',
              borderImage: 'none 100% / 1 / 0 stretch',
            } }
            align='center'
            justify='center'
            classes='h-9 inline-flex text-sm px-3 cursor-pointer hover:bg-[#e1e1e1]'
            onClick={ copyToClipBoard }
          >
            Copy link
          </Row>
        </Row>

        <Row gap={ 3 }>
          <Button
            onClick={ () => onChangePublish(false) }
            classes='w-full'
            variant='default'
          >Unpublish
          </Button>

          <Button
            iconLeft={ <Icons.earth className='h-4 w-4' /> }
            onClick={ () => window.open(state.publicLink) }
            classes='w-full'
            color='blue'
          >View site
          </Button>
        </Row>
      </Col>
    );
  }

  return (
    <Col
      gap={ 4 }
      classes='text-center'
    >
      <Col gap={ 1 }>
        <Row justify='center'>
          <Icons.earth size={ 25 } />
        </Row>
        <div className='w-full text-sm font-semibold text-ellipsis overflow-hidden leading-5'>
          Publish to web
        </div>
        <div className='w-full text-[#848380] text-sm font-medium text-ellipsis overflow-hidden leading-4'>
          Publish a static website of this page.
        </div>
      </Col>
      <Button
        onClick={ () => onChangePublish(true) }
        color='blue'
      >Publish
      </Button>
    </Col>
  );
}

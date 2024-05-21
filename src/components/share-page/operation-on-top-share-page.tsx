'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { Button, Icons, Row } from 'core/components';
import { PATH } from 'config/const';

dayjs.extend(relativeTime);

export default function OperationOnTopSharePage({ page }) {
  return (
    <div className='sticky top-0 z-40 bg-white px-4'>
      <Row
        align='center'
        justify='between'
        classes='h-11'
      >
        <Button
          classes='text-[14px] font-medium'
          color='gray'
          variant='text'
          size='xs'
        >{ page.title }
        </Button>

        <Row
          align='center'
          gap={ 2 }
        >
          <div className='btn-icon-header text-secondary'>
            <Icons.search className='text-lg' />
          </div>
          <div className='btn-icon-header text-secondary'>
            <Icons.documentDuplicate className='text-lg' />
          </div>
          <div className='btn-icon-header text-secondary'>
            <Icons.ellipsisHorizontal className='text-lg' />
          </div>

          <div
            className='w-[1px] h-4 mx-1'
            style={ { background: 'rgba(55, 53, 47, 0.16)' } }
          />

          <Link href={ PATH.LOGIN }>
            <Button
              classes='text-[14px] font-medium'
              color='gray'
              variant='text'
              size='xs'
            >
              Try Camille
            </Button>
          </Link>
        </Row>
      </Row>
    </div>
  );
}

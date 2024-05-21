'use client';

import Link from 'next/link';
import Image from 'next/image';

import { Button, Icons } from 'core/components';
import { PATH } from 'config/const';

export default function HomePage() {
  return (
    <>
      <div className='py-28 max-w-lg mx-auto text-center'>
        <h1 className='text-5xl mb-4 px-12'>
          The simplest way to keep notes
        </h1>
        <h5 className='text-xl'>
          Remember everything and tackle any project with your notes, tasks, and schedule all in one place.
        </h5>
        <Link href={ PATH.LOGIN } prefetch={ true }>
          <Button
            size='md'
            classes='mt-6'
            iconRight={ <Icons.arrowRight className='h-4 w-4' /> }
          >
            Get start for free
          </Button>
        </Link>
      </div>

      <Image
        src='/marketing/app.png'
        width={ 1200 }
        height={ 1200 }
        style={ { boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' } }
        alt='app'
        quality={ 100 }
        priority
      />

      { /*<div className='py-28 max-w-lg mx-auto text-center'>*/ }
      { /*  <h1 className='text-4xl mb-4 px-12'>*/ }
      { /*    Millions run on Camille every day*/ }
      { /*  </h1>*/ }
      { /*  <h5 className='text-xl'>*/ }
      { /*    Powering the world’s best teams, from next-generation startups to established enterprises.*/ }
      { /*  </h5>*/ }
      { /*</div>*/ }
    </>
  );
}

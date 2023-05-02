'use client'

import Link from "next/link";
import Image from 'next/image'

import { Button, Icons } from "core/components";
import { PATH } from "config/const";

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
        <Link href={PATH.LOGIN}>
          <Button
            size='md'
            classes='mt-6'
            iconRight={<Icons.arrowRight className='h-4 w-4'/>}
          >
            Get start for free
          </Button>
        </Link>
      </div>

      <Image
        src='/marketing/app.png'
        width={1200}
        height={1200}
        // className='drop-shadow-2xl'
        style={{
          // boxShadow: `rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset`
          boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`
        }}
        // fill={true}
        // sizes="(max-width: 768px) 100vw,
        //       (min-width: 1200px) 50vw,
        //       (min-width: 1200px) 50hw,
        //       "
        alt='app'
        quality={100}
        priority
      />
      <div className='py-28 max-w-lg mx-auto text-center'>
        <h1 className='text-4xl mb-4 px-12'>
          Millions run on Camille every day
        </h1>
        <h5 className='text-xl'>
          Powering the world’s best teams, from next-generation startups to established enterprises.
        </h5>
      </div>
    </>
  );
}

'use client'

import Image from 'next/image'

import { Tooltip } from "core/components";

export default function UpdateAvatar({ user }) {
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <div className='text-sm font-medium text-[#3c4149] dark:text-white mb-2'>Avatar</div>
        {/*<div className='text-sm font-medium text-[#3c4149] dark:text-white'>Profile picture</div>*/}
        {
          user.image
            ?
            // <Image alt='avatar' src={user.image} width={80} height={80}/>
            <img alt='avatar' src={user.image} className={'rounded-full'} width={80} height={80}/>
            :
            <div className='avatar bg-accent group-hover:bg-[#dcdbda] h-20 w-20 rounded-full text-md text-primary-medium grid place-items-center'>
              {
                user.name ?
                  user.name.charAt(0).toUpperCase()
                  :
                  user.email.charAt(0).toUpperCase()
              }
            </div>
        }
      </Tooltip.Trigger>
      <Tooltip.Content>
        Feature are developing
      </Tooltip.Content>
    </Tooltip>
  );
}

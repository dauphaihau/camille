'use client';

import Image from 'next/image';

import { Tooltip } from 'core/components';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';

export default function UpdateAvatar() {
  const { data: { user } = {} } = useGetDetailWorkspace();

  return (
    <Tooltip>
      <Tooltip.Trigger>
        <div className='text-sm font-medium text-[#3c4149] dark:text-white mb-2'>Avatar</div>
        {
          user?.image ?
            <Image
              alt='avatar'
              src={ user.image }
              width={ 80 }
              height={ 80 }
              className='rounded-full'
            /> :
            <div className='avatar bg-accent group-hover:bg-[#dcdbda] h-20 w-20
             rounded-full text-md text-primary-medium grid place-items-center'
            >
              {
                user?.name ?
                  user.name.charAt(0).toUpperCase() :
                  user?.email && user.email.charAt(0).toUpperCase()
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

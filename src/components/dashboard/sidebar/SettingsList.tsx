'use client'

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "core/helpers";

export default function SettingsList({ notebooks, domain }) {
  const [showNotebooks, setShowNotebooks] = useState(true)
  const pathName = usePathname();

  // const user = await getCurrentUser()
  //
  // if (!user) {
  //   redirect(authOptions.pages.signIn)
  // }
  //
  // const notebooks = await getListNotebooks(user.id)

  // const user = await getCurrentUser()
  //
  // if (!user) {
  //     redirect(authOptions.pages.signIn)
  // }
  //
  // const notebooks = await getListNotebooks(user.id)
  //
  // console.log('dauphaihau debug: notebooks', notebooks)
  //

  // useEffect(() => {
  //   async function run() {
  //     const user = await getCurrentUser()
  //
  //     if (!user) {
  //       redirect(authOptions.pages.signIn)
  //     }
  //
  //     const notebooks = await getListNotebooks(user.id)
  //
  //     console.log('dauphaihau debug: notebooks', notebooks)
  //   }
  //
  //   run()
  // }, [])

  return (
    <div className='space-y-6'>
      <div>
        <div className='flex justify-between items-center px-4  mb-1'>
          {/*<p className='text-xs font-bold mb-2 tracking-wider'>Private</p>*/}
          <p
            className={cn('text-xs font-bold tracking-wider text-[#a3a39f] hover:bg-[#dedddb] hover:text-[#5b5954] rounded-sm px-1 cursor-pointer select-none')}
            onClick={() => setShowNotebooks(!showNotebooks)}
          >Workspace</p>
        </div>
        <div className='px-1 flex flex-col gap-1'>
          <Link
            href={`/${domain}/settings/workspace`}
            className=''
          >
            <div
              className={cn(`flex items-center justify-between hover:bg-[#ecebea] py-[2px] pr-[12px] pl-[20px] rounded-sm max-h-[27px] cursor-pointer group/notebook`,
                { ['bg-[#f1f1f0]']: pathName.includes('/settings/workspace') }
              )}
            >
              <div className='flex gap-1 items-center'>
                <p
                  // href={`/editor/${notebook.id}`}
                  className={cn("font-medium text-[14px] text-[#73726e]",
                    // { ['text-[#373530]']: splited[3] === notebook.id && splited.length === 4 }
                  )}
                >
                  General
                </p>
              </div>
            </div>
          </Link>

          <Link
            href={`/${domain}/settings/plans`}
          >
            <div
              className={cn(`flex items-center justify-between hover:bg-[#ecebea] py-[2px] pr-[12px] pl-[20px] rounded-sm max-h-[27px] cursor-pointer group/notebook`,
                { ['bg-[#f1f1f0]']: pathName.includes('/settings/plans') }
              )}
            >
              <div className='flex gap-1 items-center'>
                <p
                  // href={`/editor/${notebook.id}`}
                  className={cn("font-medium text-[14px] text-[#73726e]",
                    // { ['text-[#373530]']: splited[3] === notebook.id && splited.length === 4 }
                  )}
                >
                  Plans
                </p>
              </div>

              {/* <PostDeleteButton post={{ id: post.id, title: post.title }} /> */}

              {/*<div className='flex gap-1'>*/}
              {/*  <Icons.ellipsisHorizontal*/}
              {/*    size={12}*/}
              {/*    className='btn-icon invisible group-hover/notebook:visible text-[#686662]'*/}
              {/*  />*/}
              {/*  /!*<PageOperations page={{ id: notebook.id, title: notebook.title }}/>*!/*/}
              {/*  /!*<NotebookOperations page={{ id: notebook.id, title: notebook.title }}/>*!/*/}

              {/*  /!*<Icons.plus size={12} className='btn-icon invisible group-hover/notebook:visible text-[#686662]'/>*!/*/}
              {/*</div>*/}
            </div>
          </Link>

        </div>
      </div>

      <div>
        <div className='flex justify-between items-center px-4 mb-1.5'>
          {/*<p className='text-xs font-bold mb-2 tracking-wider'>Private</p>*/}
          <p
            className={cn('text-xs font-bold tracking-wider text-[#a3a39f] hover:bg-[#dedddb] hover:text-[#5b5954] rounded-sm px-1 cursor-pointer select-none')}
            onClick={() => setShowNotebooks(!showNotebooks)}
          >Account</p>

        </div>
      </div>
    </div>
  );
}

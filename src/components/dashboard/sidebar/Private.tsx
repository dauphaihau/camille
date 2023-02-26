'use client'

// import { redirect } from "next/navigation";
//
// import { getCurrentUser } from "lib/session";
// import { authOptions } from "lib/auth";
// import { getListNotebooks } from "services/notebook";

import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../lib/session";
import { redirect } from "next/navigation";
import { authOptions } from "../../../lib/auth";
import { getListNotebooks } from "../../../services/notebook";
import { useDetailNotebook } from "../../../services/page";
import { NotebookItem } from "./note-item-sidebar";
import { EmptyPlaceholder } from "../empty-placeholder";
import { PostCreateButton } from "../post-create-button";
import { Icons } from "core/components";
import { cn } from "core/helpers";
import NewNotebookDialog from "../../dialog/NewNotebookDialog";

export default function PrivateList({ notebooks }) {

  const [showNotebooks, setShowNotebooks] = useState(true)

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
    <div>
      <div className='flex justify-between items-center px-4  mb-1.5jj'>
        {/*<p className='text-xs font-bold mb-2 tracking-wider'>Private</p>*/}
        <p
          className={cn('text-xs font-bold tracking-wider text-[#a3a39f] hover:bg-[#dedddb] hover:text-[#5b5954] rounded-sm px-1 cursor-pointer select-none')}
          onClick={() => setShowNotebooks(!showNotebooks)}
        >Notebooks</p>
        <NewNotebookDialog/>
      </div>
      {
        showNotebooks &&
        <div className='px-1'>
          {
            notebooks?.length ? (
              // <div className="divide-y divide-neutral-200 rounded-md border border-slate-200 mb-4">
              <div className="">
                {notebooks.map((notebook) => (
                  <NotebookItem key={notebook.id} notebook={notebook}/>
                ))}
              </div>
            ) : null
            // ) : (
            //   <EmptyPlaceholder>
            //     <EmptyPlaceholder.Icon name="post"/>
            //     <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
            //     <EmptyPlaceholder.Description>
            //       You don&apos;t have any posts yet. Start creating content.
            //     </EmptyPlaceholder.Description>
            //     <PostCreateButton className="border-slate-200 bg-white text-brand-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"/>
            //   </EmptyPlaceholder>
            // )
          }
        </div>
      }
    </div>
  );
}

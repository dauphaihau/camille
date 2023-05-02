'use client'

import { PageItem } from "./page-item";
import { EmptyPlaceholder } from "../empty-placeholder";
import { useGetPages } from "lib/request-by-swr/page";

export default function PageList({ notebookId }) {
  const { isLoading, pages } = useGetPages(notebookId)

  return (
    <div>
      {
        pages && pages.length ? (
          // <div className="divide-y divide-neutral-200 rounded-md border border-slate-200 mb-4">
          <div className="">
            {pages.map((page) => (
              <PageItem key={page.id} page={page}/>
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
        //   </EmptyPlaceholder>
        // )
      }
    </div>
  );
}

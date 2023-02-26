'use client'

import { PageItem } from "./page-item";
import { EmptyPlaceholder } from "../empty-placeholder";
import { PostCreateButton } from "../post-create-button";
import { useDetailNotebook } from "services/page";

export default function PageList({ notebookId }) {

  // get all pages from a notebook
  const { isLoading, pageList } = useDetailNotebook(notebookId)

  return (
    <div>
      {
        pageList && pageList.length ? (
          // <div className="divide-y divide-neutral-200 rounded-md border border-slate-200 mb-4">
          <div className="">
            {pageList.map((page) => (
              <PageItem notebookId={notebookId} key={page.id} page={page}/>
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post"/>
            <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            <PostCreateButton className="border-slate-200 bg-white text-brand-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"/>
          </EmptyPlaceholder>
        )}
    </div>
  );
}

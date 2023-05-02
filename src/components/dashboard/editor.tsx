"use client"

import * as React from "react"
import EditorJS, { API } from "@editorjs/editorjs"
import { Notebook, Page } from "@prisma/client"
import TextareaAutosize from "react-textarea-autosize"
import { useCallback, useEffect, useRef, useState } from "react"
// import BreakLine from 'editorjs-break-line';
import * as z from "zod"

import { pagePatchSchema } from "lib/validations/page"
import { toast } from "core/components/Toast"
import { debounce } from "core/helpers";
import { useWorkspaceContext } from "components/context/workspace-context";
import { updatePage } from "lib/request-by-swr/page";
import useStore from "../../lib/store";

interface EditorProps {
  page: Pick<Page, "id" | "title" | "content" | "published" | 'notebookId'> & {notebook: Notebook}
}

type FormData = z.infer<typeof pagePatchSchema>

export function Editor({ page }: EditorProps) {
  const ref = useRef<EditorJS>()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const { setPage, page: pageContext, setReFetchNotebookId } = useWorkspaceContext()
  const setStatePageBreadcrumb = useStore(state => state.setStatePageBreadcrumb)

  async function initializeEditor() {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Embed = (await import("@editorjs/embed")).default
    const Table = (await import("@editorjs/table")).default
    const List = (await import("@editorjs/list")).default
    const Code = (await import("@editorjs/code")).default
    const LinkTool = (await import("@editorjs/link")).default
    const InlineCode = (await import("@editorjs/inline-code")).default

    const body = pagePatchSchema.parse(page)

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
        },
        onChange: async (api: API, event: CustomEvent) => {
          if (ref.current) {
            const blocks = await ref.current.save()
            await handleUpdatePage(page.id, { content: blocks })
          }
        },
        placeholder: "Type here to write your page...",
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
          // breakLine: {
          //   class: BreakLine,
          //   inlineToolbar: true,
          //   shortcut: 'ENTER',
          //   // shortcut: 'CMD+SHIFT+ENTER',
          // },
        },
      })
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
      setStatePageBreadcrumb({ notebook: page.notebook, page })
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      setPage?.(page)
      initializeEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
        // ref.current = null
      }
    }
  }, [isMounted])

  async function handleUpdatePage(id, values: FormData) {
    const response = await updatePage(id, values)

    if (response.code !== '200') {
      return toast({
        title: "Something went wrong.",
        message: "Your page was not saved. Please try again.",
        type: "error",
      })
    }
    setReFetchNotebookId?.(page.notebookId)
  }

  const debounceTitle = useCallback(
    debounce((value) => {
      handleUpdatePage(page.id, { title: value })
    }, 300),
    []
  );

  if (!isMounted) {
    return null
  }

  return (
    <div className="grid w-full gap-10">
      <div className="prose prose-stone mx-auto w-[800px] pb-[30vh]">
        <div className={'h-[200px] flex flex-col justify-end'}>
          <TextareaAutosize
            autoFocus
            name="title"
            id="title"
            value={pageContext?.id === page.id && pageContext?.title || page.title}
            // defaultValue={pageContext?.title || page.title}
            placeholder="Page title"
            className="w-full resize-none appearance-none text-5xl font-bold focus:outline-none z-0"
            // className="w-full resize-none appearance-none overflow-hidden text-5xl font-bold focus:outline-none z-0"
            onChange={(event) => {
              setPage?.({ ...page, title: event.target.value })
              // setPage?.((prev) => ({ ...prev, title: event.target.value }))
              debounceTitle(event.target.value)
            }}
          />
        </div>
        <div id="editor" className=""/>
        {/*<div id="editor" className="min-h-[500px]"/>*/}
        <p className="text-sm text-gray-500">
          Use{" "}
          <kbd className="rounded-md border bg-slate-50 px-1 text-xs uppercase">
            Tab
          </kbd>{" "}
          to open the command menu.
        </p>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import EditorJS, { API } from "@editorjs/editorjs"
import { Notebook, Page } from "@prisma/client"
import TextareaAutosize from "react-textarea-autosize"
import { useCallback, useEffect, useRef, useState } from "react"
import * as z from "zod"
import { useRouter } from "next/navigation";

import { pagePatchSchema } from "lib/validations/page"
import { toast } from "core/components/Toast"
import { debounce } from "core/helpers";
import { updatePage } from "lib/request-by-swr/page";
import { useStoreMulti } from "lib/store";

interface EditorProps {
  page: Pick<Page, "id" | "title" | "content" | "shareToWeb" | 'notebookId'> & {notebook: Notebook}
  readOnly?: boolean
}

type FormData = z.infer<typeof pagePatchSchema>

const EDITOR_HOLDER_ID = 'editor'

export function Editor({ page, readOnly = false }: EditorProps) {
  const router = useRouter()
  const editorInstance = useRef<EditorJS>()
  const titleInstance = useRef<HTMLTextAreaElement>(null)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const {
    setReFetchNotebookId,
    setStatePageBreadcrumb,
    setShortcutOverrideSystem,
    page: pageContext, setPage
  } = useStoreMulti('setReFetchNotebookId', 'setStatePageBreadcrumb', 'setShortcutOverrideSystem', 'page', 'setPage')

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

    if (!editorInstance.current) {
      const editor = new EditorJS({
        holder: EDITOR_HOLDER_ID,
        readOnly,
        onReady() {
          editorInstance.current = editor
        },
        onChange: async (api: API, event: CustomEvent) => {
          if (editorInstance.current) {
            const blocks = await editorInstance.current.save()
            await handleUpdatePage(page.id, { content: blocks })
            router.refresh()
          }
        },
        // placeholder: "Type here to write your page...",
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
      if (titleInstance.current) {
        const end = page.title.length
        titleInstance.current.setSelectionRange(end, end)
        titleInstance.current.focus()
      }

      return () => {
        editorInstance.current?.destroy()
        editorInstance.current = undefined
        // editorInstance.current = null
      }
    }
  }, [isMounted])

  useEffect(() => {
    if (!editorInstance.current) return

    const editorElement = document.getElementById(EDITOR_HOLDER_ID)

    const onFocusIn = () => {
      setShortcutOverrideSystem(false)
    }
    const onFocusOut = () => {
      setShortcutOverrideSystem(true)
    }

    if (editorElement) {
      editorElement.addEventListener("focusin", onFocusIn)
      editorElement.addEventListener("focusout", onFocusOut)

      return () => {
        editorElement.removeEventListener("focusin", onFocusIn)
        editorElement.removeEventListener("focusout", onFocusOut)
      }
    }
  }, [editorInstance.current])

  async function handleUpdatePage(id, values: FormData) {
    const response = await updatePage(id, values)

    if (response.code !== '200') {
      return toast({
        title: "Something went wrong.",
        message: "Your page has not been updated. Please try again.",
        type: "error",
      })
    }
    router.refresh()
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
      <div className="prose prose-stone max-w-[708px] mx-auto pb-[30vh]">
        {/*<div className="prose prose-stone mx-auto w-[800px] pb-[30vh]">*/}
        <div className={'flex flex-col justify-end mt-16 mb-2'}>
          <TextareaAutosize
            disabled={readOnly}
            ref={titleInstance}
            name="title"
            id="title"
            defaultValue={page.title}
            value={pageContext?.title}
            // value={pageContext?.id === page.id && pageContext?.title || page.title}
            // defaultValue={pageContext?.title || page.title}
            placeholder="Page title"
            className="w-full resize-none appearance-none text-5xl font-bold focus:outline-none z-0"
            onChange={(event) => {
              setPage?.({ ...page, title: event.target.value })
              debounceTitle(event.target.value)
            }}
          />
        </div>

        <div id={EDITOR_HOLDER_ID} className=""/>

        {
          !readOnly &&
          <p className="text-sm text-[#9b9a97]">
            Use{" "}
            <kbd className="rounded-md border bg-slate-50 px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        }
      </div>
    </div>
  )
}

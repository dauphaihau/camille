"use client"

import * as React from "react"
import EditorJS, { API } from "@editorjs/editorjs"
import { Page } from "@prisma/client"
import TextareaAutosize from "react-textarea-autosize"
import BreakLine from 'editorjs-break-line';
import * as z from "zod"

import { pagePatchSchema } from "lib/validations/page"
import { toast } from "core/components/Toast"
// import { toast } from "core/components"
import { debounce } from "core/helpers";
import { useCallback, useEffect, useRef, useState } from "react"
// import { updatePage } from "services/notebook"
import { useRouter } from "next/navigation"

interface EditorProps {
  page: Pick<Page, "id" | "title" | "content" | "published">
}

type FormData = z.infer<typeof pagePatchSchema>

export function Editor({ page }: EditorProps) {
  const ref = useRef<EditorJS>()
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false)

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
          const blocks = await ref.current.save()
          await updatePage(page.id, { content: blocks })
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
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      initializeEditor()

      return () => {
        ref.current?.destroy()
        ref.current = null
      }
    }
  }, [isMounted])


  async function updatePage(id, values: FormData) {
    const response = await fetch(`/api/notebook/pages/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        message: "Your page was not saved. Please try again.",
        type: "error",
      })
    }
    // router.refresh()
    // return toast({
    //   message: "Your page has been saved.",
    //   type: "success",
    // })
  }

  const debounceTitle = useCallback(
    debounce((value) => {
      updatePage(page.id, { title: value })
    }, 300),
    []
  );

  if (!isMounted) {
    return null
  }

  return (
    <div className="grid w-full gap-10">
      <div className="prose prose-stone mx-auto w-[800px]">
        <TextareaAutosize
          autoFocus
          name="title"
          id="title"
          defaultValue={page.title}
          placeholder="Page title"
          className="w-full resize-none appearance-none overflow-hidden text-5xl font-bold focus:outline-none"
          onChange={(event) => debounceTitle(event.target.value)}
        />
        <div id="editor" className="min-h-[500px]"/>
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

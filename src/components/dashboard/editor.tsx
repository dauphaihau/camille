'use client';

import * as React from 'react';
import EditorJS from '@editorjs/editorjs';
import TextareaAutosize from 'react-textarea-autosize';
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { updatePageSchema } from 'lib/validations/page';
import { toast } from 'core/components';
import { useGetCurrentPage, useGetFavoritesPages, useUpdatePage } from 'lib/request-client/page';
import { useStoreMulti } from 'lib/store';
import { useDebounce } from 'core/hooks';
import { IUpdatePage } from 'types/page';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';
import { DashboardSlugs } from 'types/workspace';

interface EditorProps {
  readOnly?: boolean;
}

const EDITOR_HOLDER_ID = 'editor';

export function Editor({ readOnly = false }: EditorProps) {
  const router = useRouter();
  const slugs = useParams<DashboardSlugs>();
  const queryClient = useQueryClient();
  const debouncedUpdatePage = useDebounce(handleUpdatePage, 400);

  const { data: { workspace } = {} } = useGetDetailWorkspace();
  const { data: favoritesPages } = useGetFavoritesPages();
  const { data: pageData, refetch } = useGetCurrentPage();

  const editorInstance = useRef<EditorJS>();
  const titleInstance = useRef<HTMLTextAreaElement>(null);

  const [isMounted, setIsMounted] = useState<boolean>(false);

  const {
    setShortcutOverrideSystem,
    // page: pageContext,
    setPage,
  } = useStoreMulti('setShortcutOverrideSystem', 'page', 'setPage');

  const {
    mutateAsync: updatePage,
    isError: isErrorUpdatePage,
  } = useUpdatePage(pageData?.id);

  async function initializeEditor() {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default;
    const Embed = (await import('@editorjs/embed')).default;
    const Table = (await import('@editorjs/table')).default;
    const List = (await import('@editorjs/list')).default;
    const Code = (await import('@editorjs/code')).default;
    const LinkTool = (await import('@editorjs/link')).default;
    const InlineCode = (await import('@editorjs/inline-code')).default;

    const body = updatePageSchema.parse(pageData);

    if (!editorInstance.current) {
      const editor = new EditorJS({
        holder: EDITOR_HOLDER_ID,
        readOnly,
        onReady() {
          editorInstance.current = editor;
        },
        // onChange: async (api: API, event: CustomEvent) => {
        onChange: async () => {
          if (editorInstance.current && !readOnly) {
            const blocks = await editorInstance.current.save();
            await handleUpdatePage({ content: blocks });
            router.refresh();
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
      });
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && pageData) {
      setIsMounted(true);
      // setStatePageBreadcrumb({ notebook: pageData.notebook, pageData });
    }
  }, []);

  useEffect(() => {
    if (isMounted && pageData && pageData?.title) {
      setPage(pageData);
      initializeEditor();
      if (titleInstance.current) {
        const end = pageData.title.length;
        titleInstance.current.setSelectionRange(end, end);
        titleInstance.current.focus();
      }

      return () => {
        editorInstance.current?.destroy();
        editorInstance.current = undefined;
        // editorInstance.current = null
      };
    }
  }, [isMounted]);

  useEffect(() => {
    if (!editorInstance.current) return;

    const editorElement = document.getElementById(EDITOR_HOLDER_ID);

    const onFocusIn = () => {
      setShortcutOverrideSystem(false);
    };
    const onFocusOut = () => {
      setShortcutOverrideSystem(true);
    };

    if (editorElement) {
      editorElement.addEventListener('focusin', onFocusIn);
      editorElement.addEventListener('focusout', onFocusOut);

      return () => {
        editorElement.removeEventListener('focusin', onFocusIn);
        editorElement.removeEventListener('focusout', onFocusOut);
      };
    }
  }, [editorInstance.current]);

  async function handleUpdatePage(values: IUpdatePage) {
    if (!pageData) return;
    await updatePage(values);

    if (isErrorUpdatePage) {
      toast({
        title: 'Something went wrong.',
        message: 'Your page has not been updated. Please try again.',
        type: 'error',
      });
      return;
    }
    await refetch();

    if (values?.title) {
      await queryClient.invalidateQueries({
        queryKey: ['notebook', slugs?.notebookId],
      });

      if (favoritesPages && favoritesPages.some((page) => page.id === pageData.id)) {
        await queryClient.invalidateQueries({
          queryKey: ['favorites-pages', workspace?.id],
        });
      }
    }
  }

  const onChangeTitle = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPage({ ...pageData, title: event.target.value });
    await debouncedUpdatePage({ title: event.target.value });
  };

  return (
    <div
      className='overflow-scroll max-h-full'
      style={ { height: 'calc(100vh - 45px)' } }
    >
      <div className='grid w-full'>
        <div className='prose prose-stone max-w-[708px] mx-auto pb-[30vh]'>
          <div className='flex flex-col justify-end mt-28 mb-2 w-[708px]'>
            <TextareaAutosize
              disabled={ readOnly }
              ref={ titleInstance }
              name='title'
              id='title'
              maxLength={ 128 }
              defaultValue={ pageData?.title }
              // value={ pageContext?.title }
              // value={ slugs?.pageId === pageContext?.id ? pageContext?.title : pageData?.title }
              placeholder='Page title'
              className='w-full resize-none appearance-none text-4xl font-bold focus:outline-none z-0 placeholder-[#e1e1e0]'
              onChange={ onChangeTitle }
            />
          </div>
          <div id={ EDITOR_HOLDER_ID } />
          {
            !readOnly &&
            <p className='text-sm text-[#9b9a97]'>
              Use{ ' ' }
              <kbd className='rounded-md border bg-slate-50 px-1 text-xs uppercase'>
                Tab
              </kbd>{ ' ' }
              to open the command menu.
            </p>
          }
        </div>
      </div>
    </div>
  );
}

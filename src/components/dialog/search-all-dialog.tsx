'use client'

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)

import { Dialog, Icons, Row, Col, Tooltip } from "core/components";
import { cn, debounce, formatDate } from "core/helpers";
import { useSearchPage } from "lib/request-by-swr/page";
import Loading from "core/components/Loading";
import { useKeyboardShortcut } from "core/hooks";
import useStore from "../../lib/store";

export function SearchAllDialog() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [open, setOpen] = useState(false);
  const shortcutOverrideSystem = useStore(state => state.shortcutOverrideSystem)
  const workspace = useStore(state => state.workspace)
  const setShowPagesInTrashPopover = useStore(state => state.setShowPagesInTrashPopover)

  const arrKeys = ['Meta', 'f']
  const handleKeyboardShortcut = useCallback(keys => {
    setOpen(prevState => !prevState)
  }, [setOpen])
  useKeyboardShortcut(arrKeys, handleKeyboardShortcut, { overrideSystem: shortcutOverrideSystem })

  const debounceSearch = useCallback(
    debounce((value) => {
      setSearchValue(value);
    }, 300),
    []
  );

  // const { pages } = useSearchPage({ search: searchValue, limit: 6 })
  const { isLoading, data, type } = useSearchPage(workspace && open ? {
    searchValue,
    workspaceId: workspace.id
  } : null)

  const handleSearch = (e) => {
    debounceSearch(e.target.value);
  }

  const NoResult = () => (
    <Col className='text-center my-4' gap={1}>
      <div className='text-[14px] text-[#7d7c79] font-semibold'>No results</div>
      <div className='text-[14px] text-[#a6a5a3] font-medium'>Some results may be in your deleted pages</div>
      <div
        className='text-[14px] text-[#4281db] font-medium cursor-pointer'
        onClick={() => {
          setShowPagesInTrashPopover(true)
          setOpen(false)
        }}
      >Search deleted pages
      </div>
    </Col>
  )

  const GroupPage = ({ title, pages, isSearchByValue = false, isPagesToday = false }) => {
    if (!isSearchByValue && (!pages || pages.length === 0)) return null
    if (isSearchByValue && pages.length === 0) {
      return <NoResult/>
    }

    function handle2Light(title) {
      const parts = title.split(new RegExp(`(${searchValue})`, 'gi'));
      return <span>
        {
          parts.map((part, i) => <span
              key={i}
              className={cn(
                part.toLowerCase() !== searchValue.toLowerCase() ? 'text-[#7d7c78]' : 'text-[#373530]'
              )}
            >
            {part}
        </span>
          )
        }
      </span>
    }

    return (
      <div>
        <div className='text-[#7d7c78] font-semibold text-xs pl-3 mb-1'>{title}</div>
        {
          pages?.map((p, idx) => (
            <Link
              key={idx}
              onClick={() => setOpen(false)}
              href={`/${workspace?.domain}/${p.notebookId}/${p.id}`}
              className='font-semibold block text-[14px] hover:bg-[#efefef] py-1.5 rounded-[3px] px-2 mx-1 cursor-pointer group relative'
            >
              <Row justify='between' align='center'>
                {isSearchByValue ? handle2Light(p.title) : p.title}
                {
                  !isSearchByValue && !isPagesToday &&
                  <div className='text-[#9f9e9b] text-[12px]'>{
                    formatDate(p.updatedAt, {
                      month: "long",
                      day: "numeric",
                    })}</div>
                }
                {/*ok */}
                {/*<div className='hidden group-hover:block absolute right-[-30%] top-[-20%] bg-black text-white py-1 px-2 rounded-[3px] text-[#7a7977] text-[12px]'>*/}
                {/*  <div>Edited by <span className='text-white'>aaa</span> 1 days ago</div>*/}
                {/*  <div>Created by <span className='text-white'>aaaa</span> 1 days ago</div>*/}
                {/*</div>*/}

                {/* bug*/}
                {/*<div className='hidden group-hover:block absolute right-[-30%] top-[-20%] bg-black text-white py-1 px-2 rounded-[3px] text-[#7a7977] text-[12px]'>*/}
                {/*  <div>Edited by <span className='text-white'>{p.updatedBy}</span> {dayjs(p.updatedAt).fromNow()}</div>*/}
                {/*  <div>Created by <span className='text-white'>aaaaa</span> {dayjs(p.createdAt).fromNow()}</div>*/}
                {/*</div>*/}

                {/*<Icons.enter className='hidden group-hover:flex text-[#9f9e9b] text-[12px]'/>*/}
              </Row>
            </Link>
          ))
        }
      </div>
    )
  }

  const Pages = () => {
    if (isLoading) {
      return <div className='my-12 flex justify-center'><Loading/></div>
    }

    if (Object.keys(data).length > 1) {
      if (
        data?.pagesToday.length === 0 &&
        data?.pagesOfYesterday.length === 0 &&
        data?.pagesOneWeekAgo.length === 0 &&
        data?.pagesOneMonthAgo.length === 0 &&
        data?.pagesOlder.length === 0
      ) {
        return <NoResult/>
      }

      return (
        <Col gap={3}>
          <GroupPage isPagesToday pages={data?.pagesToday} title='Today'/>
          <GroupPage pages={data?.pagesOfYesterday} title='Yesterday'/>
          <GroupPage pages={data?.pagesOneWeekAgo} title='Past week'/>
          <GroupPage pages={data?.pagesOneMonthAgo} title='Past 30 days'/>
          <GroupPage pages={data?.pagesOlder} title='Older'/>
        </Col>
      )
    }

    return (
      <GroupPage isSearchByValue pages={data?.pages} title={'Best match'}/>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className='w-full'>
        <Tooltip>
          <Tooltip.Trigger asChild>
            <Row align='center' gap={2} classes='hover:bg-[#ecebea] rounded px-3 py-2 cursor-pointer'>
              <Icons.search className='h-5 w-5 font-semibold rounded text-sm text-[#777572] flex justify-center'/>
              <p className='text-sm font-semibold text-[#73726e] tracking-wider'>Search</p>
            </Row>
          </Tooltip.Trigger>
          <Tooltip.Content side='right'>
            <div>Search and quickly jump to a page</div>
            <div className='text-[#82817f]'>⌘ + F</div>
          </Tooltip.Content>
        </Tooltip>
      </Dialog.Trigger>
      <Dialog.Content className='p-0 gap-0 max-h-[80vh] max-w-[660px] overflow-hidden'>
        <div className='w-full h-[48px] flex items-center px-2 gap-x-2'>
          <Icons.search className='h-5 w-5 font-semibold rounded text-sm text-[#777572] flex justify-center'/>
          <input
            autoFocus={false}
            onChange={handleSearch}
            className='outline-none w-full' type="text" placeholder={`Search ${workspace?.name}...`}
          />
        </div>
        <div className='border-b border-[#efefef]'/>
        <div className='my-2 max-h-[730px] overflow-y-scroll'>
          {/*<div className='my-2 overflow-y-scroll'>*/}
          <Pages/>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

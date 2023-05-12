'use client'

import dayjs from "dayjs";
import Link from "next/link";
import relativeTime from 'dayjs/plugin/relativeTime';

import { Icons, Row } from "core/components";
import Title from "components/common/title";
import { PATH } from "config/const";

dayjs.extend(relativeTime)

export default function OperationOnTopSharePage({ page }) {
  return (
    <div className="sticky top-0 z-40 bg-white px-4">
      <Row align='center' justify='between' classes="h-11">
        <Row align='center' gap={2}>
          <div className={'hover:bg-[#efefef] rounded p-1.5 h-7 flex justify-center items-center text-[#373530] cursor-pointer font-medium'}>
            <Title maxW={240}>
              {page.title}
            </Title>
          </div>
        </Row>

        <Row align='center' gap={3}>
          <div className={'hover:bg-[#efefef] text-sm rounded p-1.5 h-7 flex justify-center items-center text-[#373530] cursor-pointer font-medium gap-1'}>
            <Icons.search className={'text-lg'}/> <span>Search</span>
          </div>
          <div className={'hover:bg-[#efefef] text-sm rounded p-1.5 h-7 flex justify-center items-center text-[#373530] cursor-pointer font-medium gap-1'}>
            Duplicate
          </div>
          <div className={'hover:bg-[#efefef] text-sm rounded p-1.5 h-7 flex justify-center items-center text-[#373530] cursor-pointer font-medium gap-1'}>
            <Icons.ellipsisHorizontal className={'text-lg'}/>
          </div>

          <div
            className={'w-[1px] h-4 mx-1'}
            style={{ background: `rgba(55, 53, 47, 0.16)` }}
          />

          <Link
            className={'hover:bg-[#efefef] text-sm rounded p-1.5 h-7 flex justify-center items-center text-[#373530] cursor-pointer font-medium gap-1'}
            href={PATH.LOGIN}
          >
            Try Camille
          </Link>
        </Row>
      </Row>
    </div>
  );
}

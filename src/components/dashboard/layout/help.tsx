'use client'

import { Popover, Row, Tooltip, Button } from "core/components";
import { cn } from "core/helpers";
import Link from "next/link";
import { useState } from "react";

export default function Help() {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className={'fixed bottom-5 right-5'}>
      <Popover
        open={showDropdown}
        onOpenChange={(open) => setShowDropdown(open)}
      >
        <Popover.Trigger>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <Row
                align={'center'} justify={'center'}
                classes={` rounded-full bottom-1 drop-shadow-2xl cursor-pointer h-9 w-9 hover:bg-[#efefee] `}
                style={{
                  boxShadow: 'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px'
                }}
              >
                ?
              </Row>
            </Tooltip.Trigger>
            <Tooltip.Content className={'mt-2 mr-4'}>
              {/*Help, feedback, and keyboard shortcut*/}
              About
            </Tooltip.Content>
          </Tooltip>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            side='top'
            className={cn('mb-2 w-[380px] p-4',)}
          >
            <div>
              <div className={'text-sm mb-4 leading-[20px] mb-2'}>
                This simplified Notion clone is built with Next.js 13, Tailwind, Prisma, NextAuth, PlanetScale
              </div>
              <div className={'text-sm mb-4 leading-[20px]'}>
                Reach me out via {' '}
                <p className={'font-medium text-link'}>
                  <a href="mailto:dauphaihau@gmail.com">dauphaihau@gmail.com</a>
                </p>
              </div>
            </div>

            <Row align={'center'} gap={2}>
              {/*<Button>Visit my website</Button>*/}
              {/*<a href="https://github.com/dauphaihau/camille">*/}
              {/*  */}
              {/*</a>*/}
              <Link href={'https://github.com/dauphaihau/camille'} target={'_blank'}>
                <Button variant={'default'}>Github Repo</Button>
              </Link>
            </Row>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </div>
  );
}

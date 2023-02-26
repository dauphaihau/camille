'use client'
import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Box, Button, Row } from "core/components";

interface AuthProps {
  children: ReactNode
}

export default function AuthLayout({
  children
}: AuthProps) {
  const pathName = usePathname()
  return (
    <div className='flex flex-col min-h-screen max-w-5xl mx-auto'>
      <header className='w-full bg-white'>
        <Row
          justify='between'
          align='center'
          classes='h-16 py-4  mx-auto'
        >
          <Link
            href='/'
            className={'font-bold text-xl hover:opacity-50'}
          >
            Camille
          </Link>
        </Row>
      </header>
      <main>{children}</main>
    </div>
  );
}

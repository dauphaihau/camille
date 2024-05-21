import React, { ReactNode } from 'react';
import Link from 'next/link';

import { Col, Row } from 'core/components';

interface AuthProps {
  children: ReactNode
}

export default function AuthLayout({
  children,
}: AuthProps) {
  return (
    <Col className='min-h-screen max-w-6xl mx-auto'>
      <header className='w-full bg-white'>
        <Row
          justify='between'
          align='center'
          classes='h-16 py-4 mx-auto'
        >
          <Link
            href='/'
            className='font-bold text-xl hover:opacity-50'
          >
            Camille
          </Link>
        </Row>
      </header>
      <main>{ children }</main>
    </Col>
  );
}

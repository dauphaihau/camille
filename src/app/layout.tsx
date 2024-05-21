'use client';

import React from 'react';
import { Client, HydrationProvider } from 'react-hydration-provider';
import { Inter } from 'next/font/google';

import 'styles/globals.css';
import { cn } from 'core/helpers';
import { Toaster } from 'core/components';
import Help from 'components/dashboard/layout/help';
import QueryProviders from '../components/query-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({ children }: {
  children: React.ReactNode,
}) {

  return (
    <html
      className={ cn(
        'bg-white font-sans text-slate-900 antialiased',
        inter.variable
      ) }
    >
      <head />
      <body className='min-h-screen'>
        <HydrationProvider>
          <Client>
            <QueryProviders>
              { children }
              <Toaster position='bottom-right' />
              <Help />
            </QueryProviders>
          </Client>
        </HydrationProvider>
      </body>
    </html>
  );
}

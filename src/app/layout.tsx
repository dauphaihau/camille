'use client'

import React from "react";
import { HydrationProvider, Client } from "react-hydration-provider";
import { Inter as FontSans } from "@next/font/google"

import 'styles/globals.css'
import { cn } from 'core/helpers';
import { Toaster } from 'core/components';
import Help from "components/dashboard/layout/help";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
})

export default function RootLayout({ children }: {
  children: React.ReactNode,
}) {

  return (
    <html
      className={cn(
        "bg-white font-sans text-slate-900 antialiased",
        fontSans.variable
      )}
    >
    <head/>
    <body className="min-h-screen">
    <HydrationProvider>
      <Client>
        {children}
        <Toaster position="bottom-right"/>
        <Help/>
      </Client>
    </HydrationProvider>
    </body>
    </html>
  )
}

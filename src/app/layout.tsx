'use client'

import 'styles/globals.css'
import React from "react";
import { Inter as FontSans } from "@next/font/google"
import { cn } from 'core/helpers';
import { session } from "next-auth/core/routes";
import { SessionProvider } from "next-auth/react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
})

export default function RootLayout({
  // pageProps: { session, ...pageProps },
  children,
}: {
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
    <SessionProvider basePath="/api/auth">
      {children}
    </SessionProvider>
    </body>

    {/*<main>*/}
    {/*  <Card>*/}
    {/*    <CardContent>*/}
    {/*      <CardHeader*/}
    {/*        title="Post List"*/}
    {/*        listLength={list?.length ?? 0}*/}
    {/*        // clearAllFn={clearAll}*/}
    {/*      />*/}
    {/*      <List>*/}
    {/*        {list?.map((item) => (*/}
    {/*          <ListItem*/}
    {/*            key={item.id}*/}
    {/*            item={item}*/}
    {/*            // onUpdate={updateOne}*/}
    {/*          />*/}
    {/*        ))}*/}
    {/*      </List>*/}
    {/*    </CardContent>*/}
    {/*    <CardForm*/}
    {/*      value={itemName}*/}
    {/*      onChange={(e) => setItemName(e.target.value)}*/}
    {/*      // submit={insertOne}*/}
    {/*    />*/}
    {/*  </Card>*/}
    {/*</main>*/}
    </html>
  )
}

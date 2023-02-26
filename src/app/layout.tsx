'use client'

import 'styles/globals.css'
import React from "react";
import { HydrationProvider, Client } from "react-hydration-provider";
import { Inter as FontSans } from "@next/font/google"
import { cn } from 'core/helpers';
import { Toaster } from 'core/components/Toast';
import { UIControllerProvider } from "../components/context/UIControllerContext";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
})

export default function RootLayout({ children }: {
  children: React.ReactNode,
}) {
  // console.log('dauphaihau debug: font-sans', fontSans)
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
        <UIControllerProvider>
          {children}
          <Toaster position="bottom-right"/>
        </UIControllerProvider>
      </Client>
    </HydrationProvider>
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

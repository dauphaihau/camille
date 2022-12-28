import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
// import { Card, CardContent, CardForm, CardHeader, List, ListItem } from "../components/Card";
import { useState } from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [itemName, setItemName] = useState<string>("");
  const list = []
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/Volumes/Local/Dev/pj-personal/camille-app/public/favicon.ico"/>
      </Head>
      {/*<h1 className="text-3xl font-bold underline">*/}
      {/*  Hello world!*/}
      {/*</h1>*/}

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

    </>
  )
}

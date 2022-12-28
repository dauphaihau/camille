import '../../styles/globals.css'
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>{children}</body>

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

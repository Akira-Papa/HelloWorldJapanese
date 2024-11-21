import { Noto_Sans_JP } from 'next/font/google'
import type { Metadata } from 'next'
import React from 'react'

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Japanese Greeting',
  description: 'A simple page displaying こんにちは',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={notoSansJP.className} style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}

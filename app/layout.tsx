"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import { RootLayoutClient } from '@/components/layout/root-layout-client'
import { ThemeProvider } from "next-themes"

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RootLayoutClient>
            {children}
          </RootLayoutClient>
        </ThemeProvider>
      </body>
    </html>
  )
} 
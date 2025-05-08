<<<<<<< HEAD
"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import RootLayoutClient from '@/components/layout/root-layout-client'
import { WalletProviderWrapper } from '@/providers/wallet-provider'
import { cn } from '@/lib/utils'
import { Header } from '@/components/header'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

=======
import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from "next-themes"

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: "Agio Network - Waitlist",
  description: "Join the waitlist for the future of decentralized finance",
}

>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<<<<<<< HEAD
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <WalletProviderWrapper>
            <div className="relative flex min-h-screen flex-col bg-white dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-950 dark:to-agio-darkest">
              <div className="flex-1">
                <Header />
                {children}
                <Footer />
              </div>
            </div>
          </WalletProviderWrapper>
=======
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            {children}
          </div>
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
        </ThemeProvider>
      </body>
    </html>
  )
} 
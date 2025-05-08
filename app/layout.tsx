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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
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
        </ThemeProvider>
      </body>
    </html>
  )
} 
"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: "Agio Network - DeFi Lending Protocol",
  description: "Join the waitlist for the future of decentralized finance",
}

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
          <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
} 
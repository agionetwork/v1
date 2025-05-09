import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import { cn } from "@/lib/utils"
import { Providers } from '@/components/providers'

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
        <Providers>
          <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-agio-600 via-agio-500 to-agio-400 dark:from-gray-950 dark:via-agio-600 dark:to-agio-500">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
} 
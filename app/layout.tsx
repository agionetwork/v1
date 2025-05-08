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
          <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-agio-darkest via-agio-darker to-agio-darker dark:from-gray-950 dark:via-agio-darkest dark:to-agio-darkest">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
} 
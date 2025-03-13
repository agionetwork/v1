"use client"

import { usePathname } from 'next/navigation'
import Header from '@/components/header'
import { PageHeaderSpace } from '@/components/layout/page-header-space'
import { ThemeProvider } from '@/components/theme-provider'
import { ClientProviders } from '@/components/providers/client-providers'

export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ClientProviders>
        {isHomePage && <Header />}
        {isHomePage && <PageHeaderSpace />}
        {children}
      </ClientProviders>
    </ThemeProvider>
  )
} 
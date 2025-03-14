"use client"

import { usePathname } from 'next/navigation'
import Header from '@/components/header'
import { PageHeaderSpace } from '@/components/layout/page-header-space'
import { ClientProviders } from '@/components/providers/client-providers'

export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <ClientProviders>
      {isHomePage && <Header />}
      {isHomePage && <PageHeaderSpace />}
      {children}
    </ClientProviders>
  )
} 
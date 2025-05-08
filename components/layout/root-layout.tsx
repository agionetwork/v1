"use client"

import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from "framer-motion"
import { Header } from '@/components/header'
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
      <div className="flex min-h-screen flex-col">
        {isHomePage && <Header />}
        {isHomePage && <PageHeaderSpace />}
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 pt-0"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </ClientProviders>
  )
} 
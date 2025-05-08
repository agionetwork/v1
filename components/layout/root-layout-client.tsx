"use client"

<<<<<<< HEAD
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Header } from "@/components/header"
import { PageHeaderSpace } from "@/components/page-header-space"

export default function RootLayoutClient({
=======
import { usePathname } from 'next/navigation'
import Header from '@/components/header'
import { PageHeaderSpace } from '@/components/layout/page-header-space'
import { ClientProviders } from '@/components/providers/client-providers'

export function RootLayoutClient({
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
<<<<<<< HEAD

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <PageHeaderSpace />
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
    </div>
=======
  const isHomePage = pathname === '/'

  return (
    <ClientProviders>
      {isHomePage && <Header />}
      {isHomePage && <PageHeaderSpace />}
      {children}
    </ClientProviders>
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
  )
} 
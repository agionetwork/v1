"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Agio Network
            </span>
          </Link>
          {!isHomepage && (
            <nav className="hidden md:flex gap-6">
              <Link
                href="/borrow-lend"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Borrow & Lend
              </Link>
              <Link
                href="/loan-offers/marketplace"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Marketplace
              </Link>
              <Link
                href="/risk-assessment"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Risk Assessment
              </Link>
              <Link
                href="/socialfi"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                SocialFi
              </Link>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/dashboard?tab=overview">
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700 text-white"
            >
              LAUNCH APP
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
} 
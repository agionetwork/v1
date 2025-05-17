"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render dynamic content during SSR to avoid hydration errors
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/10 site-header">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/blue-hat.png"
              alt="Blue Hat"
              width={48}
              height={48}
              className="object-contain"
            />
            <span className="text-xl font-bold text-white">AGIO NETWORK</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <div className="h-10 w-10"></div>
            <div className="h-10"></div>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <div className="h-8 w-8"></div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/10 site-header">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/blue-hat.png"
            alt="Blue Hat"
            width={48}
            height={48}
            className="object-contain"
          />
          <span className="text-xl font-bold text-white">AGIO NETWORK</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-white hover:bg-transparent hover:text-[#1358EC] focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Link href="/borrow-lend" passHref legacyBehavior>
            <Button asChild size="sm" className="bg-white hover:bg-gray-100 text-blue-600">
              <span>
                LAUNCH APP
              </span>
            </Button>
          </Link>
        </nav>
        
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-white hover:bg-transparent hover:text-[#1358EC]"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </header>
  )
} 
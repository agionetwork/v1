"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-sm dark:bg-background/80">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto max-w-7xl">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-blue-600">AGIO NETWORK</span>
        </Link>
        
        <div className="flex items-center gap-2">
          <ThemeToggle className="text-black dark:text-white" />
          <Link href="/borrow-lend">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              LAUNCH APP
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
} 
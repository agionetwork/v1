"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WalletConnect } from "@/components/wallet-connect"
import { NotificationsPopover } from "@/components/notifications/notifications-popover"
import { SettingsPopover } from "@/components/settings/settings-popover"
import { Sun, Moon, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export default function DashboardHeader() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Agio Network
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/dashboard"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/dashboard" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/borrow-lend"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/borrow-lend" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Emprestar
            </Link>
            <Link
              href="/loan-offers"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/loan-offers" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Tomar Empréstimo
            </Link>
          </nav>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-4">
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/borrow-lend"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/borrow-lend" ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Emprestar
              </Link>
              <Link
                href="/loan-offers"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/loan-offers" ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Tomar Empréstimo
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <WalletConnect />
          </div>
          <nav className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <NotificationsPopover />
            <SettingsPopover />
          </nav>
        </div>
      </div>
    </header>
  )
}


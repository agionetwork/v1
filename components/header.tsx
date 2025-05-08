"use client"

import Link from "next/link"
<<<<<<< HEAD
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { WalletConnect } from "@/components/wallet-connect"
import { motion } from "framer-motion"
import { Moon, Sun, Bell, Settings } from "lucide-react"
import { useTheme } from "next-themes"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Borrow / Lend", href: "/borrow-lend" },
  { name: "Loan Offers", href: "/loan-offers/marketplace" },
  { name: "SocialFi", href: "/socialfi" },
]

const notifications = [
  { id: 1, message: "New loan offer available", time: "2 min ago" },
  { id: 2, message: "Your loan was approved", time: "1 hour ago" },
  { id: 3, message: "Payment received", time: "2 hours ago" },
]

export function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const isHomePage = pathname === "/"

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 max-w-screen-2xl items-center">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/blue-hat.png"
              alt="AGIO NETWORK"
              width={32}
              height={32}
              className="mr-2"
            />
            <motion.span
              className="font-bold text-xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              AGIO NETWORK
            </motion.span>
          </Link>

          {!isHomePage && (
            <div className="flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 p-0 text-[10px]">
                  3
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Notifications</h4>
                <div className="space-y-2">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start justify-between"
                    >
                      <div>
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          {isHomePage ? (
            <Button asChild variant="default" size="lg">
              <Link href="/dashboard">LAUNCH APP</Link>
            </Button>
          ) : (
            <WalletConnect />
          )}
        </div>
      </nav>
=======
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
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
    </header>
  )
} 
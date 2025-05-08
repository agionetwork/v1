"use client"

import Link from "next/link"
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
    </header>
  )
} 
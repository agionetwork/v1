"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import WalletConnect from "@/components/wallet-connect"
import { NotificationsPopover } from "@/components/notifications/notifications-popover"
import { SettingsPopover } from "@/components/settings/settings-popover"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function DashboardHeader() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background dark:bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-xl text-blue-600">
            AGIO NETWORK
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium dark:text-white text-black hover:text-blue-600 dark:hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/borrow-lend" className="text-sm font-medium dark:text-white text-black hover:text-blue-600 dark:hover:text-blue-600">
              Borrow / Lend
            </Link>
            <Link href="/loan-offers/marketplace" className="text-sm font-medium dark:text-white text-black hover:text-blue-600 dark:hover:text-blue-600">
              Loan Offers
            </Link>
            <Link href="/socialfi" className="text-sm font-medium dark:text-white text-black hover:text-blue-600 dark:hover:text-blue-600 relative">
              SocialFi
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="absolute -top-3 -right-10 h-3.5 w-9 rounded-full bg-blue-600 text-[8px] font-medium text-white flex items-center justify-center">
                      Soon
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Agio DeFi Social Network Soon!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="group">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-600 focus:bg-transparent focus:ring-0 active:bg-transparent"
              style={{ backgroundColor: 'transparent' }}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-white group-hover:text-blue-600" />
              ) : (
                <Moon className="h-5 w-5 text-black group-hover:text-blue-600" />
              )}
            </Button>
          </div>
          <NotificationsPopover className="dark:text-white text-black hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-600 focus:bg-transparent focus:ring-0 active:bg-transparent" />
          <SettingsPopover className="dark:text-white text-black hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-600 focus:bg-transparent focus:ring-0 active:bg-transparent" />
          <WalletConnect />
        </div>
      </div>
    </header>
  )
}


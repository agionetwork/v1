"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import WalletConnect from "@/components/wallet-connect"
import { NotificationsPopover } from "@/components/notifications/notifications-popover"
import { SettingsPopover } from "@/components/settings/settings-popover"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

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
            <Link href="/dashboard" className="text-sm font-medium dark:text-white text-black hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/borrow-lend" className="text-sm font-medium dark:text-white text-black hover:text-blue-600">
              Borrow / Lend
            </Link>
            <Link href="/loan-offers/marketplace" className="text-sm font-medium dark:text-white text-black hover:text-blue-600">
              Loan Offers
            </Link>
            <Link href="/socialfi" className="text-sm font-medium dark:text-white text-black hover:text-blue-600">
              SocialFi
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:bg-transparent"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-white" />
            ) : (
              <Moon className="h-5 w-5 text-black" />
            )}
          </Button>
          <NotificationsPopover className="dark:text-white text-black hover:bg-transparent" />
          <SettingsPopover className="dark:text-white text-black hover:bg-transparent" />
          <WalletConnect />
        </div>
      </div>
    </header>
  )
}


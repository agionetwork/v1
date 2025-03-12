import Link from "next/link"
import Image from "next/image"
import { Shield } from "lucide-react"

import WalletConnect from "@/components/wallet-connect"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationsPopover } from "@/components/notifications/notifications-popover"
import { SettingsDialog } from "@/components/settings-dialog"

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-agio">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="AGIO Logo" width={32} height={32} />
          <span className="text-lg font-bold text-white">AGIO NETWORK</span>
        </Link>
        
        <nav className="ml-8 hidden md:flex items-center space-x-1">
          <Link 
            href="/dashboard?tab=overview" 
            className="rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
          >
            Dashboard
          </Link>
          <Link 
            href="/borrow-lend" 
            className="rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
          >
            Borrow / Lend
          </Link>
          <Link 
            href="/loan-offers/marketplace" 
            className="rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
          >
            Loan Offers
          </Link>
          <Link 
            href="/socialfi/community" 
            className="rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
          >
            SocialFi
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <NotificationsPopover />
          <ThemeToggle />
          <SettingsDialog />
          <WalletConnect />
        </div>
      </div>
    </header>
  )
}


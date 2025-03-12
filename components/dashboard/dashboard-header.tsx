import Link from "next/link"
import { Shield, Settings } from "lucide-react"

import WalletConnect from "@/components/wallet-connect"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationsPopover } from "@/components/notifications/notifications-popover"
import { Button } from "@/components/ui/button"

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-agio px-4 py-3 flex items-center">
      <Link className="flex items-center justify-center" href="/">
        <Shield className="h-6 w-6 text-white" />
        <span className="ml-2 text-xl font-bold text-white">AGIO NETWORK</span>
      </Link>
      
      <nav className="ml-8 flex items-center space-x-6">
        <Link href="/dashboard?tab=overview" className="text-white/90 hover:text-white transition-colors">
          Borrow / Lend
        </Link>
        <Link href="/loan-offers/marketplace" className="text-white/90 hover:text-white transition-colors">
          Loan Offers
        </Link>
        <Link href="/socialfi/community" className="text-white/90 hover:text-white transition-colors">
          SocialFi
        </Link>
        <Link href="/risk-assessment" className="text-white/90 hover:text-white transition-colors">
          Risk Assessment
        </Link>
        <Link href="/referral" className="text-white/90 hover:text-white transition-colors">
          Referral Program
        </Link>
      </nav>

      <div className="ml-auto flex items-center space-x-4">
        <NotificationsPopover />
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          aria-label="Settings"
        >
          <Settings className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <WalletConnect />
      </div>
    </header>
  )
}


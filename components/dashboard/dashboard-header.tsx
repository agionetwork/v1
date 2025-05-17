"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NotificationsPopover } from "@/components/notifications/notifications-popover"
import { SettingsPopover } from "@/components/settings/settings-popover"
import { Sun, Moon, Menu, Wallet, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { WalletConnectModal } from "@/components/wallet-connect-modal"
import { useUser } from "@civic/auth-web3/react"
import { userHasWallet } from "@civic/auth-web3"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"

export default function DashboardHeader() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const userContext = useUser()
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [walletProvider, setWalletProvider] = useState<string>('')

  useEffect(() => {
    setMounted(true)
    
    // Check for connected wallet using localStorage
    if (typeof window !== 'undefined') {
      const storedWalletAddress = localStorage.getItem('walletAddress')
      const storedWalletProvider = localStorage.getItem('walletProvider')
      
      if (storedWalletAddress) {
        setWalletAddress(storedWalletAddress)
      }
      
      if (storedWalletProvider) {
        setWalletProvider(storedWalletProvider)
      }
    }
  }, [])

  // Format wallet address to abbreviated format
  const formatWalletAddress = (address: string) => {
    if (!address) return ''
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  // Check if user is connected
  const isConnected = mounted && (walletAddress || (userContext.user && userHasWallet(userContext)))

  // Get wallet display name
  const getWalletDisplayName = () => {
    if (walletProvider === 'phantom') return 'Phantom'
    if (walletProvider === 'solflare') return 'Solflare'
    if (walletProvider === 'backpack') return 'Backpack'
    if (walletProvider === 'civic') return 'Embedded Wallet'
    return 'Wallet'
  }
  
  // Function to disconnect wallet
  const disconnectWallet = () => {
    // If using Civic Auth, sign out
    if (userContext.user) {
      userContext.signOut()
    }
    
    // Clear wallet info from localStorage
    localStorage.removeItem('walletAddress')
    localStorage.removeItem('walletProvider')
    localStorage.removeItem('socialProvider')
    
    // Reset states
    setWalletAddress('')
    setWalletProvider('')
    
    // Notify the user
    toast.success("Wallet disconnected successfully")
    
    // Redirect to home page
    router.push('/')
  }
  
  // Function to navigate to user profile
  const navigateToProfile = () => {
    router.push('/dashboard')
  }

  // Render skeleton during SSR to avoid hydration errors
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-blue-950 backdrop-blur supports-[backdrop-filter]:bg-blue-950/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <img src="/images/blue-hat.png" alt="Blue Hat" className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">
                Agio Network
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <div className="h-8 w-24"></div>
              <div className="h-8 w-24"></div>
              <div className="h-8 w-24"></div>
            </nav>
          </div>
          <div className="mr-2 md:hidden">
            <div className="h-8 w-8"></div>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-2">
              <div className="h-8 w-8"></div>
              <div className="h-8 w-8"></div>
              <div className="h-8 w-8"></div>
            </nav>
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="h-8 w-32"></div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-blue-950 backdrop-blur supports-[backdrop-filter]:bg-blue-950/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <img src="/images/blue-hat.png" alt="Blue Hat" className="h-6 w-6" />
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
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                pathname === "/borrow-lend" ? "bg-[#1358EC] text-white" : "text-foreground/60 hover:text-foreground"
              )}
            >
              Borrow / Lend
            </Link>
            <Link
              href="/loan-offers"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/loan-offers" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Loan Offers
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
                href="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/" ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
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
                Borrow / Lend
              </Link>
              <Link
                href="/loan-offers"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/loan-offers" ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Loan Offers
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
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
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {isConnected ? (
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="bg-blue-800 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all hover:bg-blue-700 cursor-pointer">
                      <Wallet className="h-4 w-4" />
                      <span className="font-medium text-sm">
                        {getWalletDisplayName()}: {formatWalletAddress(walletAddress)}
                      </span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={disconnectWallet} className="text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Disconnect Wallet</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Avatar 
                  className="h-8 w-8 cursor-pointer border-2 border-blue-500" 
                  onClick={navigateToProfile}
                >
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback>{userContext.user?.name?.toString()?.slice(0, 2) || walletAddress?.slice(0, 2) || "UN"}</AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <Button 
                className="bg-[#1358EC] text-white hover:bg-[#104BCA]"
                onClick={() => setIsWalletModalOpen(true)}
              >
                CONNECT WALLET
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Wallet connection modal */}
      <WalletConnectModal isOpen={isWalletModalOpen} setIsOpen={setIsWalletModalOpen} />
    </header>
  )
}


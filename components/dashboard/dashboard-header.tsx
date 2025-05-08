"use client"

import Link from "next/link"
<<<<<<< HEAD
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { WalletConnect } from "@/components/wallet-connect"
=======
import { Button } from "@/components/ui/button"
import WalletConnect from "@/components/wallet-connect"
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
import { NotificationsPopover } from "@/components/notifications/notifications-popover"
import { SettingsPopover } from "@/components/settings/settings-popover"
import { Sun, Moon, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState, useEffect } from "react"
<<<<<<< HEAD

export default function DashboardHeader() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
=======
import { usePathname } from "next/navigation"

export default function DashboardHeader() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944

  useEffect(() => {
    setMounted(true)
  }, [])

<<<<<<< HEAD
=======
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="font-bold text-xl">AGIO NETWORK</span>
          </div>
        </div>
      </header>
    )
  }

>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background dark:bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
<<<<<<< HEAD
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/images/blue-hat.png"
              alt="Blue Hat"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="font-bold text-xl text-blue-600">
              AGIO NETWORK
            </span>
          </Link>
          {/* Menu para desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium dark:text-white text-black hover:text-blue-600 dark:hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/borrow-lend" className="text-sm font-medium dark:text-white text-black hover:text-blue-600 dark:hover:text-blue-600">
              Borrow / Lend
            </Link>
            <Link href="/loan-offers/marketplace" className="text-sm font-medium dark:text-white text-black hover:text-blue-600 dark:hover:text-blue-600">
              Loan Offers
            </Link>
            <Link href="/socialfi" className="text-sm font-medium dark:text-white text-black hover:text-agio-light dark:hover:text-agio-light relative">
=======
          <Link href="/" className="font-bold text-xl text-blue-600">
            AGIO NETWORK
          </Link>
          {/* Menu para desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/dashboard" 
              className={`text-sm font-medium ${
                isActive('/dashboard')
                  ? 'text-blue-600 dark:text-blue-600'
                  : 'dark:text-white text-black hover:text-blue-600 dark:hover:text-blue-600'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/borrow-lend" 
              className={`text-sm font-medium ${
                isActive('/borrow-lend')
                  ? 'text-blue-600 dark:text-blue-600'
                  : 'dark:text-white text-black hover:text-blue-600 dark:hover:text-blue-600'
              }`}
            >
              Borrow / Lend
            </Link>
            <Link 
              href="/loan-offers/marketplace" 
              className={`text-sm font-medium ${
                isActive('/loan-offers')
                  ? 'text-blue-600 dark:text-blue-600'
                  : 'dark:text-white text-black hover:text-blue-600 dark:hover:text-blue-600'
              }`}
            >
              Loan Offers
            </Link>
            <Link 
              href="/socialfi" 
              className={`text-sm font-medium ${
                isActive('/socialfi')
                  ? 'text-blue-600 dark:text-blue-600'
                  : 'dark:text-white text-black hover:text-blue-600 dark:hover:text-blue-600'
              } relative`}
            >
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
              SocialFi
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
<<<<<<< HEAD
                    <span className="absolute -top-3 -right-10 h-3.5 w-9 rounded-full bg-agio-default text-[8px] font-medium text-white flex items-center justify-center">
=======
                    <span className="absolute -top-3 -right-10 h-3.5 w-9 rounded-full bg-blue-600 text-[8px] font-medium text-white flex items-center justify-center">
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
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
          
          {/* Menu hamburguer para mobile */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-600 focus:bg-transparent focus:ring-0 active:bg-transparent">
                  <Menu className="h-5 w-5 dark:text-white text-black" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col gap-4 mt-8">
                  <Link 
                    href="/dashboard" 
<<<<<<< HEAD
                    className="text-sm font-medium dark:text-white text-black hover:text-blue-600 dark:hover:text-blue-600 py-2"
=======
                    className={`text-sm font-medium ${
                      isActive('/dashboard')
                        ? 'text-blue-600 dark:text-blue-600'
                        : 'dark:text-white text-black hover:text-blue-600 dark:hover:text-blue-600'
                    } py-2`}
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/borrow-lend" 
<<<<<<< HEAD
                    className="text-sm font-medium dark:text-white text-black hover:text-blue-600 dark:hover:text-blue-600 py-2"
=======
                    className={`text-sm font-medium ${
                      isActive('/borrow-lend')
                        ? 'text-blue-600 dark:text-blue-600'
                        : 'dark:text-white text-black hover:text-blue-600 dark:hover:text-blue-600'
                    } py-2`}
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
                    onClick={() => setIsOpen(false)}
                  >
                    Borrow / Lend
                  </Link>
                  <Link 
                    href="/loan-offers/marketplace" 
<<<<<<< HEAD
                    className="text-sm font-medium dark:text-white text-black hover:text-blue-600 dark:hover:text-blue-600 py-2"
=======
                    className={`text-sm font-medium ${
                      isActive('/loan-offers')
                        ? 'text-blue-600 dark:text-blue-600'
                        : 'dark:text-white text-black hover:text-blue-600 dark:hover:text-blue-600'
                    } py-2`}
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
                    onClick={() => setIsOpen(false)}
                  >
                    Loan Offers
                  </Link>
                  <Link 
                    href="/socialfi" 
<<<<<<< HEAD
                    className="text-sm font-medium dark:text-white text-black hover:text-agio-light dark:hover:text-agio-light relative py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    SocialFi
                    <span className="ml-2 h-3.5 w-9 rounded-full bg-agio-default text-[8px] font-medium text-white inline-flex items-center justify-center">
=======
                    className={`text-sm font-medium ${
                      isActive('/socialfi')
                        ? 'text-blue-600 dark:text-blue-600'
                        : 'dark:text-white text-black hover:text-blue-600 dark:hover:text-blue-600'
                    } relative py-2`}
                    onClick={() => setIsOpen(false)}
                  >
                    SocialFi
                    <span className="ml-2 h-3.5 w-9 rounded-full bg-blue-600 text-[8px] font-medium text-white inline-flex items-center justify-center">
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
                      Soon
                    </span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="group">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
<<<<<<< HEAD
              className="hover:bg-transparent hover:text-agio-light dark:hover:text-agio-light focus:bg-transparent focus:ring-0 active:bg-transparent"
              style={{ backgroundColor: 'transparent' }}
            >
              {mounted && (theme === "dark" ? (
                <Sun className="h-5 w-5 text-white group-hover:text-agio-light" />
              ) : (
                <Moon className="h-5 w-5 text-black group-hover:text-agio-light" />
              ))}
            </Button>
          </div>
          <NotificationsPopover className="dark:text-white text-black hover:bg-transparent hover:text-agio-light dark:hover:text-agio-light focus:bg-transparent focus:ring-0 active:bg-transparent" />
          <SettingsPopover className="dark:text-white text-black hover:bg-transparent hover:text-agio-light dark:hover:text-agio-light focus:bg-transparent focus:ring-0 active:bg-transparent" />
=======
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
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
          <WalletConnect />
        </div>
      </div>
    </header>
  )
}


"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { WalletConnect } from "@/components/wallet-connect"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Agio Network</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/dashboard"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/dashboard"
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/borrow"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/borrow"
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Emprestar
            </Link>
            <Link
              href="/lend"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/lend"
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Tomar Empréstimo
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <WalletConnect />
        </div>
      </div>
    </header>
  )
} 
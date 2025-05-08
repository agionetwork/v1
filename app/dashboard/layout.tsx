"use client"

import DashboardHeader from "@/components/dashboard/dashboard-header"
import { WalletProvider } from "@solana/wallet-adapter-react"
import { ConnectionProvider } from "@solana/wallet-adapter-react"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom"
import { clusterApiUrl } from "@solana/web3.js"
import { useMemo } from "react"
import dynamic from 'next/dynamic'

require("@solana/wallet-adapter-react-ui/styles.css")

// Lazy load components that are not immediately needed
const DynamicDashboardHeader = dynamic(() => import("@/components/dashboard/dashboard-header"), {
  ssr: false,
  loading: () => <div className="h-16 bg-background" /> // Placeholder while loading
})

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const endpoint = useMemo(() => clusterApiUrl("devnet"), [])
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <>
          <DynamicDashboardHeader />
          <div className="container mx-auto p-6">
            {children}
          </div>
        </>
      </WalletProvider>
    </ConnectionProvider>
  )
} 
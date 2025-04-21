"use client"

import DashboardHeader from "@/components/dashboard/dashboard-header"
import { WalletProvider } from "@solana/wallet-adapter-react"
import { ConnectionProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"
import { useMemo } from "react"
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"

require("@solana/wallet-adapter-react-ui/styles.css")

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const endpoint = useMemo(() => clusterApiUrl("devnet"), [])
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <>
            <DashboardHeader />
            {children}
          </>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
} 
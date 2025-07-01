"use client"

import { WalletProvider } from "@solana/wallet-adapter-react"
import { ConnectionProvider } from "@solana/wallet-adapter-react"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom"
import { clusterApiUrl } from "@solana/web3.js"
import { useMemo } from "react"
import DashboardHeader from "../../components/dashboard/dashboard-header"

require("@solana/wallet-adapter-react-ui/styles.css")

export default function BorrowLendLayout({
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
          <DashboardHeader />
          <div className="container mx-auto p-6">
            {children}
          </div>
        </>
      </WalletProvider>
    </ConnectionProvider>
  )
} 
"use client"

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import { Wallet } from "lucide-react"
import { useEffect, useState } from "react"

export function WalletConnect() {
  const { connected } = useWallet()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center gap-4">
      {connected ? (
        <WalletMultiButton className="!bg-blue-500 hover:!bg-blue-600 text-white" />
      ) : (
        <WalletMultiButton className="!bg-blue-500 hover:!bg-blue-600 text-white">
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </WalletMultiButton>
      )}
    </div>
  )
}


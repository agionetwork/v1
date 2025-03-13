"use client"

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import { Wallet } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface WalletConnectProps {
  className?: string
}

export default function WalletConnect({ className }: WalletConnectProps) {
  const { publicKey, connected, connecting } = useWallet()
  const [mounted, setMounted] = useState(false)

  // Evita problemas de hidratação
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <WalletMultiButton 
      className={cn("bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-4 py-2 flex items-center border-none", className)}
      startIcon={<Wallet className="mr-2 h-4 w-4 text-white" />}
    >
      {connecting 
        ? "Connecting..." 
        : connected && publicKey 
          ? publicKey.toString().slice(0, 4) + "..." + publicKey.toString().slice(-4) 
          : "CONNECT WALLET"
      }
    </WalletMultiButton>
  )
}


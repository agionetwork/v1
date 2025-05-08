"use client"

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"
import { useMemo, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { CivicAuthProvider } from "@civic/auth-web3/react"

require("@solana/wallet-adapter-react-ui/styles.css")

export function WalletProviderWrapper({ children }: { children: React.ReactNode }) {
  // All hooks at the top of the component
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])
  
  // Wallet configuration
  const wallets = useMemo(() => {
    if (typeof window === "undefined") return []
    return [
      new PhantomWalletAdapter({
        network,
        autoConnect: true,
      }),
    ]
  }, [network])

  // Callbacks
  const handleWalletError = useCallback((error: Error) => {
    console.error("Wallet provider error:", error)
  }, [])

  const handleSignIn = useCallback(async (user: any) => {
    try {
      console.log("User logged in:", user)
      if (user && user.id) {
        localStorage.setItem('civic_user_id', user.id)
      }
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
    }
  }, [router])

  const handleSignOut = useCallback(async () => {
    try {
      console.log("User logged out")
      localStorage.removeItem('civic_user_id')
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
      router.push("/")
    }
  }, [router])

  // Mount effect
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ConnectionProvider endpoint={endpoint} config={{ commitment: 'confirmed' }}>
      <WalletProvider 
        wallets={wallets} 
        autoConnect={true}
        onError={handleWalletError}
      >
        <CivicAuthProvider
          clientId="65004c36-3e4f-41a1-b0eb-8a9fc72dbf04"
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
        >
          {children}
        </CivicAuthProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
} 
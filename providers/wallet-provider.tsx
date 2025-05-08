"use client"

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"
<<<<<<< HEAD
import { useMemo, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { CivicAuthProvider } from "@civic/auth-web3/react"
=======
import { useMemo } from "react"
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944

require("@solana/wallet-adapter-react-ui/styles.css")

export function WalletProviderWrapper({ children }: { children: React.ReactNode }) {
<<<<<<< HEAD
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
=======
  // Você pode mudar para 'mainnet-beta' quando estiver pronto para produção
  const network = WalletAdapterNetwork.Devnet
  
  // Você também pode usar um RPC personalizado aqui
  const endpoint = useMemo(() => clusterApiUrl(network), [network])
  
  // Configurando o adaptador do Phantom com opções
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter({
        network,
        // O adaptador tentará reconectar se a última conexão foi bem-sucedida
        autoConnect: true,
      }),
    ],
    [network]
  )
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944

  return (
    <ConnectionProvider endpoint={endpoint} config={{ commitment: 'confirmed' }}>
      <WalletProvider 
        wallets={wallets} 
        autoConnect={true}
<<<<<<< HEAD
        onError={handleWalletError}
      >
        <CivicAuthProvider
          clientId="65004c36-3e4f-41a1-b0eb-8a9fc72dbf04"
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
        >
          {children}
        </CivicAuthProvider>
=======
        onError={(error) => {
          console.error("Erro no provedor da carteira:", error)
        }}
      >
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
      </WalletProvider>
    </ConnectionProvider>
  )
} 
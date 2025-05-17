"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { WALLET_CONFIGS, CIVIC_CONFIG } from "@/config/wallet-config"
import { useUser } from "@civic/auth-web3/react"
import { userHasWallet } from "@civic/auth-web3"

// Interface for component props
interface WalletConnectModalProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function WalletConnectModal({ isOpen, setIsOpen }: WalletConnectModalProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const userContext = useUser()
  
  // Mount component only on client-side to avoid hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  // Function to connect to Phantom wallet
  const connectPhantom = async () => {
    setLoading('phantom')
    try {
      // Check if Phantom is installed
      const solana = window.solana as any
      const isPhantomInstalled = solana && solana.isPhantom
      
      if (!isPhantomInstalled) {
        window.open('https://phantom.app/', '_blank')
        toast.error("Phantom wallet not detected. Please install it to continue.")
        setLoading(null)
        return
      }
      
      // Request connection to Phantom
      const resp = await solana.connect()
      const publicKey = resp.publicKey.toString()
      
      toast.success(`Connected to Phantom successfully!`)
      console.log("Connected account:", publicKey)
      
      // Store connected wallet info in localStorage
      localStorage.setItem('walletProvider', 'phantom')
      localStorage.setItem('walletAddress', publicKey)
      
      setIsOpen(false)
      router.push('/dashboard')
    } catch (error) {
      console.error("Error connecting to Phantom:", error)
      toast.error("Failed to connect to Phantom")
    } finally {
      setLoading(null)
    }
  }

  // Function to connect to Solflare wallet
  const connectSolflare = async () => {
    setLoading('solflare')
    try {
      // Check if Solflare is installed
      const solflare = window.solflare as any
      const isSolflareInstalled = solflare && solflare.isSolflare
      
      if (!isSolflareInstalled) {
        window.open('https://solflare.com/', '_blank')
        toast.error("Solflare wallet not detected. Please install it to continue.")
        setLoading(null)
        return
      }
      
      // Request connection to Solflare
      const resp = await solflare.connect()
      const publicKey = resp.publicKey.toString()
      
      toast.success(`Connected to Solflare successfully!`)
      console.log("Connected account:", publicKey)
      
      // Store connected wallet info in localStorage
      localStorage.setItem('walletProvider', 'solflare')
      localStorage.setItem('walletAddress', publicKey)
      
      setIsOpen(false)
      router.push('/dashboard')
    } catch (error) {
      console.error("Error connecting to Solflare:", error)
      toast.error("Failed to connect to Solflare")
    } finally {
      setLoading(null)
    }
  }

  // Function to connect to Backpack wallet
  const connectBackpack = async () => {
    setLoading('backpack')
    try {
      // Safe check for Backpack window object
      if (!(window as any).backpack) {
        console.log("Backpack wallet not found in window object")
        toast.error("Backpack wallet extension not detected. Please install it to continue.")
        window.open('https://www.backpack.app/', '_blank')
        setLoading(null)
        return
      }
      
      const backpack = (window as any).backpack
      console.log("Backpack object properties:", Object.keys(backpack))
      
      // XNft adapter uses different property name
      const isBackpackInstalled = backpack.isBackpack || backpack.isXnft
      
      if (!isBackpackInstalled) {
        console.log("Backpack detected but not properly initialized")
        window.open('https://www.backpack.app/', '_blank')
        toast.error("Backpack wallet detected but not properly initialized. Please refresh and try again.")
        setLoading(null)
        return
      }
      
      console.log("Attempting to connect to Backpack...")
      
      try {
        // Request connection to Backpack
        const resp = await backpack.connect()
        const publicKey = resp.publicKey.toString()
        
        toast.success(`Connected to Backpack successfully!`)
        console.log("Connected account:", publicKey)
        
        // Store connected wallet info in localStorage
        localStorage.setItem('walletProvider', 'backpack')
        localStorage.setItem('walletAddress', publicKey)
        
        setIsOpen(false)
        router.push('/dashboard')
      } catch (backpackError: any) {
        // Handle the specific "No User. Needs Onboarding" error
        if (backpackError.message && backpackError.message.includes("No User. Needs Onboarding")) {
          console.log("Backpack requires onboarding first")
          toast.error("Please complete the Backpack wallet setup first by creating or importing a wallet")
          
          // Open Backpack's extension popup to prompt the user to complete setup
          if (typeof backpack.openExtensionPopup === 'function') {
            backpack.openExtensionPopup()
          } else {
            // Fallback if openExtensionPopup is not available
            window.open('https://www.backpack.app/download', '_blank')
          }
        } else {
          // Handle other Backpack-specific errors
          throw backpackError
        }
      }
    } catch (error) {
      console.error("Error connecting to Backpack:", error)
      toast.error("Failed to connect to Backpack. Error: " + (error instanceof Error ? error.message : String(error)))
    } finally {
      setLoading(null)
    }
  }

  // Function to connect with Civic Auth embedded wallet
  const connectWithCivicEmbedded = async () => {
    setLoading('google')
    try {
      console.log("Starting Google authentication with Civic Auth...")
      
      // Start Civic Auth authentication flow with explicit configuration
      await userContext.signIn({
        displayMode: 'iframe'
      })
      
      // Log success in attempts to diagnose issues
      console.log("Auth initialization successful, waiting for authentication to complete...")
      
      // The useUser hook will update the user state automatically after login
    } catch (error) {
      console.error("Error initializing Google authentication:", error)
      toast.error("Failed to authenticate with Google")
      setLoading(null)
    }
  }
  
  // Effect to create wallet and redirect after successful authentication
  useEffect(() => {
    const setupWallet = async () => {
      if (userContext.user && loading === 'google') {
        try {
          console.log("User authenticated, checking for wallet:", userContext.user)
          
          // Check if user has a wallet using userHasWallet helper
          if (!userHasWallet(userContext)) {
            // Create embedded wallet if it doesn't exist
            toast.info("Creating embedded wallet for you...")
            
            // Call createWallet function from user context
            await userContext.createWallet()
            
            toast.success("Wallet created successfully!")
          }
          
          // Get user wallet after creation
          // If userHasWallet returns true, we can access userContext.solana.address
          const walletAddress = userHasWallet(userContext) 
            ? userContext.solana.address 
            : ''
          
          // Store wallet info in localStorage
          localStorage.setItem('walletProvider', 'civic')
          localStorage.setItem('walletAddress', walletAddress)
          localStorage.setItem('socialProvider', 'google')
          
          // Close modal and redirect
          setLoading(null)
          setIsOpen(false)
          router.push('/dashboard')
        } catch (error) {
          console.error("Error creating wallet:", error)
          toast.error("Failed to create embedded wallet")
          setLoading(null)
        }
      }
    }
    
    setupWallet()
  }, [userContext, loading, router, setIsOpen])

  // Function to choose which connect method to use based on wallet type
  const connectWallet = (walletType: string) => {
    switch(walletType) {
      case 'phantom':
        connectPhantom()
        break
      case 'solflare':
        connectSolflare()
        break
      case 'backpack':
        connectBackpack()
        break
      default:
        toast.error("Unsupported wallet type")
    }
  }

  // Don't render during SSR to avoid hydration errors
  if (!mounted) return null
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden rounded-xl border-0">
        <div className="flex flex-col md:flex-row w-full">
          {/* Left column - Web3 Wallets */}
          <div className="md:w-1/2 p-6 bg-slate-50 dark:bg-slate-900">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-bold">
                Connect Blockchain Wallet
              </DialogTitle>
              <DialogDescription>
                Connect your Solana wallet to continue
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col space-y-3">
              {Object.entries(WALLET_CONFIGS).map(([key, config]) => (
                <Button
                  key={key}
                  onClick={() => connectWallet(key)}
                  variant="outline"
                  className="justify-start py-6 px-4 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  disabled={loading !== null}
                >
                  <div className="flex items-center w-full">
                    <div className="w-8 h-8 mr-4 flex items-center justify-center">
                      <img
                        src={config.icon}
                        alt={`${config.name} Wallet`}
                        width={32}
                        height={32}
                        className="max-w-full max-h-full rounded-full overflow-hidden"
                      />
                    </div>
                    <span className="font-semibold">
                      {loading === key ? 'Connecting...' : config.name}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Vertical separator */}
          <div className="hidden md:block w-px h-auto bg-slate-200 dark:bg-slate-700"></div>
          
          {/* Right column - Civic Auth */}
          <div className="md:w-1/2 p-6 bg-white dark:bg-slate-950">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-bold">
                Connect with Social Login
              </DialogTitle>
              <DialogDescription>
                Use your social account to create a wallet
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col space-y-3">
              {Object.entries(CIVIC_CONFIG.providers).map(([key, config]) => (
                <Button
                  key={key}
                  onClick={() => connectWithCivicEmbedded()}
                  variant="outline"
                  className="justify-start py-6 px-4 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  disabled={loading !== null}
                >
                  <div className="flex items-center w-full">
                    <div className="w-8 h-8 mr-4 flex items-center justify-center">
                      <img
                        src={config.icon}
                        alt={config.name}
                        width={32}
                        height={32}
                        className="max-w-full max-h-full rounded-full overflow-hidden"
                      />
                    </div>
                    <span className="font-semibold">
                      {loading === 'google' ? 'Connecting...' : config.name}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
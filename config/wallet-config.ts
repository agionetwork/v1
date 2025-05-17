import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { clusterApiUrl } from "@solana/web3.js"

// Type definitions for wallets
interface WalletConfig {
  name: string
  icon: string
  url: string
  adapterName: string
}

interface SolanaConfig {
  network: WalletAdapterNetwork
  endpoint: string
  autoConnect: boolean
}

// Wallet configurations
export const WALLET_CONFIGS: Record<string, WalletConfig> = {
  // Phantom
  phantom: {
    name: "Phantom",
    icon: "/images/wallets/phantom.svg",
    url: "https://phantom.app/",
    adapterName: "PhantomWalletAdapter"
  },
  
  // Solflare
  solflare: {
    name: "Solflare",
    icon: "/images/wallets/solflare.png",
    url: "https://solflare.com/",
    adapterName: "SolflareWalletAdapter"
  },
  
  // Backpack
  backpack: {
    name: "Backpack",
    icon: "/images/wallets/backpack.png",
    url: "https://www.backpack.app/",
    adapterName: "BackpackWalletAdapter"
  }
}

// Solana network configuration
export const SOLANA_CONFIG: SolanaConfig = {
  network: WalletAdapterNetwork.Devnet,
  endpoint: clusterApiUrl(WalletAdapterNetwork.Devnet),
  autoConnect: true
}

// Type definitions for Civic providers
interface CivicProviderConfig {
  name: string
  icon: string
}

interface CivicConfig {
  clientId: string
  redirectUri: string
  providers: Record<string, CivicProviderConfig>
}

// Civic Auth Client ID (constant to avoid issues during SSR)
const CIVIC_CLIENT_ID = "65004c36-3e4f-41a1-b0eb-8a9fc72dbf04"

// Civic Auth configuration
export const CIVIC_CONFIG: CivicConfig = {
  clientId: CIVIC_CLIENT_ID,
  redirectUri: "/api/auth/callback",
  providers: {
    google: {
      name: "Google",
      icon: "/images/social/google.png"
    }
  }
} 
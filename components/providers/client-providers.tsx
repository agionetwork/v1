'use client'

import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'

const SolanaWalletProvider = dynamic(
  () => import('@/components/solana/wallet-provider'),
  { ssr: false }
)

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <SolanaWalletProvider>
        {children}
      </SolanaWalletProvider>
    </AnimatePresence>
  )
} 
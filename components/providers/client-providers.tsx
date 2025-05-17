'use client'

<<<<<<< HEAD
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return children
=======
import dynamic from 'next/dynamic'

const SolanaWalletProvider = dynamic(
  () => import('@/components/solana/wallet-provider'),
  { ssr: false }
)

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <SolanaWalletProvider>{children}</SolanaWalletProvider>
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
} 
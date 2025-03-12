import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WalletProviderWrapper } from '@/providers/wallet-provider'
import { Toaster } from '@/components/ui/sonner'
import { Providers } from './providers'

// Importando os estilos do wallet adapter
import '@solana/wallet-adapter-react-ui/styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Agio Network',
  description: 'Decentralized Lending Platform',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background`}>
        <Providers>
          <div className="min-h-screen bg-background transition-all duration-300">
            <WalletProviderWrapper>
              {children}
              <Toaster />
            </WalletProviderWrapper>
          </div>
        </Providers>
      </body>
    </html>
  )
}

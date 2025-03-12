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
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} min-h-screen bg-background dark:bg-black`}>
        <Providers>
          <div className="min-h-screen bg-background dark:bg-black">
            <WalletProviderWrapper>
              <div className="layout-container">
                {children}
              </div>
              <Toaster />
            </WalletProviderWrapper>
          </div>
        </Providers>
      </body>
    </html>
  )
}

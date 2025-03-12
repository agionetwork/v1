"use client"

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"
import { useMemo } from "react"

require("@solana/wallet-adapter-react-ui/styles.css")

export function WalletProviderWrapper({ children }: { children: React.ReactNode }) {
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

  return (
    <ConnectionProvider endpoint={endpoint} config={{ commitment: 'confirmed' }}>
      <WalletProvider 
        wallets={wallets} 
        autoConnect={true}
        onError={(error) => {
          console.error("Erro no provedor da carteira:", error)
        }}
      >
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
} 
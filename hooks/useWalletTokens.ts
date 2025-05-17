"use client"

import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { PublicKey } from "@solana/web3.js"
import { useUser } from "@civic/auth-web3/react"
import { userHasWallet } from "@civic/auth-web3"

export interface TokenBalance {
  symbol: string
  balance: number
  usdValue: number
  percentOfTotal: number
}

export function useWalletTokens() {
  const { publicKey, connected } = useWallet()
  const { connection } = useConnection()
  const userContext = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [tokens, setTokens] = useState<TokenBalance[]>([])
  const [error, setError] = useState<string | null>(null)
  const [civicWalletAddress, setCivicWalletAddress] = useState<string | null>(null)
  const [walletFromLocalStorage, setWalletFromLocalStorage] = useState<string | null>(null)

  // Verificar carteira do Civic e localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedWalletAddress = localStorage.getItem('walletAddress')
      if (storedWalletAddress) {
        setWalletFromLocalStorage(storedWalletAddress)
      }
    }

    if (userContext.user && userHasWallet(userContext)) {
      setCivicWalletAddress(userContext.solana.address)
    } else {
      setCivicWalletAddress(null)
    }
  }, [userContext])

  useEffect(() => {
    async function getTokenBalances() {
      let walletPublicKey: PublicKey | null = null
      
      // Prioridade: 1) publicKey do adaptador, 2) Civic wallet, 3) localStorage
      if (publicKey && connected) {
        walletPublicKey = publicKey
      } else if (civicWalletAddress) {
        try {
          walletPublicKey = new PublicKey(civicWalletAddress)
        } catch (err) {
          console.error("Erro ao converter endereço do Civic Auth:", err)
        }
      } else if (walletFromLocalStorage) {
        try {
          walletPublicKey = new PublicKey(walletFromLocalStorage)
        } catch (err) {
          console.error("Erro ao converter endereço do localStorage:", err)
        }
      }

      if (!walletPublicKey) {
        setTokens([])
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        // Em um ambiente real, você buscaria os tokens da carteira usando a API da Solana
        // Aqui estamos obtendo o saldo de SOL e simulando outros tokens
        
        // Obter o saldo de SOL
        const solBalance = await connection.getBalance(walletPublicKey)
        const solBalanceInSol = solBalance / 1000000000 // Converter de lamports para SOL
        
        // Calcular valores em USD (simulado)
        const solPrice = 100 // Preço simulado de SOL em USD
        const solUsdValue = solBalanceInSol * solPrice
        
        // Tokens da carteira (SOL real + outros simulados para demonstração)
        const walletTokens: TokenBalance[] = [
          {
            symbol: "SOL",
            balance: solBalanceInSol,
            usdValue: solUsdValue,
            percentOfTotal: 65
          },
          {
            symbol: "USDC",
            balance: solBalanceInSol * 50, // Simulando um valor baseado no saldo de SOL
            usdValue: solBalanceInSol * 50,
            percentOfTotal: 85
          },
          {
            symbol: "BONK",
            balance: solBalanceInSol * 5000000, // Simulando um valor baseado no saldo de SOL
            usdValue: solBalanceInSol * 25,
            percentOfTotal: 45
          }
        ]
        
        setTokens(walletTokens)
      } catch (err) {
        console.error("Erro ao buscar tokens da carteira:", err)
        setError("Falha ao carregar tokens da carteira")
      } finally {
        setIsLoading(false)
      }
    }

    getTokenBalances()
  }, [publicKey, connected, connection, civicWalletAddress, walletFromLocalStorage])

  return { tokens, isLoading, error }
} 
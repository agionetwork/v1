"use client"

import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { PublicKey } from "@solana/web3.js"

export interface TokenBalance {
  symbol: string
  balance: number
  usdValue: number
  percentOfTotal: number
}

export function useWalletTokens() {
  const { publicKey, connected } = useWallet()
  const { connection } = useConnection()
  const [isLoading, setIsLoading] = useState(false)
  const [tokens, setTokens] = useState<TokenBalance[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getTokenBalances() {
      if (!publicKey || !connected) {
        setTokens([])
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        // Em um ambiente real, você buscaria os tokens da carteira usando a API da Solana
        // Aqui estamos obtendo o saldo de SOL e simulando outros tokens
        
        // Obter o saldo de SOL
        const solBalance = await connection.getBalance(publicKey)
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
  }, [publicKey, connected, connection])

  return { tokens, isLoading, error }
} 
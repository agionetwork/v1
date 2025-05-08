"use client"

import { useUser } from "@civic/auth-web3/react"
import { useEffect, useState } from "react"
import { TokenBalance } from "@/types/loan"

export function useWalletTokens() {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [tokens, setTokens] = useState<TokenBalance[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getTokenBalances() {
      if (!user) {
        setTokens([])
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        // Simulando tokens para demonstração
        const mockTokens: TokenBalance[] = [
          {
            symbol: "SOL",
            balance: 10,
            usdValue: 1000,
            percentOfTotal: 65
          },
          {
            symbol: "USDC",
            balance: 500,
            usdValue: 500,
            percentOfTotal: 85
          },
          {
            symbol: "BONK",
            balance: 50000000,
            usdValue: 250,
            percentOfTotal: 45
          }
        ]
        
        setTokens(mockTokens)
      } catch (err) {
        console.error("Erro ao buscar tokens da carteira:", err)
        setError("Falha ao carregar tokens da carteira")
      }
      setIsLoading(false)
    }

    getTokenBalances()
  }, [user])

  return { tokens, isLoading, error }
} 
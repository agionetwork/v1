"use client"

import { useEffect, useState } from "react"

export interface TokenPrice {
  symbol: string
  price: number
  change24h: number
}

const TOKEN_IDS = {
  SOL: "solana",
  USDC: "usd-coin",
  USDT: "tether",
  mSOL: "msol",
  BONK: "bonk",
  JUP: "jupiter",
}

export function useTokenPrices() {
  const [prices, setPrices] = useState<Record<string, TokenPrice>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPrices() {
      setIsLoading(true)
      setError(null)

      try {
        // Usar CoinGecko API para buscar preços reais
        const tokenIds = Object.values(TOKEN_IDS).join(",")
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${tokenIds}&vs_currencies=usd&include_24hr_change=true`
        )

        if (!response.ok) {
          throw new Error("Falha ao buscar preços dos tokens")
        }

        const data = await response.json()
        
        const tokenPrices: Record<string, TokenPrice> = {}
        
        Object.entries(TOKEN_IDS).forEach(([symbol, id]) => {
          const tokenData = data[id]
          if (tokenData) {
            tokenPrices[symbol] = {
              symbol,
              price: tokenData.usd || 0,
              change24h: tokenData.usd_24h_change || 0,
            }
          }
        })

        setPrices(tokenPrices)
      } catch (err) {
        console.error("Erro ao buscar preços dos tokens:", err)
        setError("Falha ao carregar preços dos tokens")
        
        // Fallback para preços simulados se a API falhar
        const fallbackPrices: Record<string, TokenPrice> = {
          SOL: { symbol: "SOL", price: 100, change24h: 0 },
          USDC: { symbol: "USDC", price: 1, change24h: 0 },
          USDT: { symbol: "USDT", price: 1, change24h: 0 },
          mSOL: { symbol: "mSOL", price: 100, change24h: 0 },
          BONK: { symbol: "BONK", price: 0.000005, change24h: 0 },
          JUP: { symbol: "JUP", price: 0.5, change24h: 0 },
        }
        setPrices(fallbackPrices)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrices()
  }, [])

  return { prices, isLoading, error }
} 
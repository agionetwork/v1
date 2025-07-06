"use client"

import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { PublicKey } from "@solana/web3.js"
import { useUser } from "@civic/auth-web3/react"
import { userHasWallet } from "@civic/auth-web3"
import { TOKEN_PROGRAM_ID, getAccount } from "@solana/spl-token"
import { useTokenPrices } from "./useTokenPrices"

export interface TokenBalance {
  symbol: string
  balance: number
  usdValue: number
  percentOfTotal: number
  mint?: string
  decimals: number
}

// Endereços dos tokens principais na Solana
const TOKEN_MINTS = {
  USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // Mainnet USDC
  USDT: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", // Mainnet USDT
  mSOL: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So", // Mainnet mSOL
  BONK: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", // Mainnet BONK
  JUP: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN", // Mainnet JUP
}

// Símbolos dos tokens
const TOKEN_SYMBOLS: Record<string, string> = {
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": "USDC",
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB": "USDT",
  "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So": "mSOL",
  "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263": "BONK",
  "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN": "JUP",
}

// Decimais dos tokens
const TOKEN_DECIMALS: Record<string, number> = {
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": 6, // USDC
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB": 6, // USDT
  "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So": 9, // mSOL
  "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263": 5, // BONK
  "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN": 6, // JUP
}

export function useWalletTokens() {
  const { publicKey, connected } = useWallet()
  const { connection } = useConnection()
  const userContext = useUser()
  const { prices } = useTokenPrices()
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
        const walletTokens: TokenBalance[] = []

        // 1. Obter o saldo de SOL
        const solBalance = await connection.getBalance(walletPublicKey)
        const solBalanceInSol = solBalance / 1000000000 // Converter de lamports para SOL
        
        if (solBalanceInSol > 0) {
          const solPrice = prices.SOL?.price || 100 // Fallback para preço simulado
          const solUsdValue = solBalanceInSol * solPrice
          walletTokens.push({
            symbol: "SOL",
            balance: solBalanceInSol,
            usdValue: solUsdValue,
            percentOfTotal: 0, // Será calculado depois
            decimals: 9
          })
        }

        // 2. Obter tokens SPL da carteira
        const tokenAccounts = await connection.getTokenAccountsByOwner(walletPublicKey, {
          programId: TOKEN_PROGRAM_ID,
        })

        for (const tokenAccount of tokenAccounts.value) {
          try {
            const accountInfo = await getAccount(connection, tokenAccount.pubkey)
            const mintAddress = accountInfo.mint.toString()
            const symbol = TOKEN_SYMBOLS[mintAddress]
            const decimals = TOKEN_DECIMALS[mintAddress] || 0
            
            if (symbol && accountInfo.amount > 0) {
              const balance = Number(accountInfo.amount) / Math.pow(10, decimals)
              const price = prices[symbol]?.price || 0
              const usdValue = balance * price
              
              walletTokens.push({
                symbol,
                balance,
                usdValue,
                percentOfTotal: 0, // Será calculado depois
                mint: mintAddress,
                decimals
              })
            }
          } catch (err) {
            console.warn("Erro ao processar token account:", err)
            continue
          }
        }

        // 3. Calcular percentuais do total
        const totalUsdValue = walletTokens.reduce((sum, token) => sum + token.usdValue, 0)
        
        if (totalUsdValue > 0) {
          walletTokens.forEach(token => {
            token.percentOfTotal = (token.usdValue / totalUsdValue) * 100
          })
        }

        // 4. Ordenar por valor USD (maior primeiro)
        walletTokens.sort((a, b) => b.usdValue - a.usdValue)
        
        setTokens(walletTokens)
      } catch (err) {
        console.error("Erro ao buscar tokens da carteira:", err)
        setError("Falha ao carregar tokens da carteira")
      } finally {
        setIsLoading(false)
      }
    }

    getTokenBalances()
  }, [publicKey, connected, connection, civicWalletAddress, walletFromLocalStorage, prices])

  return { tokens, isLoading, error }
} 
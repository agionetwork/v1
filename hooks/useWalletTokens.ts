"use client"

<<<<<<< HEAD
import { useUser } from "@civic/auth-web3/react"
import { useEffect, useState } from "react"
import { TokenBalance } from "@/types/loan"

export function useWalletTokens() {
  const { user } = useUser()
=======
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { TOKEN_LIST } from "@/types/loan"
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
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
  const [isLoading, setIsLoading] = useState(false)
  const [tokens, setTokens] = useState<TokenBalance[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getTokenBalances() {
<<<<<<< HEAD
      if (!user) {
=======
      if (!publicKey || !connected) {
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
        setTokens([])
        return
      }

      setIsLoading(true)
      setError(null)

      try {
<<<<<<< HEAD
        // Simulando tokens para demonstração
        const mockTokens: TokenBalance[] = [
          {
            symbol: "SOL",
            balance: 10,
            usdValue: 1000,
=======
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
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
            percentOfTotal: 65
          },
          {
            symbol: "USDC",
<<<<<<< HEAD
            balance: 500,
            usdValue: 500,
=======
            balance: solBalanceInSol * 50, // Simulando um valor baseado no saldo de SOL
            usdValue: solBalanceInSol * 50,
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
            percentOfTotal: 85
          },
          {
            symbol: "BONK",
<<<<<<< HEAD
            balance: 50000000,
            usdValue: 250,
=======
            balance: solBalanceInSol * 5000000, // Simulando um valor baseado no saldo de SOL
            usdValue: solBalanceInSol * 25,
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
            percentOfTotal: 45
          }
        ]
        
<<<<<<< HEAD
        setTokens(mockTokens)
      } catch (err) {
        console.error("Erro ao buscar tokens da carteira:", err)
        setError("Falha ao carregar tokens da carteira")
      }
      setIsLoading(false)
    }

    getTokenBalances()
  }, [user])
=======
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
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944

  return { tokens, isLoading, error }
} 
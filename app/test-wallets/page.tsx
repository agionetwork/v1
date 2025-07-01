"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestWalletsPage() {
  const [walletInfo, setWalletInfo] = useState<any>({})

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkWallets = () => {
        const info = {
          phantom: {
            exists: !!(window as any).solana,
            isPhantom: !!(window as any).solana?.isPhantom,
            properties: (window as any).solana ? Object.keys((window as any).solana) : []
          },
          solflare: {
            exists: !!(window as any).solflare,
            isSolflare: !!(window as any).solflare?.isSolflare,
            properties: (window as any).solflare ? Object.keys((window as any).solflare) : []
          },
          backpack: {
            exists: !!(window as any).backpack,
            isBackpack: !!(window as any).backpack?.isBackpack,
            isXnft: !!(window as any).backpack?.isXnft,
            properties: (window as any).backpack ? Object.keys((window as any).backpack) : []
          },
          solanaViaSolflare: {
            exists: !!(window as any).solana && !!(window as any).solana.isSolflare,
            isSolflare: !!(window as any).solana?.isSolflare,
          }
        }
        setWalletInfo(info)
      }

      checkWallets()
      
      // Check again after a delay in case wallets load asynchronously
      setTimeout(checkWallets, 1000)
      setTimeout(checkWallets, 3000)
    }
  }, [])

  const testSolflareConnection = async () => {
    try {
      console.log("🔍 Testing Solflare connection...")
      
      const solflare = (window as any).solflare
      const solana = (window as any).solana
      
      console.log("=== SOLFLARE DETECTION REPORT ===")
      console.log("window.solflare exists:", !!solflare)
      console.log("window.solana exists:", !!solana)
      
      if (solflare) {
        console.log("window.solflare properties:", Object.keys(solflare))
        console.log("window.solflare.isSolflare:", solflare.isSolflare)
        console.log("window.solflare.connect type:", typeof solflare.connect)
        console.log("window.solflare.isConnected:", solflare.isConnected)
      }
      
      if (solana) {
        console.log("window.solana properties:", Object.keys(solana))
        console.log("window.solana.isSolflare:", solana.isSolflare)
        console.log("window.solana.isPhantom:", solana.isPhantom)
        console.log("window.solana.connect type:", typeof solana.connect)
      }
      
      let walletProvider = null
      let providerSource = ""
      
      // Detection logic (same as in wallet-connect-modal)
      if (solflare && typeof solflare.connect === 'function') {
        walletProvider = solflare
        providerSource = "window.solflare"
      } else if (solana && solana.isSolflare && typeof solana.connect === 'function') {
        walletProvider = solana
        providerSource = "window.solana (Solflare)"
      } else if (solana && typeof solana.connect === 'function' && !solana.isPhantom) {
        walletProvider = solana
        providerSource = "window.solana (assumed Solflare)"
      }
      
      if (!walletProvider) {
        alert("❌ Solflare wallet not found!")
        return
      }
      
      console.log(`✅ Using provider: ${providerSource}`)
      console.log("🔄 Attempting connection...")
      
      // Test connection with timeout
      const connectPromise = walletProvider.connect()
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Connection timeout after 30s")), 30000)
      )
      
      const resp = await Promise.race([connectPromise, timeoutPromise])
      
      console.log("📋 Raw connection response:", resp)
      console.log("📋 Response type:", typeof resp)
      console.log("📋 Response keys:", resp ? Object.keys(resp) : "none")
      
      if (resp && resp.publicKey) {
        console.log("📋 PublicKey type:", typeof resp.publicKey)
        console.log("📋 PublicKey value:", resp.publicKey)
        console.log("📋 PublicKey keys:", resp.publicKey ? Object.keys(resp.publicKey) : "none")
        
        let publicKeyString = ""
        if (typeof resp.publicKey === 'string') {
          publicKeyString = resp.publicKey
        } else if (resp.publicKey.toString) {
          publicKeyString = resp.publicKey.toString()
        } else if (resp.publicKey.toBase58) {
          publicKeyString = resp.publicKey.toBase58()
        }
        
        alert(`✅ Connected successfully!\nProvider: ${providerSource}\nAddress: ${publicKeyString}`)
      } else {
        console.log("❌ Invalid response structure")
        alert(`❌ Connection failed - invalid response structure\nProvider: ${providerSource}\nResponse: ${JSON.stringify(resp)}`)
      }
    } catch (error) {
      console.error("❌ Connection error:", error)
      alert(`❌ Connection failed: ${error}`)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Wallet Detection Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Phantom</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Exists: {walletInfo.phantom?.exists ? "✅" : "❌"}</p>
            <p>Is Phantom: {walletInfo.phantom?.isPhantom ? "✅" : "❌"}</p>
            <p>Properties: {walletInfo.phantom?.properties?.join(", ") || "None"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Solflare</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Exists: {walletInfo.solflare?.exists ? "✅" : "❌"}</p>
            <p>Is Solflare: {walletInfo.solflare?.isSolflare ? "✅" : "❌"}</p>
            <p>Properties: {walletInfo.solflare?.properties?.join(", ") || "None"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backpack</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Exists: {walletInfo.backpack?.exists ? "✅" : "❌"}</p>
            <p>Is Backpack: {walletInfo.backpack?.isBackpack ? "✅" : "❌"}</p>
            <p>Is Xnft: {walletInfo.backpack?.isXnft ? "✅" : "❌"}</p>
            <p>Properties: {walletInfo.backpack?.properties?.join(", ") || "None"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Solflare via Solana</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Exists: {walletInfo.solanaViaSolflare?.exists ? "✅" : "❌"}</p>
            <p>Is Solflare: {walletInfo.solanaViaSolflare?.isSolflare ? "✅" : "❌"}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Button onClick={testSolflareConnection} className="w-full">
          Test Solflare Connection
        </Button>
        
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline" 
          className="w-full"
        >
          Refresh Page
        </Button>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Raw Wallet Info:</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-xs overflow-auto">
          {JSON.stringify(walletInfo, null, 2)}
        </pre>
      </div>
    </div>
  )
} 
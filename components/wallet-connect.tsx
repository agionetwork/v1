"use client"

<<<<<<< HEAD
import { useUser } from "@civic/auth-web3/react"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Wallet } from "lucide-react"

export function WalletConnect() {
  const { user, signIn, signOut } = useUser()

  return (
    <div>
      {user ? (
        <Button
          variant="outline"
          onClick={() => signOut()}
          className="bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2"
        >
          <Avatar className="h-6 w-6">
            <AvatarImage src={user.profileImage as string} alt={user.name as string || "User"} />
            <AvatarFallback>{(user.name as string)?.slice(0, 2) || "UN"}</AvatarFallback>
          </Avatar>
          Disconnect
        </Button>
      ) : (
        <Button
          onClick={() => signIn()}
          className="bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2"
        >
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      )}
    </div>
=======
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import { Wallet } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface WalletConnectProps {
  className?: string
}

export default function WalletConnect({ className }: WalletConnectProps) {
  const { publicKey, connected, connecting } = useWallet()
  const [mounted, setMounted] = useState(false)

  // Evita problemas de hidratação
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <WalletMultiButton 
      className={cn("bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-4 py-2 flex items-center border-none", className)}
      startIcon={<Wallet className="mr-2 h-4 w-4 text-white md:mr-2" />}
    >
      {connecting 
        ? "Connecting..." 
        : connected && publicKey 
          ? publicKey.toString().slice(0, 4) + "..." + publicKey.toString().slice(-4) 
          : (
            <>
              <span className="hidden md:inline">CONNECT WALLET</span>
              <span className="md:hidden sr-only">Connect Wallet</span>
            </>
          )
      }
    </WalletMultiButton>
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
  )
}


"use client"

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
  )
}


"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export function ReferralProgram() {
  const [referralCode, setReferralCode] = React.useState(
    "AGIO-" + Math.random().toString(36).substring(7).toUpperCase(),
  )

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
    toast({
      title: "Referral Code Copied",
      description: "Your referral code has been copied to the clipboard.",
    })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Referral Program</h2>
      <p className="text-muted-foreground">Invite friends and earn rewards when they join AGIO NETWORK.</p>
      <div className="flex items-center space-x-2">
        <Input value={referralCode} readOnly />
        <Button onClick={copyReferralCode}>Copy</Button>
      </div>
      <div className="space-y-2">
        <Label>Your Rewards</Label>
        <p className="text-2xl font-bold">5 SOL</p>
        <p className="text-sm text-muted-foreground">Earned from 10 referrals</p>
      </div>
      <Button className="w-full">Share Referral Link</Button>
    </div>
  )
}


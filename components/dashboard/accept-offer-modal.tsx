"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ReputationBadge } from "@/components/ui/badge-reputation"
import { toast } from "sonner"

interface Offer {
  id: number
  borrower: string
  asset: string
  amount: number
  interest: string
  apy: string
  collateral: string
  term: string
  reputation?: number
  verified?: boolean
}

interface AcceptOfferModalProps {
  offer: Offer | null
  isOpen: boolean
  onClose: () => void
}

export function AcceptOfferModal({ offer, isOpen, onClose }: AcceptOfferModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  if (!offer) return null

  const handleAccept = async () => {
    setIsProcessing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success("Offer accepted successfully!", {
        description: `You will lend ${offer.amount.toLocaleString()} ${offer.asset} to ${offer.borrower} for ${offer.term}.`
      })
      onClose()
    } catch (error) {
      toast.error("Error accepting offer", {
        description: "Please try again later."
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDecline = async () => {
    setIsProcessing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Offer declined", {
        description: "The loan offer has been declined."
      })
      onClose()
    } catch (error) {
      toast.error("Error declining offer", {
        description: "Please try again later."
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const calculateEarnings = () => {
    const apy = parseFloat(offer.apy.replace('%', ''))
    const termDays = parseInt(offer.term.split(' ')[0])
    return (offer.amount * apy * termDays) / (365 * 100)
  }

  const expectedEarnings = calculateEarnings()
  const totalReturn = offer.amount + expectedEarnings

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <div className="flex items-center gap-2">
              <img 
                src={`/images/${offer.asset === "USDT" ? "tether-usdt-logo.png" : offer.asset.toLowerCase()}-logo.png`} 
                alt={offer.asset} 
                className="w-6 h-6" 
              />
              Accept Loan Offer
            </div>
          </DialogTitle>
          <DialogDescription className="text-base">
            Review borrower's loan request and confirm your lending decision
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Loan Request Details */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Loan Request Details</span>
                <Badge variant="default" className="bg-blue-500">
                  Pending
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Requested Amount:</span>
                    <span className="font-bold text-lg">
                      {offer.amount.toLocaleString()} {offer.asset}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Interest Rate:</span>
                    <span className="font-semibold text-green-500">
                      {offer.apy}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Term:</span>
                    <span className="font-semibold">{offer.term}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Collateral Offered:</span>
                    <span className="font-semibold">
                      {offer.collateral}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Collateral Value:</span>
                    <span className="font-semibold">
                      {Math.round(offer.amount * parseFloat(offer.collateral) / 100).toLocaleString()} {offer.asset}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Interest Amount:</span>
                    <span className="font-semibold text-green-500">
                      {offer.interest}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Borrower Information */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Borrower Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600">Borrower:</span>
                    <span className="font-mono text-sm">
                      {offer.borrower}
                    </span>
                  </div>
                  {offer.verified && (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Verified
                    </Badge>
                  )}
                </div>
                <ReputationBadge score={offer.reputation || 0} />
              </div>
            </CardContent>
          </Card>

          {/* Lending Calculator */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Lending Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Lend Amount:</span>
                    <span className="font-bold text-lg">
                      {offer.amount.toLocaleString()} {offer.asset}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Expected Interest:</span>
                    <span className="font-semibold text-green-500">
                      {expectedEarnings.toFixed(4)} {offer.asset}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Total Return:</span>
                    <span className="font-bold text-lg text-green-600">
                      {totalReturn.toFixed(4)} {offer.asset}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Collateral Secured:</span>
                    <span className="font-semibold">
                      {Math.round(offer.amount * parseFloat(offer.collateral) / 100).toLocaleString()} {offer.asset}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">APY:</span>
                    <span className="font-semibold text-green-500">
                      {offer.apy}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Term:</span>
                    <span className="font-semibold">{offer.term}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                  <div className="text-sm font-medium text-gray-600">Collateral Ratio</div>
                  <div className="text-lg font-bold text-green-600">{offer.collateral}</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                  <div className="text-sm font-medium text-gray-600">Borrower Reputation</div>
                  <div className="text-lg font-bold text-blue-600">{offer.reputation || 0}/100</div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded-lg">
                  <div className="text-sm font-medium text-gray-600">Risk Level</div>
                  <div className="text-lg font-bold text-yellow-600">Low</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lending Terms */}
          <Card className="border-2 border-blue-200 bg-blue-50 dark:bg-blue-950">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-blue-800 dark:text-blue-200">Lending Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <div>• You will lend {offer.amount.toLocaleString()} {offer.asset} for {offer.term}</div>
              <div>• Borrower will pay {offer.apy} APY interest ({offer.interest})</div>
              <div>• Borrower has provided {offer.collateral} collateral as security</div>
              <div>• Funds will be locked for the duration of the loan term</div>
              <div>• Early repayment may result in partial interest refund</div>
            </CardContent>
          </Card>

          {/* Liquidation Protection */}
          <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-950">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-red-800 dark:text-red-200">Liquidation Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-red-700 dark:text-red-300">
              <div>• If borrower fails to repay, collateral will be liquidated</div>
              <div>• You will receive the full loan amount plus interest</div>
              <div>• Liquidation threshold: {Math.round(parseFloat(offer.collateral) * 0.8)}% of collateral value</div>
              <div>• Automated liquidation process protects your investment</div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex justify-center pt-6">
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={handleDecline}
              disabled={isProcessing}
              className="px-8"
            >
              {isProcessing ? "Processing..." : "Decline"}
            </Button>
            <Button 
              onClick={handleAccept}
              disabled={isProcessing}
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              {isProcessing ? "Processing..." : "Accept Offer"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 
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

interface Loan {
  id: number
  lender?: string
  borrower?: string
  asset: string
  amount: number
  interest: string
  dueDate?: string
  status: string
  collateral: string
  term?: string
  verified?: boolean
  reputation?: number
  apr?: string
  apy?: string
}

interface ManageLoanModalProps {
  loan: Loan | null
  isOpen: boolean
  onClose: () => void
}

export function ManageLoanModal({ loan, isOpen, onClose }: ManageLoanModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  if (!loan) return null

  const handleRepayLoan = async () => {
    setIsProcessing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success("Loan repaid successfully!", {
        description: `You have repaid ${loan.amount} ${loan.asset} plus ${loan.interest} interest.`
      })
      onClose()
    } catch (error) {
      toast.error("Error repaying loan", {
        description: "Please try again later."
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleExtendLoan = async () => {
    setIsProcessing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success("Loan extended successfully!", {
        description: "Your loan term has been extended by 30 days."
      })
      onClose()
    } catch (error) {
      toast.error("Error extending loan", {
        description: "Please try again later."
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCloseModal = async () => {
    setIsProcessing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Loan management cancelled", {
        description: "No changes were made to your loan."
      })
      onClose()
    } catch (error) {
      toast.error("Error closing modal", {
        description: "Please try again later."
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <div className="flex items-center gap-2">
              <img 
                src={`/images/${loan.asset === "USDT" ? "tether-usdt-logo.png" : loan.asset.toLowerCase()}-logo.png`} 
                alt={loan.asset} 
                className="w-6 h-6" 
              />
              Manage Loan #{loan.id}
            </div>
          </DialogTitle>
          <DialogDescription className="text-base">
            Manage your active loan details and perform actions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Loan Status Overview */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Loan Status</span>
                <Badge 
                  variant={loan.status === "Active" ? "default" : "secondary"}
                  className={loan.status === "Active" ? "bg-green-500" : "bg-yellow-500"}
                >
                  {loan.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Principal:</span>
                    <span className="font-bold text-lg">
                      {loan.amount.toLocaleString()} {loan.asset}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Interest Due:</span>
                    <span className="font-semibold text-red-600">
                      {loan.interest}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Rate:</span>
                    <span className="font-semibold text-red-500">
                      {loan.apr || loan.apy || "N/A"}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Collateral:</span>
                    <span className="font-semibold">
                      {loan.collateral}
                    </span>
                  </div>
                  {loan.term && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Term:</span>
                      <span className="font-semibold">{loan.term}</span>
                    </div>
                  )}
                  {loan.dueDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Due Date:</span>
                      <span className="font-semibold text-red-500">{loan.dueDate}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Counterparty Information */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Counterparty Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600">
                      {loan.lender ? "Lender" : "Borrower"}:
                    </span>
                    <span className="font-mono text-sm">
                      {loan.lender || loan.borrower}
                    </span>
                  </div>
                  {loan.verified && (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Verified
                    </Badge>
                  )}
                </div>
                <ReputationBadge score={loan.reputation || 0} />
              </div>
            </CardContent>
          </Card>

          {/* Management Actions */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Available Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Repay Loan</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-300 mb-3">
                    Pay back the principal amount plus accrued interest to close the loan.
                  </p>
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    <div>Total to repay: <span className="font-bold">{loan.amount.toLocaleString()} {loan.asset} + {loan.interest}</span></div>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Extend Loan</h4>
                  <p className="text-sm text-green-600 dark:text-green-300 mb-3">
                    Request an extension of the loan term (additional fees may apply).
                  </p>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    <div>Extension fee: <span className="font-bold">0.5% of principal</span></div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Add Collateral</h4>
                  <p className="text-sm text-yellow-600 dark:text-yellow-300 mb-3">
                    Increase your collateral to improve your loan-to-value ratio.
                  </p>
                  <div className="text-sm text-yellow-700 dark:text-yellow-300">
                    <div>Current LTV: <span className="font-bold">{loan.collateral}</span></div>
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
                  <div className="text-lg font-bold text-green-600">{loan.collateral}</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                  <div className="text-sm font-medium text-gray-600">Reputation</div>
                  <div className="text-lg font-bold text-blue-600">{loan.reputation || 0}/100</div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded-lg">
                  <div className="text-sm font-medium text-gray-600">Risk Level</div>
                  <div className="text-lg font-bold text-yellow-600">Low</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex justify-center pt-6">
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={handleCloseModal}
              disabled={isProcessing}
              className="px-8"
            >
              {isProcessing ? "Processing..." : "Cancel"}
            </Button>
            <Button 
              onClick={handleExtendLoan}
              disabled={isProcessing}
              className="bg-green-600 hover:bg-green-700 text-white px-6"
            >
              {isProcessing ? "Processing..." : "Extend"}
            </Button>
            <Button 
              onClick={handleRepayLoan}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              {isProcessing ? "Processing..." : "Repay Loan"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 
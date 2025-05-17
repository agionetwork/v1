"use client"

import { useState } from "react"
import { toast } from "sonner"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface Loan {
  id: number
  type: string
  amount: number
  token: string
  date: string
  status: string
  counterparty: string
  interest?: string
  collateral?: string
  term?: string
  dueDate?: string
  apr?: string
  description?: string
  transactionHash?: string
}

interface LoanViewModalProps {
  loan: Loan | null
  isOpen: boolean
  onClose: () => void
}

interface RepayModalProps {
  loan: Loan | null
  isOpen: boolean
  onClose: () => void
  onRepay: (amount: number, isFullRepayment: boolean) => void
}

function RepayModal({ loan, isOpen, onClose, onRepay }: RepayModalProps) {
  const [repaymentType, setRepaymentType] = useState("full")
  const [repaymentAmount, setRepaymentAmount] = useState<number | string>(loan?.amount || 0)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleRepay = () => {
    setIsProcessing(true)
    const amount = typeof repaymentAmount === "string" ? parseFloat(repaymentAmount) : repaymentAmount
    onRepay(amount, repaymentType === "full")
  }

  const handleRepaymentTypeChange = (value: string) => {
    setRepaymentType(value)
    if (value === "full" && loan) {
      setRepaymentAmount(loan.amount)
    } else if (loan) {
      setRepaymentAmount("")
    }
  }

  if (!loan) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Repay Loan</DialogTitle>
          <DialogDescription>
            Choose how you would like to repay this loan
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Repayment Type</label>
            <Select value={repaymentType} onValueChange={handleRepaymentTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select repayment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Repayment</SelectItem>
                <SelectItem value="partial">Partial Repayment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {repaymentType === "partial" && (
            <div className="grid gap-2">
              <label className="text-sm font-medium">Repayment Amount ({loan.token})</label>
              <Input
                type="number"
                value={repaymentAmount}
                onChange={(e) => setRepaymentAmount(e.target.value)}
                placeholder="Enter amount"
                min={0}
                max={loan.amount}
                step={0.01}
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium">Loan Details</label>
            <div className="text-sm rounded-md bg-muted p-3">
              <div className="flex justify-between mb-1">
                <span>Total Outstanding:</span>
                <span className="font-medium">{loan.amount} {loan.token}</span>
              </div>
              <div className="flex justify-between">
                <span>Interest Amount:</span>
                <span className="font-medium">{loan.interest}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-center gap-2">
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button
            onClick={handleRepay}
            disabled={isProcessing || (repaymentType === "partial" && (!repaymentAmount || parseFloat(repaymentAmount.toString()) <= 0))}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isProcessing ? "Processing..." : "Confirm Repayment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function LoanViewModal({ loan, isOpen, onClose }: LoanViewModalProps) {
  const [isRepaying, setIsRepaying] = useState(false)
  const [isRepayModalOpen, setIsRepayModalOpen] = useState(false)

  const handleRepayClick = () => {
    setIsRepayModalOpen(true)
  }

  const handleRepay = (amount: number, isFullRepayment: boolean) => {
    setIsRepaying(true)
    
    // Simulação da transação de quitação
    setTimeout(() => {
      toast.success(isFullRepayment ? "Loan fully repaid!" : "Partial payment successful!", {
        description: `Your payment of ${amount} ${loan?.token} has been processed.`,
      })
      setIsRepaying(false)
      setIsRepayModalOpen(false)
      if (isFullRepayment) {
        onClose()
      }
    }, 2000)
  }

  if (!loan) return null

  const isActive = loan.status === "Active" || loan.status === "Pending"
  const statusColor = 
    loan.status === "Completed" ? "bg-green-900 text-green-400" :
    loan.status === "Active" ? "bg-blue-900 text-blue-400" :
    loan.status === "Pending" ? "bg-yellow-600 text-white" :
    "bg-red-900 text-red-400"

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              <span>Loan Details</span>
            </DialogTitle>
            <DialogDescription>
              View complete details of this loan
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Loan ID</p>
              <p className="font-medium">#{loan.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Type</p>
              <Badge variant="outline" className={
                loan.type === "Borrowed" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                "bg-blue-500/10 text-blue-500 border-blue-500/20"
              }>
                {loan.type}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge className={statusColor}>{loan.status}</Badge>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Asset</p>
              <div className="flex items-center gap-2">
                <img 
                  src={`/images/${loan.token.toLowerCase()}-logo.png`} 
                  alt={loan.token} 
                  className="w-5 h-5"
                />
                <p className="font-medium">{loan.token}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Amount</p>
              <p className="font-medium">{loan.amount} {loan.token}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Counterparty</p>
              <p className="font-medium font-mono text-sm">{loan.counterparty}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Date Created</p>
              <p className="font-medium">{loan.date}</p>
            </div>
            {loan.dueDate && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                <p className="font-medium">{loan.dueDate}</p>
              </div>
            )}
            {loan.term && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Term</p>
                <p className="font-medium">{loan.term}</p>
              </div>
            )}

            {loan.collateral && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Collateral</p>
                <p className="font-medium">{loan.collateral}</p>
              </div>
            )}
            {loan.apr && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">APR</p>
                <p className="font-medium text-red-500">{loan.apr}</p>
              </div>
            )}
            {loan.interest && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Interest</p>
                <p className="font-medium text-red-500">{loan.interest}</p>
              </div>
            )}
          </div>

          {loan.description && (
            <>
              <Separator />
              <div className="py-2">
                <p className="text-sm font-medium text-muted-foreground mb-1">Description</p>
                <p className="text-sm">{loan.description}</p>
              </div>
            </>
          )}

          {loan.transactionHash && (
            <div className="py-2">
              <p className="text-sm font-medium text-muted-foreground mb-1">Transaction Hash</p>
              <p className="text-xs font-mono bg-muted p-2 rounded overflow-x-auto break-all">
                {loan.transactionHash}
              </p>
            </div>
          )}

          <DialogFooter className="flex justify-center gap-4 mt-4">
            {isActive ? (
              <>
                <Button 
                  onClick={handleRepayClick} 
                  disabled={isRepaying}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  {isRepaying ? "Processing..." : "Repay Loan"}
                </Button>
                <Button onClick={onClose} variant="outline" className="border border-gray-300 bg-transparent hover:bg-gray-100 px-6">
                  Close
                </Button>
              </>
            ) : (
              <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <RepayModal
        loan={loan}
        isOpen={isRepayModalOpen}
        onClose={() => setIsRepayModalOpen(false)}
        onRepay={handleRepay}
      />
    </>
  )
} 
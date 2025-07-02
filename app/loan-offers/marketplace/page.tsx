"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { SlidersHorizontal, ChevronDown, ArrowRight, X, AlertTriangle, CheckCircle, Clock, DollarSign, Shield, Calendar, User, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

interface LoanOffer {
  id: string
  token: string
  amount: number
  collateral: string
  collateralAmount: number
  apr: number
  term: number
  borrower: string
  status: "active" | "funded" | "completed"
  score: number
  createdAt?: string
  collateralValue?: number
  liquidationThreshold?: number
  borrowerHistory?: {
    totalLoans: number
    completedLoans: number
    defaultedLoans: number
    avgScore: number
  }
}

interface FilterOptions {
  token: string
  collateral: string
  collateralPercentage: [number, number]
  term: [number, number]
}

const mockLendOffers: LoanOffer[] = [
  {
    id: "1",
    token: "USDC",
    amount: 5000,
    collateral: "SOL",
    collateralAmount: 50,
    apr: 12.5,
    term: 30,
    borrower: "8xzt...3yxz",
    status: "active",
    score: 85,
    createdAt: "2024-01-15T10:30:00Z",
    collateralValue: 4500,
    liquidationThreshold: 80,
    borrowerHistory: {
      totalLoans: 12,
      completedLoans: 11,
      defaultedLoans: 0,
      avgScore: 87
    }
  },
  {
    id: "2",
    token: "USDC",
    amount: 10000,
    collateral: "mSOL",
    collateralAmount: 100,
    apr: 15,
    term: 60,
    borrower: "9abc...4def",
    status: "active",
    score: 92,
    createdAt: "2024-01-14T14:20:00Z",
    collateralValue: 9500,
    liquidationThreshold: 75,
    borrowerHistory: {
      totalLoans: 8,
      completedLoans: 8,
      defaultedLoans: 0,
      avgScore: 94
    }
  }
]

const mockBorrowOffers: LoanOffer[] = [
  {
    id: "3",
    token: "USDC",
    amount: 2500,
    collateral: "SOL",
    collateralAmount: 25,
    apr: 10,
    term: 15,
    borrower: "7ghi...5jkl",
    status: "active",
    score: 78,
    createdAt: "2024-01-16T09:15:00Z",
    collateralValue: 2300,
    liquidationThreshold: 85,
    borrowerHistory: {
      totalLoans: 5,
      completedLoans: 4,
      defaultedLoans: 1,
      avgScore: 76
    }
  },
  {
    id: "4",
    token: "USDC",
    amount: 7500,
    collateral: "SOL",
    collateralAmount: 75,
    apr: 11,
    term: 45,
    borrower: "6mno...2pqr",
    status: "active",
    score: 88,
    createdAt: "2024-01-13T16:45:00Z",
    collateralValue: 7200,
    liquidationThreshold: 82,
    borrowerHistory: {
      totalLoans: 15,
      completedLoans: 14,
      defaultedLoans: 0,
      avgScore: 89
    }
  }
]

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("lend")
  const [selectedOffer, setSelectedOffer] = useState<LoanOffer | null>(null)
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false)

  const handleAcceptOffer = (offer: LoanOffer) => {
    setSelectedOffer(offer)
    setIsAcceptModalOpen(true)
  }

  const handleConfirmAccept = () => {
    // Here you would implement the actual loan acceptance logic
    console.log("Accepting offer:", selectedOffer)
    setIsAcceptModalOpen(false)
    setSelectedOffer(null)
    // You could add a toast notification here
  }

  const handleDecline = () => {
    setIsAcceptModalOpen(false)
    setSelectedOffer(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const calculateInterest = (amount: number, apr: number, term: number) => {
    return (amount * (apr / 100) * (term / 365)).toFixed(2)
  }

  const calculateTotalRepayment = (amount: number, apr: number, term: number) => {
    const interest = parseFloat(calculateInterest(amount, apr, term))
    return (amount + interest).toFixed(2)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2 items-center text-center">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl font-bold">Loan Marketplace</h1>
            <Badge variant="secondary">Beta</Badge>
          </div>
          <p className="text-muted-foreground max-w-[600px]">
            Browse and create loan offers. Lend your assets to earn interest or borrow against your collateral.
          </p>
        </div>

        <Tabs defaultValue="lend" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger 
                value="lend"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Lending Opportunities
              </TabsTrigger>
              <TabsTrigger 
                value="borrow"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Borrowing Opportunities
              </TabsTrigger>
            </TabsList>

          <TabsContent value="lend" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockLendOffers.map((offer) => (
                <Card key={offer.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{offer.borrower}</span>
                        <Badge className="bg-blue-100 text-blue-700">Score: {offer.score}/100</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Amount</span>
                        <span className="font-medium">{offer.amount.toLocaleString()} USDC</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Interest Rate</span>
                        <span className="font-medium">{offer.apr}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Duration</span>
                        <span className="font-medium">{offer.term} days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Collateral</span>
                          <span className="font-medium">{offer.collateralAmount} {offer.collateral}</span>
                      </div>
                      <Button 
                        className="w-full"
                        onClick={() => handleAcceptOffer(offer)}
                      >
                        Accept Offer <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="borrow" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockBorrowOffers.map((offer) => (
                <Card key={offer.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{offer.borrower}</span>
                        <Badge className="bg-blue-100 text-blue-700">Score: {offer.score}/100</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Amount</span>
                        <span className="font-medium">{offer.amount.toLocaleString()} USDC</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Interest Rate</span>
                        <span className="font-medium">{offer.apr}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Duration</span>
                        <span className="font-medium">{offer.term} days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Collateral</span>
                          <span className="font-medium">{offer.collateralAmount} {offer.collateral}</span>
                      </div>
                      <Button 
                        className="w-full"
                        onClick={() => handleAcceptOffer(offer)}
                      >
                        Accept Offer <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Accept Offer Modal */}
        <Dialog open={isAcceptModalOpen} onOpenChange={setIsAcceptModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Review Loan Offer
              </DialogTitle>
              <DialogDescription>
                Please review all loan details carefully before accepting this offer.
              </DialogDescription>
            </DialogHeader>

            {selectedOffer && (
              <div className="space-y-6">
                {/* Borrower Information */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Borrower Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div>
                      <span className="text-sm text-muted-foreground">Address</span>
                      <p className="font-medium">{selectedOffer.borrower}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Credit Score</span>
                      <p className="font-medium">{selectedOffer.score}/100</p>
                    </div>
                    {selectedOffer.borrowerHistory && (
                      <>
                        <div>
                          <span className="text-sm text-muted-foreground">Total Loans</span>
                          <p className="font-medium">{selectedOffer.borrowerHistory.totalLoans}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Success Rate</span>
                          <p className="font-medium">
                            {((selectedOffer.borrowerHistory.completedLoans / selectedOffer.borrowerHistory.totalLoans) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Loan Terms */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Loan Terms
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">Loan Amount</span>
                      <p className="text-2xl font-bold">{selectedOffer.amount.toLocaleString()} {selectedOffer.token}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">Interest Rate (APR)</span>
                      <p className="text-2xl font-bold text-green-600">{selectedOffer.apr}%</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">Loan Duration</span>
                      <p className="text-xl font-semibold">{selectedOffer.term} days</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">Interest Earned</span>
                      <p className="text-xl font-semibold text-green-600">
                        {calculateInterest(selectedOffer.amount, selectedOffer.apr, selectedOffer.term)} {selectedOffer.token}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Collateral Information */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Collateral Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">Collateral Type</span>
                      <p className="font-medium">{selectedOffer.collateral}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">Collateral Amount</span>
                      <p className="font-medium">{selectedOffer.collateralAmount} {selectedOffer.collateral}</p>
                    </div>
                    {selectedOffer.collateralValue && (
                      <div className="space-y-2">
                        <span className="text-sm text-muted-foreground">Collateral Value</span>
                        <p className="font-medium">${selectedOffer.collateralValue.toLocaleString()}</p>
                      </div>
                    )}
                    {selectedOffer.liquidationThreshold && (
                      <div className="space-y-2">
                        <span className="text-sm text-muted-foreground">Liquidation Threshold</span>
                        <p className="font-medium">{selectedOffer.liquidationThreshold}%</p>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Repayment Summary */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Repayment Summary
                  </h3>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span>Principal Amount</span>
                      <span className="font-medium">{selectedOffer.amount.toLocaleString()} {selectedOffer.token}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest (Total)</span>
                      <span className="font-medium text-green-600">
                        {calculateInterest(selectedOffer.amount, selectedOffer.apr, selectedOffer.term)} {selectedOffer.token}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Repayment</span>
                      <span className="text-green-600">
                        {calculateTotalRepayment(selectedOffer.amount, selectedOffer.apr, selectedOffer.term)} {selectedOffer.token}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedOffer.createdAt && (
                  <>
                    <Separator />
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Offer created: {formatDate(selectedOffer.createdAt)}
                    </div>
                  </>
                )}
              </div>
            )}

            <DialogFooter className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handleDecline}
                className="flex-1"
              >
                DECLINE
              </Button>
              <Button 
                onClick={handleConfirmAccept}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                ACCEPT
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

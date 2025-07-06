"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Icons } from "@/components/ui/icons"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { ReputationBadge } from "@/components/ui/badge-reputation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

interface LoanOffer {
  id: number
  amount: number
  token: string
  term: number
  apy: number
  interest?: number
  collateralPercentage: number
  collateralToken: string
  lender?: string
  borrower?: string
  reputation: number
  createdAt: string
}

// Dados mockados para exemplo
const mockOffers: LoanOffer[] = [
  {
    id: 1,
    amount: 1000,
    token: "SOL",
    term: 30,
    apy: 5,
    interest: 4.11,
    collateralPercentage: 150,
    collateralToken: "SOL",
    lender: "7VH...5XZ5",
    reputation: 85,
    createdAt: "2024-03-20"
  },
  {
    id: 2,
    amount: 500,
    token: "USDC",
    term: 60,
    apy: 7,
    interest: 5.75,
    collateralPercentage: 200,
    collateralToken: "SOL",
    borrower: "9VH...5XZ5",
    reputation: 92,
    createdAt: "2024-03-19"
  },
  {
    id: 3,
    amount: 2000,
    token: "USDT",
    term: 90,
    apy: 4,
    interest: 19.73,
    collateralPercentage: 180,
    collateralToken: "USDC",
    lender: "5VH...5XZ5",
    reputation: 76,
    createdAt: "2024-03-18"
  }
]

export default function LoanOffers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedToken, setSelectedToken] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedOffer, setSelectedOffer] = useState<LoanOffer | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [acceptedOffers, setAcceptedOffers] = useState<Set<number>>(new Set())

  // Debug: monitorar mudanças no estado do modal
  useEffect(() => {
    console.log("Estado do modal mudou - isModalOpen:", isModalOpen, "selectedOffer:", selectedOffer)
  }, [isModalOpen, selectedOffer])

  const handleAcceptOffer = (offer: LoanOffer) => {
    console.log("handleAcceptOffer chamado com:", offer)
    setSelectedOffer(offer)
    setIsModalOpen(true)
    console.log("Estado atualizado - selectedOffer:", offer, "isModalOpen: true")
  }

  const handleConfirmAccept = () => {
    // Marcar a oferta como aceita
    if (selectedOffer) {
      setAcceptedOffers(prev => new Set([...prev, selectedOffer.id]))
    }
    setIsModalOpen(false)
    setSelectedOffer(null)
  }

  const handleDecline = () => {
    setIsModalOpen(false)
    setSelectedOffer(null)
  }

  const filteredOffers = mockOffers
    .filter(offer => 
      !acceptedOffers.has(offer.id) &&
      (selectedToken === "all" || offer.token === selectedToken) &&
      (searchTerm === "" || 
        offer.lender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.token.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else if (sortBy === "highest-apy") {
        return b.apy - a.apy
      } else if (sortBy === "lowest-apy") {
        return a.apy - b.apy
      }
      return 0
    })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Loan Offers</h1>
        <p className="text-muted-foreground mt-2">Browse and fund available loan requests</p>
      </div>
      
      <div className="flex justify-end items-center mb-8">
        <div className="flex gap-4">
          <Input
            placeholder="Search by token or lender..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Select value={selectedToken} onValueChange={setSelectedToken}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Token" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tokens</SelectItem>
              <SelectItem value="SOL">
                <div className="flex items-center gap-1">
                  <img src="/images/sol-logo.png" alt="SOL" className="w-4 h-4" />
                  SOL
                </div>
              </SelectItem>
              <SelectItem value="USDC">
                <div className="flex items-center gap-1">
                  <img src="/images/usdc-logo.png" alt="USDC" className="w-4 h-4" />
                  USDC
                </div>
              </SelectItem>
              <SelectItem value="USDT">
                <div className="flex items-center gap-1">
                  <img src="/images/tether-usdt-logo.png" alt="USDT" className="w-4 h-4" />
                  USDT
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="highest-apy">Highest APY</SelectItem>
              <SelectItem value="lowest-apy">Lowest APY</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => (
          <Card key={offer.id} className="border-2 border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg rounded-xl">
            <CardHeader className="bg-transparent rounded-t-xl text-center py-1 relative border-b border-gray-200 dark:border-gray-800">
              <CardTitle className="text-lg font-bold text-black dark:text-white">
                LOAN OFFER #{offer.id}
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4 bg-transparent">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <QuestionMarkCircledIcon className="h-4 w-4 text-muted-foreground hover:text-blue-600 transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>The total amount of tokens being offered in this loan.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="font-semibold text-black dark:text-white flex items-center gap-1">
                      {offer.amount.toLocaleString()} 
                      <span className="flex items-center gap-1">
                        <img 
                          src={`/images/${offer.token === "USDT" ? "tether-usdt-logo.png" : offer.token.toLowerCase() + "-logo.png"}`} 
                          alt={offer.token} 
                          className="w-4 h-4" 
                        />
                        {offer.token}
                      </span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Collateral</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <QuestionMarkCircledIcon className="h-4 w-4 text-muted-foreground hover:text-blue-600 transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>The amount and type of collateral required to secure this loan.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="font-semibold text-black dark:text-white">
                      {(offer.amount * (offer.collateralPercentage / 100)).toFixed(2)}{' '} 
                      <span className="inline-flex items-center gap-1">
                        <img 
                          src={`/images/${offer.collateralToken === "USDT" ? "tether-usdt-logo.png" : offer.collateralToken.toLowerCase() + "-logo.png"}`} 
                          alt={offer.collateralToken} 
                          className="w-4 h-4" 
                        />
                        {offer.collateralToken}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {offer.borrower ? "APR" : "APY"}
                      </p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <QuestionMarkCircledIcon className="h-4 w-4 text-muted-foreground hover:text-blue-600 transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>
                              {offer.borrower 
                                ? "Annual Percentage Rate - the interest rate the borrower will pay, calculated on a yearly basis."
                                : "Annual Percentage Yield - the interest rate for this loan, calculated on a yearly basis."}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className={`font-semibold ${offer.borrower ? "text-red-500 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
                      {offer.apy}%
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Interest</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <QuestionMarkCircledIcon className="h-4 w-4 text-muted-foreground hover:text-blue-600 transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>The total interest amount for the loan term.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className={`font-semibold ${offer.borrower ? "text-red-500 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
                      {offer.interest?.toFixed(2)} {offer.token}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {offer.lender ? "Lender" : "Borrower"}
                      </p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <QuestionMarkCircledIcon className="h-4 w-4 text-muted-foreground hover:text-blue-600 transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>{offer.lender ? "The address of the user offering this loan." : "The address of the user requesting this loan."}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="font-semibold text-black dark:text-white truncate cursor-help">
                            {offer.lender || offer.borrower}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">
                            {offer.lender ? 
                              "7VHUFJH2J3Z5XZ5XZ5XZ5XZ5XZ5XZ5XZ5XZ5XZ5XZ5XZ5" : 
                              "9VHUFJH2J3Z5XZ5XZ5XZ5XZ5XZ5XZ5XZ5XZ5XZ5XZ5XZ5"
                            }
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Reputation</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <QuestionMarkCircledIcon className="h-4 w-4 text-muted-foreground hover:text-blue-600 transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Reputation score of the lender or borrower based on past activity.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <ReputationBadge score={offer.reputation} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Term</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <QuestionMarkCircledIcon className="h-4 w-4 text-muted-foreground hover:text-blue-600 transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>The duration of the loan in days. At the end of this period, the loan must be repaid.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="font-semibold text-black dark:text-white">{offer.term} days</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <QuestionMarkCircledIcon className="h-4 w-4 text-muted-foreground hover:text-blue-600 transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>The date when this loan offer was created.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="font-semibold text-black dark:text-white">{offer.createdAt}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="py-2 flex justify-center bg-transparent">
              <Button 
                className="bg-[#1358EC] text-white hover:bg-[#104BCA] w-full"
                onClick={() => handleAcceptOffer(offer)}
              >
                Accept Offer
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredOffers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            {acceptedOffers.size > 0 
              ? "All available offers have been accepted. Check back later for new offers."
              : "No loan offers found matching your criteria."
            }
          </p>
        </div>
      )}

      {/* Modal para detalhes da oferta */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Offer Acceptance</DialogTitle>
            <DialogDescription>
              Review the offer details before accepting
            </DialogDescription>
          </DialogHeader>
          
          {selectedOffer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Loan Amount:</span>
                  <p className="font-medium">{selectedOffer.amount.toLocaleString()} {selectedOffer.token}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Interest Rate:</span>
                  <p className="font-medium">{selectedOffer.apy}% {selectedOffer.borrower ? "APR" : "APY"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <p className="font-medium">{selectedOffer.term} days</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Collateral:</span>
                  <p className="font-medium">{(selectedOffer.amount * (selectedOffer.collateralPercentage / 100)).toFixed(2)} {selectedOffer.collateralToken}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">{selectedOffer.lender ? "Lender" : "Borrower"}:</span>
                  <p className="font-medium">{selectedOffer.lender || selectedOffer.borrower}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Reputation:</span>
                  <p className="font-medium">{selectedOffer.reputation}/100</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Interest:</span>
                  <p className="font-medium">{selectedOffer.interest?.toFixed(2)} {selectedOffer.token}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Total Amount to Pay:</span>
                  <p className="font-medium text-lg">{(selectedOffer.amount + (selectedOffer.interest || 0)).toFixed(2)} {selectedOffer.token}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={handleDecline}>
              Decline
            </Button>
            <Button onClick={handleConfirmAccept}>
              Accept
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 
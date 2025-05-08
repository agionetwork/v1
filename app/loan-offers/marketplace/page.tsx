"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { SlidersHorizontal, ChevronDown, ArrowRight } from "lucide-react"
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
    score: 85
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
    score: 92
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
    score: 78
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
    score: 88
  }
]

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("lend")

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
                      <Button className="w-full">
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
                      <Button className="w-full">
                        Accept Offer <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

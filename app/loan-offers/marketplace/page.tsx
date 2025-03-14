"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { SlidersHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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
    status: "active"
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
    status: "active"
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
    status: "active"
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
    status: "active"
  }
]

export default function LoanOffersPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2 items-center text-center">
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">Loan Offers</h1>
          <p className="text-muted-foreground">
            Browse and fund available loan requests from borrowers
          </p>
        </div>

        <Tabs defaultValue="lend" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList className="bg-transparent border dark:border-white/10">
              <TabsTrigger 
                value="lend" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Lend Offers
              </TabsTrigger>
              <TabsTrigger 
                value="borrow"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Borrow Offers
              </TabsTrigger>
            </TabsList>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <TabsContent value="lend" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockLendOffers.map((offer) => (
                <Card key={offer.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src={`/images/${offer.token.toLowerCase()}-logo.png`}
                          alt={offer.token}
                          width={32}
                          height={32}
                        />
                        <div>
                          <CardTitle className="text-lg">{offer.token}</CardTitle>
                          <CardDescription>${offer.amount.toLocaleString()}</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">{offer.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Collateral</span>
                        <div className="flex items-center gap-2">
                          <Image
                            src={`/images/${offer.collateral.toLowerCase()}-logo.png`}
                            alt={offer.collateral}
                            width={20}
                            height={20}
                          />
                          <span>{offer.collateralAmount} {offer.collateral}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">APR</span>
                        <span>{offer.apr}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Term</span>
                        <span>{offer.term} days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Borrower</span>
                        <span>{offer.borrower}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Lend Now
                    </Button>
                  </CardFooter>
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
                        <Image
                          src={`/images/${offer.token.toLowerCase()}-logo.png`}
                          alt={offer.token}
                          width={32}
                          height={32}
                        />
                        <div>
                          <CardTitle className="text-lg">{offer.token}</CardTitle>
                          <CardDescription>${offer.amount.toLocaleString()}</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">{offer.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Collateral</span>
                        <div className="flex items-center gap-2">
                          <Image
                            src={`/images/${offer.collateral.toLowerCase()}-logo.png`}
                            alt={offer.collateral}
                            width={20}
                            height={20}
                          />
                          <span>{offer.collateralAmount} {offer.collateral}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">APR</span>
                        <span>{offer.apr}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Term</span>
                        <span>{offer.term} days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Borrower</span>
                        <span>{offer.borrower}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Borrow Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { SlidersHorizontal, ChevronDown } from "lucide-react"
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

export default function LoanOffersPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    token: "any",
    collateral: "any",
    collateralPercentage: [150, 300],
    term: [0, 365]
  });
  
  const [tempFilters, setTempFilters] = useState<FilterOptions>({
    token: "any",
    collateral: "any",
    collateralPercentage: [150, 300],
    term: [0, 365]
  });
  
  const handleSaveFilters = () => {
    setFilters(tempFilters);
  };
  
  const handleOpenDialog = () => {
    setTempFilters({...filters});
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2 items-center text-center">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight dark:text-white">Loan Offers</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="w-full cursor-pointer">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/borrow-lend" className="w-full cursor-pointer">Borrow / Lend</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/loan-offers/marketplace" className="w-full cursor-pointer">Loan Offers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/socialfi" className="w-full cursor-pointer">SocialFi</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-muted-foreground">
            Browse and fund available loan requests from borrowers
          </p>
        </div>

        <Tabs defaultValue="lend" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="w-full sm:w-auto p-1 bg-muted/50 border dark:border-white/10">
              <TabsTrigger 
                value="lend" 
                className="text-base px-6 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Lend Offers
              </TabsTrigger>
              <TabsTrigger 
                value="borrow"
                className="text-base px-6 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Borrow Offers
              </TabsTrigger>
            </TabsList>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                  onClick={handleOpenDialog}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Filter Loan Offers</DialogTitle>
                  <DialogDescription>
                    Set filters to find the loan offers that match your criteria.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="token" className="text-right">
                      Token
                    </Label>
                    <Select 
                      value={tempFilters.token} 
                      onValueChange={(value) => setTempFilters({...tempFilters, token: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select token" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="USDC">
                          <div className="flex items-center gap-2">
                            <Image src="/images/usdc-logo.png" alt="USDC" width={16} height={16} />
                            <span>USDC</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="SOL">
                          <div className="flex items-center gap-2">
                            <Image src="/images/sol-logo.png" alt="SOL" width={16} height={16} />
                            <span>SOL</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="BONK">
                          <div className="flex items-center gap-2">
                            <Image src="/images/bonk-logo.png" alt="BONK" width={16} height={16} />
                            <span>BONK</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="JUP">
                          <div className="flex items-center gap-2">
                            <Image src="/images/jup-logo.png" alt="JUP" width={16} height={16} />
                            <span>JUP</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="mSOL">
                          <div className="flex items-center gap-2">
                            <Image src="/images/msol-logo.png" alt="mSOL" width={16} height={16} />
                            <span>mSOL</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="collateral" className="text-right">
                      Collateral
                    </Label>
                    <Select 
                      value={tempFilters.collateral} 
                      onValueChange={(value) => setTempFilters({...tempFilters, collateral: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select collateral" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="SOL">
                          <div className="flex items-center gap-2">
                            <Image src="/images/sol-logo.png" alt="SOL" width={16} height={16} />
                            <span>SOL</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="USDC">
                          <div className="flex items-center gap-2">
                            <Image src="/images/usdc-logo.png" alt="USDC" width={16} height={16} />
                            <span>USDC</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="BONK">
                          <div className="flex items-center gap-2">
                            <Image src="/images/bonk-logo.png" alt="BONK" width={16} height={16} />
                            <span>BONK</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="JUP">
                          <div className="flex items-center gap-2">
                            <Image src="/images/jup-logo.png" alt="JUP" width={16} height={16} />
                            <span>JUP</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="mSOL">
                          <div className="flex items-center gap-2">
                            <Image src="/images/msol-logo.png" alt="mSOL" width={16} height={16} />
                            <span>mSOL</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                      Collateral %
                    </Label>
                    <div className="col-span-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">{tempFilters.collateralPercentage[0]}%</span>
                        <span className="text-sm">{tempFilters.collateralPercentage[1]}%</span>
                      </div>
                      <Slider
                        defaultValue={tempFilters.collateralPercentage}
                        min={150}
                        max={300}
                        step={10}
                        onValueChange={(value) => setTempFilters({...tempFilters, collateralPercentage: value as [number, number]})}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                      Term (days)
                    </Label>
                    <div className="col-span-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">{tempFilters.term[0]} days</span>
                        <span className="text-sm">{tempFilters.term[1]} days</span>
                      </div>
                      <Slider
                        defaultValue={tempFilters.term}
                        min={0}
                        max={365}
                        step={1}
                        onValueChange={(value) => setTempFilters({...tempFilters, term: value as [number, number]})}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter className="flex justify-center gap-2">
                  <div className="flex justify-center gap-2 w-full">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={handleSaveFilters}
                      >
                        Save Filters
                      </Button>
                    </DialogClose>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                      <Badge className="bg-blue-100 text-blue-700">Score: {offer.score}/100</Badge>
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
            <div className="flex justify-center mt-6">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                View All Opportunities
              </Button>
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
                      <Badge className="bg-blue-100 text-blue-700">Score: {offer.score}/100</Badge>
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
            <div className="flex justify-center mt-6">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                View All Opportunities
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

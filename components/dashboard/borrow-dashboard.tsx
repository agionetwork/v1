"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoCircledIcon, ArrowUpIcon, ArrowDownIcon, ReloadIcon, LockClosedIcon } from "@radix-ui/react-icons"
import { BiWallet, BiTimer, BiTime, BiTrendingUp, BiPieChart, BiWater, BiTrophy } from "react-icons/bi"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

const getScoreColor = (score: number) => {
  if (score >= 80) return "!bg-green-500"
  if (score >= 50) return "!bg-yellow-500"
  return "!bg-red-500"
}

interface Loan {
  id: number
  lender: string
  asset: string
  amount: number
  interest: string
  dueDate: string
  status: string
  collateral: string
  term?: string
  verified?: boolean
  reputation?: number
  apr?: string
}

interface Opportunity {
  id: number
  lender: string
  asset: string
  available: number
  term: string
  apr: string
  interest: string
  collateral: string
  verified?: boolean
  trend?: {
    value: number
    direction: "up" | "down"
    change?: string
  }
  reputation?: number
}

export default function BorrowDashboard() {
  const [activeTab, setActiveTab] = useState("myloans")
  
  const [activeLoans, setActiveLoans] = useState<Loan[]>([
    {
      id: 1,
      lender: "HN7cABqLq...vGRE1",
      asset: "USDC",
      amount: 5000,
      interest: "260 USDC",
      dueDate: "Apr 15, 2025",
      status: "Active",
      collateral: "150%",
      term: "30 days",
      verified: true,
      reputation: 95
    },
    {
      id: 2,
      lender: "5CZoJzV...Uh8Bw",
      asset: "SOL",
      amount: 25,
      interest: "0.95 SOL",
      dueDate: "May 20, 2025",
      status: "Paid",
      collateral: "200%",
      term: "60 days",
      reputation: 88
    },
    {
      id: 3,
      lender: "9dRKEp7...mFGQs",
      asset: "mSOL",
      amount: 15,
      interest: "0.43 mSOL",
      dueDate: "Jun 10, 2025",
      status: "Paid",
      collateral: "150%",
      term: "90 days",
      verified: true,
      reputation: 75
    }
  ])

  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: 1,
      lender: "HN7cABqLq...vGRE1",
      asset: "USDC",
      available: 10000,
      term: "30 days",
      apr: "5.2%",
      interest: "260 USDC",
      collateral: "None",
      verified: true,
      trend: { value: 0.3, direction: "up" },
      reputation: 95
    },
    {
      id: 2,
      lender: "5CZoJzV...Uh8Bw",
      asset: "SOL",
      available: 50,
      term: "60 days",
      apr: "3.8%",
      interest: "0.95 SOL",
      collateral: "150%",
      trend: { value: 0.1, direction: "down" },
      reputation: 88
    },
    {
      id: 3,
      lender: "9dRKEp7...mFGQs",
      asset: "mSOL",
      available: 30,
      term: "90 days",
      apr: "2.9%",
      interest: "0.43 mSOL",
      collateral: "150%",
      verified: true,
      trend: { value: 0.2, direction: "down" },
      reputation: 75
    },
    {
      id: 4,
      lender: "Bv3iF2T...qP5Ks",
      asset: "JUP",
      available: 2000,
      term: "45 days",
      apr: "6.5%",
      interest: "65 JUP",
      collateral: "200%",
      trend: { value: 0.5, direction: "up" },
      reputation: 82
    }
  ])

  const [myOffers, setMyOffers] = useState<Opportunity[]>([
    {
      id: 5,
      lender: "KL9mNpR...tZxY3",
      asset: "BONK",
      available: 500000,
      term: "15 days",
      apr: "7.5%",
      interest: "1875 BONK",
      collateral: "175%",
      verified: true,
      trend: { value: 0.8, direction: "up" },
      reputation: 91
    },
    {
      id: 6,
      lender: "Qw2ErtY...pL7Mn",
      asset: "USDT",
      available: 7500,
      term: "45 days",
      apr: "4.9%",
      interest: "183.75 USDT",
      collateral: "160%",
      trend: { value: 0.2, direction: "up" },
      reputation: 89
    },
    {
      id: 7,
      lender: "Ax8BnMk...zP3Qr",
      asset: "JUP",
      available: 3,
      term: "60 days",
      apr: "3.2%",
      interest: "0.048 JUP",
      collateral: "140%",
      verified: true,
      trend: { value: 0.1, direction: "down" },
      reputation: 94
    },
    {
      id: 8,
      lender: "Dz9RtKp...xL4Vb",
      asset: "SOL",
      available: 35,
      term: "30 days",
      apr: "4.2%",
      interest: "0.735 SOL",
      collateral: "165%",
      verified: true,
      trend: { value: 0.3, direction: "up" },
      reputation: 93
    },
    {
      id: 9,
      lender: "Gf7HjKl...mN2Xz",
      asset: "USDC",
      available: 15000,
      term: "90 days",
      apr: "5.8%",
      interest: "870 USDC",
      collateral: "155%",
      trend: { value: 0.4, direction: "up" },
      reputation: 87
    },
    {
      id: 10,
      lender: "Jp5TqRs...bC8Vn",
      asset: "BONK",
      available: 750000,
      term: "21 days",
      apr: "8.1%",
      interest: "3543.75 BONK",
      collateral: "180%",
      verified: true,
      trend: { value: 0.7, direction: "up" },
      reputation: 90
    },
    {
      id: 11,
      lender: "Lm3WxYz...kP7Qr",
      asset: "JUP",
      available: 5,
      term: "75 days",
      apr: "3.5%",
      interest: "0.109 JUP",
      collateral: "145%",
      trend: { value: 0.2, direction: "down" },
      reputation: 92
    }
  ])

  const handleBorrow = (opportunity: Opportunity) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: "Processing loan...",
        success: () => {
          const newLoan: Loan = {
            id: activeLoans.length + 1,
            lender: opportunity.lender,
            asset: opportunity.asset,
            amount: opportunity.available,
            interest: opportunity.interest,
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            status: "Active",
            collateral: opportunity.collateral,
            term: opportunity.term,
            verified: opportunity.verified,
            reputation: opportunity.reputation
          }
          setActiveLoans([...activeLoans, newLoan])
          setOpportunities(opportunities.filter(o => o.id !== opportunity.id))
          return "Loan successfully processed!"
        },
        error: "Error processing loan"
      }
    )
  }

  const totalBorrowed = activeLoans.reduce((total, loan) => total + loan.amount, 0)
  const totalInterest = activeLoans.reduce((total, loan) => {
    const interestAmount = parseFloat(loan.interest.split(" ")[0])
    return total + interestAmount
  }, 0)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-center">Total Borrowed</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl font-bold">${totalBorrowed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground text-center">
              Across {activeLoans.length} active loans
            </p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-center">Active Loans</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl font-bold">{activeLoans.length}</div>
            <p className="text-xs text-muted-foreground text-center">
              Current outstanding loans
            </p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-center">Total Interest Paid</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl font-bold">${totalInterest.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground text-center">
              Total interest on loans
            </p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-center">Average APY</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl font-bold">4.8%</div>
            <p className="text-xs text-muted-foreground text-center">
              <span className="text-green-500">Average interest rate</span>
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="myloans" className="space-y-6">
        <TabsList className="inline-flex h-10 w-full max-w-md mx-auto mb-4 bg-muted/50 border dark:border-white/10">
          <TabsTrigger 
            value="myloans" 
            className="inline-flex items-center justify-center text-base px-6 py-2 flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            My Loans
          </TabsTrigger>
          <TabsTrigger 
            value="myoffers" 
            className="inline-flex items-center justify-center text-base px-6 py-2 flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            My Offers
          </TabsTrigger>
          <TabsTrigger 
            value="offers" 
            className="inline-flex items-center justify-center text-base px-6 py-2 flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Offers
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="myloans" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-base font-medium">My Active Loans</CardTitle>
              <CardDescription>
                Your current outstanding loans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-medium text-center">Lender</TableHead>
                      <TableHead className="font-medium text-center">Asset</TableHead>
                      <TableHead className="font-medium text-center">Amount</TableHead>
                      <TableHead className="font-medium text-center">Interest</TableHead>
                      <TableHead className="font-medium text-center">APR</TableHead>
                      <TableHead className="font-medium text-center">Collateral</TableHead>
                      <TableHead className="font-medium text-center">Due Date</TableHead>
                      <TableHead className="font-medium text-center">Reputation</TableHead>
                      <TableHead className="font-medium text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeLoans.map((loan) => (
                      <TableRow key={loan.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            {loan.lender}
                            {loan.verified && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                      Verified
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Verified lender with KYC.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <img 
                              src={`/images/${loan.asset === "USDT" ? "tether-usdt-logo.png" : loan.asset.toLowerCase() + "-logo.png"}`} 
                              alt={loan.asset} 
                              className="w-5 h-5" 
                            />
                            {loan.asset}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">${loan.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-center">{loan.interest}</TableCell>
                        <TableCell className="text-center">{loan.apr || "5.2%"}</TableCell>
                        <TableCell className="text-center">{loan.collateral}</TableCell>
                        <TableCell className="text-center">{loan.dueDate}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={getScoreColor(loan.reputation || 0)}>
                            <span className="text-white">{loan.reputation}/100</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="default" 
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Manage
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <CardFooter className="flex justify-center pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  View All
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="myoffers" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-base font-medium">My Loan Offers</CardTitle>
              <CardDescription>
                Loan offers you've created
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-medium text-center">Lender</TableHead>
                      <TableHead className="font-medium text-center">Asset</TableHead>
                      <TableHead className="font-medium text-center">Amount</TableHead>
                      <TableHead className="font-medium text-center">Interest</TableHead>
                      <TableHead className="font-medium text-center">APR</TableHead>
                      <TableHead className="font-medium text-center">Collateral</TableHead>
                      <TableHead className="font-medium text-center">Term</TableHead>
                      <TableHead className="font-medium text-center">Reputation</TableHead>
                      <TableHead className="font-medium text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myOffers.slice(0, 3).map((offer) => (
                      <TableRow key={offer.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="text-center">You</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <img 
                              src={`/images/${offer.asset === "USDT" ? "tether-usdt-logo.png" : offer.asset.toLowerCase() + "-logo.png"}`} 
                              alt={offer.asset} 
                              className="w-5 h-5" 
                            />
                            {offer.asset}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">${offer.available.toLocaleString()}</TableCell>
                        <TableCell className="text-center">{offer.interest}</TableCell>
                        <TableCell className="text-center">{offer.apr}</TableCell>
                        <TableCell className="text-center">{offer.collateral}</TableCell>
                        <TableCell className="text-center">{offer.term}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={getScoreColor(offer.reputation || 0)}>
                            <span className="text-white">{offer.reputation}/100</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="default" 
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Cancel
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <CardFooter className="flex justify-center gap-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  View All
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="offers" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-base font-medium">Available Loan Offers</CardTitle>
              <CardDescription>
                Browse available loan offers from lenders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-medium text-center">Lender</TableHead>
                      <TableHead className="font-medium text-center">Asset</TableHead>
                      <TableHead className="font-medium text-center">Amount</TableHead>
                      <TableHead className="font-medium text-center">Interest</TableHead>
                      <TableHead className="font-medium text-center">APR</TableHead>
                      <TableHead className="font-medium text-center">Collateral</TableHead>
                      <TableHead className="font-medium text-center">Term</TableHead>
                      <TableHead className="font-medium text-center">Reputation</TableHead>
                      <TableHead className="font-medium text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {opportunities.map((opportunity) => (
                      <TableRow key={opportunity.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            {opportunity.lender}
                            {opportunity.verified && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                      Verified
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Verified Lender</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <img 
                              src={`/images/${opportunity.asset === "USDT" ? "tether-usdt-logo.png" : opportunity.asset.toLowerCase() + "-logo.png"}`} 
                              alt={opportunity.asset} 
                              className="w-5 h-5" 
                            />
                            {opportunity.asset}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">${opportunity.available.toLocaleString()}</TableCell>
                        <TableCell className="text-center">{opportunity.interest}</TableCell>
                        <TableCell className="text-center">{opportunity.apr}</TableCell>
                        <TableCell className="text-center">{opportunity.collateral}</TableCell>
                        <TableCell className="text-center">{opportunity.term}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={getScoreColor(opportunity.reputation || 0)}>
                            <span className="text-white">{opportunity.reputation}/100</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="default" 
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => handleBorrow(opportunity)}
                          >
                            Borrow
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <CardFooter className="flex justify-center pt-4">
                <Link href="/loan-offers/marketplace">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                    View All Opportunities
                  </Button>
                </Link>
              </CardFooter>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


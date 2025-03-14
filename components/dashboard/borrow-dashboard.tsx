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
import { BiWallet, BiTimer, BiTime } from "react-icons/bi"
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
  }
  reputation?: number
}

export default function BorrowDashboard() {
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
        loading: "Processando empréstimo...",
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
          return "Empréstimo realizado com sucesso!"
        },
        error: "Erro ao processar empréstimo"
      }
    )
  }

  const totalBorrowed = activeLoans.reduce((total, loan) => total + loan.amount, 0)
  const totalInterest = activeLoans.reduce((total, loan) => {
    const interestAmount = parseFloat(loan.interest.split(" ")[0])
    return total + interestAmount
  }, 0)

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-blue-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                Total Borrowed
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircledIcon className="h-4 w-4 text-white/70" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Total value of assets you have borrowed</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white flex items-center gap-2">
                ${totalBorrowed.toLocaleString()}
                <span className="text-sm text-green-300 flex items-center">
                  <ArrowUpIcon className="h-4 w-4" />
                  +8.3%
                </span>
              </div>
              <p className="text-xs text-white/70 flex items-center gap-1">
                <BiWallet className="h-3 w-3" />
                Across {activeLoans.length} assets
              </p>
            </CardContent>
          </Card>

          <Card className="bg-blue-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                Interest Due
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircledIcon className="h-4 w-4 text-white/70" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Total interest due on your active loans</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white flex items-center gap-2">
                ${totalInterest.toLocaleString()}
                <span className="text-sm text-red-500 flex items-center">
                  <ArrowDownIcon className="h-4 w-4" />
                  -2.1%
                </span>
              </div>
              <p className="text-xs text-white/70">Next payment: {activeLoans[0]?.dueDate}</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                Average APR
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircledIcon className="h-4 w-4 text-white/70" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Average annual percentage rate across your loans</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white flex items-center gap-2">
                5.2%
                <span className="text-sm text-red-500 flex items-center">
                  -0.3%
                </span>
              </div>
              <p className="text-xs text-white/70">Market avg: 4.8%</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                Active Loans
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircledIcon className="h-4 w-4 text-white/70" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Number of currently active loans</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{activeLoans.length}</div>
              <p className="text-xs text-white/70 flex items-center gap-1">
                <BiTimer className="h-3 w-3" />
                {activeLoans.length} due this month
              </p>
            </CardContent>
          </Card>
        </div>

      <Card>
        <CardHeader>
            <CardTitle className="dark:text-white flex items-center gap-2">
              Borrowing Overview
              <Button variant="outline" size="icon" className="h-6 w-6">
                <ReloadIcon className="h-4 w-4" />
              </Button>
            </CardTitle>
            <CardDescription className="dark:text-gray-400">Manage your active loans and explore new borrowing opportunities.</CardDescription>
        </CardHeader>
          <CardContent>
            <Tabs defaultValue="active-loans">
              <TabsList className="bg-transparent border dark:border-white/10">
                <TabsTrigger 
                  value="active-loans"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  My Loans
                </TabsTrigger>
                <TabsTrigger 
                  value="opportunities"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  My Offers
                </TabsTrigger>
                <TabsTrigger 
                  value="marketplace"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Opportunities
                </TabsTrigger>
              </TabsList>
              <TabsContent value="active-loans" className="mt-4">
                <div className="rounded-lg border bg-card p-2 mb-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BiWallet className="h-4 w-4" />
                      <span>Total Active Loans: ${totalBorrowed.toLocaleString()}</span>
          </div>
                    <div className="flex items-center gap-2">
                      <BiTimer className="h-4 w-4" />
                      <span>Next Payment Due: {activeLoans[0]?.dueDate}</span>
            </div>
            </div>
          </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="dark:text-white text-center">Lender</TableHead>
                      <TableHead className="dark:text-white text-center">Asset</TableHead>
                      <TableHead className="dark:text-white text-center">Amount</TableHead>
                      <TableHead className="dark:text-white text-center">Interest</TableHead>
                      <TableHead className="dark:text-white text-center">APR</TableHead>
                      <TableHead className="dark:text-white text-center">Collateral</TableHead>
                      <TableHead className="dark:text-white text-center">Due Date</TableHead>
                      <TableHead className="dark:text-white text-center">Status</TableHead>
                      <TableHead className="dark:text-white text-center">Reputation</TableHead>
                      <TableHead className="dark:text-white text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeLoans.map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell className="dark:text-white text-center">
                          <div className="flex items-center gap-2 justify-center">
                            {loan.lender}
                            {loan.verified && (
                              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                Verified
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="dark:text-white text-center">
                          <div className="flex items-center gap-2 justify-center">
                            <img src={`/images/${loan.asset.toLowerCase()}-logo.png`} alt={loan.asset} className="w-4 h-4" />
                            {loan.asset}
                          </div>
                        </TableCell>
                        <TableCell className="dark:text-white text-center">{loan.amount}</TableCell>
                        <TableCell className="dark:text-white text-center">
                          <span className="text-red-500">-{loan.interest}</span>
                        </TableCell>
                        <TableCell className="dark:text-white text-center">
                          <span className="text-red-500">5.2%</span>
                        </TableCell>
                        <TableCell className="dark:text-white text-center">{loan.collateral}</TableCell>
                        <TableCell className="dark:text-white text-center">
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="flex items-center gap-1 justify-center">
                                <BiTime className="h-4 w-4 text-blue-500" />
                                {loan.dueDate}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Due in: {formatDistanceToNow(new Date(2025, 3, 15))}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={loan.status === "Active" ? "bg-green-500 text-white hover:bg-green-500" : "bg-blue-500 text-white hover:bg-blue-500"}>
                            {loan.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge className={getScoreColor(loan.reputation || 0)}>{loan.reputation}/100</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Reputation score<br />Based on loan history and collateral</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium"
                          >
                            Pay Loan
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="opportunities" className="mt-4">
                <div className="rounded-lg border bg-card p-2 mb-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BiWallet className="h-4 w-4" />
                      <span>My Pending Offers: {myOffers.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LockClosedIcon className="h-4 w-4" />
                      <span>Total Value: ${myOffers.reduce((total, offer) => total + offer.available, 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-foreground dark:text-white text-center">Lender</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Asset</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Amount</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Interest</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">APR</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Collateral</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Term</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Reputation</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myOffers.map((offer) => (
                      <TableRow key={offer.id}>
                        <TableCell className="text-foreground dark:text-white text-center">
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="flex items-center gap-2 justify-center">
                                {offer.lender}
                                {offer.verified && (
                                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                    Verified
                                  </Badge>
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Verified lender with KYC.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="text-foreground dark:text-white text-center">
                          <div className="flex items-center gap-2 justify-center">
                            <img 
                              src={`/images/${offer.asset === "USDT" ? "tether-usdt-logo.png" : offer.asset.toLowerCase() + "-logo.png"}`} 
                              alt={offer.asset} 
                              className="w-4 h-4" 
                            />
                            {offer.asset}
                          </div>
                        </TableCell>
                        <TableCell className="text-foreground dark:text-white font-medium text-center">{offer.available}</TableCell>
                        <TableCell className="text-foreground dark:text-white text-center">
                          <span className="text-red-500">-{offer.interest}</span>
                        </TableCell>
                        <TableCell className="text-foreground dark:text-white text-center">
                          <span className="text-red-500">{offer.apr}</span>
                        </TableCell>
                        <TableCell className="text-foreground dark:text-white text-center">{offer.collateral}</TableCell>
                        <TableCell className="text-foreground dark:text-white text-center">
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="flex items-center gap-1 justify-center">
                                <BiTime className="h-4 w-4 text-blue-500" />
                                {offer.term}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Loan duration: {offer.term}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="text-foreground dark:text-white text-center">
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge className={getScoreColor(offer.reputation || 0)}>{offer.reputation}/100</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Reputation score<br />Based on loan history and collateral</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium"
                            onClick={() => handleBorrow(offer)}
                          >
                            Accept
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="marketplace" className="mt-4">
                <div className="rounded-lg border bg-card p-2 mb-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BiWallet className="h-4 w-4" />
                      <span>Available Credit: $50,000</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LockClosedIcon className="h-4 w-4" />
                      <span>Required Collateral: $15,000</span>
                    </div>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-foreground dark:text-white text-center">Lender</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Asset</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Available</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Interest</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">APR</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Collateral</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Term</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Reputation</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {opportunities.map((opportunity) => (
                      <TableRow key={opportunity.id}>
                        <TableCell className="text-foreground dark:text-white text-center">
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="flex items-center gap-2 justify-center">
                                {opportunity.lender}
                                {opportunity.verified && (
                                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                    Verified
                                  </Badge>
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Verified lender with KYC.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="text-foreground dark:text-white text-center">
                          <div className="flex items-center gap-2 justify-center">
                            <img 
                              src={`/images/${opportunity.asset === "USDT" ? "tether-usdt-logo.png" : opportunity.asset.toLowerCase() + "-logo.png"}`} 
                              alt={opportunity.asset} 
                              className="w-4 h-4" 
                            />
                            {opportunity.asset}
                          </div>
                        </TableCell>
                        <TableCell className="text-foreground dark:text-white text-center">{opportunity.available}</TableCell>
                        <TableCell className="text-foreground dark:text-white text-center">
                          <span className="text-green-500">{opportunity.interest}</span>
                        </TableCell>
                        <TableCell className="text-foreground dark:text-white text-center">
                          <span className="text-green-500 font-medium">{opportunity.apr}</span>
                        </TableCell>
                        <TableCell className="text-foreground dark:text-white text-center">{opportunity.collateral}</TableCell>
                        <TableCell className="text-foreground dark:text-white text-center">
                          <div className="flex items-center gap-1 justify-center">
                            <BiTime className="h-4 w-4 text-blue-500" />
                            <span>{opportunity.term}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge className={getScoreColor(opportunity.reputation || 0)}>{opportunity.reputation}/100</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Reputation score<br />Based on loan history and collateral</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium"
                            onClick={() => handleBorrow(opportunity)}
                          >
                            Borrow Now
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
            <div className="flex justify-center mt-4">
              <Link href="/loan-offers/marketplace?tab=borrow">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-4 text-sm">
                  View All Opportunities
                </Button>
              </Link>
          </div>
        </CardContent>
      </Card>
    </div>
    </TooltipProvider>
  )
}


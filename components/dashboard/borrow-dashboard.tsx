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
import { BiWallet, BiTimer } from "react-icons/bi"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface Loan {
  id: number
  lender: string
  asset: string
  amount: number
  interest: string
  dueDate: string
  status: string
  verified?: boolean
}

interface Opportunity {
  id: number
  lender: string
  asset: string
  available: number
  term: string
  apr: string
  collateral: string
  verified?: boolean
  trend?: {
    value: number
    direction: "up" | "down"
  }
}

export default function BorrowDashboard() {
  const [activeLoans, setActiveLoans] = useState<Loan[]>([
    {
      id: 1,
      lender: "0x8b45...23df",
      asset: "USDC",
      amount: 5000,
      interest: "260 USDC",
      dueDate: "Apr 15, 2025",
      status: "Active",
      verified: true
    },
    {
      id: 2,
      lender: "0x2f67...89ab",
      asset: "SOL",
      amount: 25,
      interest: "0.95 SOL",
      dueDate: "May 20, 2025",
      status: "Active"
    },
    {
      id: 3,
      lender: "0x4a12...56ef",
      asset: "mSOL",
      amount: 15,
      interest: "0.43 mSOL",
      dueDate: "Jun 10, 2025",
      status: "Active",
      verified: true
    }
  ])

  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: 1,
      lender: "0x7a23...45df",
      asset: "USDC",
      available: 10000,
      term: "30 days",
      apr: "5.2%",
      collateral: "None",
      verified: true,
      trend: { value: 0.3, direction: "up" }
    },
    {
      id: 2,
      lender: "0x3f12...87ab",
      asset: "SOL",
      available: 50,
      term: "60 days",
      apr: "3.8%",
      collateral: "150%",
      trend: { value: 0.1, direction: "down" }
    },
    {
      id: 3,
      lender: "0x9d45...12ef",
      asset: "mSOL",
      available: 30,
      term: "90 days",
      apr: "2.9%",
      collateral: "150%",
      verified: true,
      trend: { value: 0.2, direction: "down" }
    },
    {
      id: 4,
      lender: "0x2b67...34cd",
      asset: "RAY",
      available: 2000,
      term: "45 days",
      apr: "6.5%",
      collateral: "200%",
      trend: { value: 0.5, direction: "up" }
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
            interest: `${(opportunity.available * parseFloat(opportunity.apr) / 100).toFixed(2)} ${opportunity.asset}`,
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            status: "Active",
            verified: opportunity.verified
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-white flex items-center gap-2">
                Total Borrowed
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircledIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Total value of assets you have borrowed</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-white flex items-center gap-2">
                ${totalBorrowed.toLocaleString()}
                <span className="text-sm text-green-500 flex items-center">
                  <ArrowUpIcon className="h-4 w-4" />
                  +8.3%
                </span>
              </div>
              <p className="text-xs text-muted-foreground dark:text-gray-400 flex items-center gap-1">
                <BiWallet className="h-3 w-3" />
                Across {activeLoans.length} assets
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-white flex items-center gap-2">
                Interest Due
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircledIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Total interest due on your active loans</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-white flex items-center gap-2">
                ${totalInterest.toLocaleString()}
                <span className="text-sm text-red-500 flex items-center">
                  <ArrowDownIcon className="h-4 w-4" />
                  -2.1%
                </span>
              </div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">Next payment: {activeLoans[0]?.dueDate}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-white flex items-center gap-2">
                Average APR
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircledIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Average annual percentage rate across your loans</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-white flex items-center gap-2">
                5.2%
                <span className="text-sm text-red-500 flex items-center">
                  <ArrowDownIcon className="h-4 w-4" />
                  -0.3%
                </span>
              </div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">Market avg: 4.8%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-white flex items-center gap-2">
                Active Loans
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircledIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Number of currently active loans</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-white">{activeLoans.length}</div>
              <p className="text-xs text-muted-foreground dark:text-gray-400 flex items-center gap-1">
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
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="active-loans">Active Loans</TabsTrigger>
                <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
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
                      <TableHead className="dark:text-white">Lender</TableHead>
                      <TableHead className="dark:text-white">Asset</TableHead>
                      <TableHead className="dark:text-white">Amount</TableHead>
                      <TableHead className="dark:text-white">Interest</TableHead>
                      <TableHead className="dark:text-white">Due Date</TableHead>
                      <TableHead className="dark:text-white">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeLoans.map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell className="dark:text-white">
                          <div className="flex items-center gap-2">
                            {loan.lender}
                            {loan.verified && (
                              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                Verified
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="dark:text-white">
                          <div className="flex items-center gap-2">
                            <img src={`/${loan.asset.toLowerCase()}-logo.png`} alt={loan.asset} className="w-4 h-4" />
                            {loan.asset}
                          </div>
                        </TableCell>
                        <TableCell className="dark:text-white">{loan.amount}</TableCell>
                        <TableCell className="dark:text-white">
                          <span className="text-green-500">{loan.interest}</span>
                        </TableCell>
                        <TableCell className="dark:text-white">
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="flex items-center gap-1">
                                <BiTimer className="h-4 w-4" />
                                {loan.dueDate}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Due in: {formatDistanceToNow(new Date(2025, 3, 15))}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-blue-500 text-white hover:bg-blue-500">{loan.status}</Badge>
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
                      <TableHead className="text-foreground dark:text-white">Lender</TableHead>
                      <TableHead className="text-foreground dark:text-white">Asset</TableHead>
                      <TableHead className="text-foreground dark:text-white">Available</TableHead>
                      <TableHead className="text-foreground dark:text-white">Term</TableHead>
                      <TableHead className="text-foreground dark:text-white">APR</TableHead>
                      <TableHead className="text-foreground dark:text-white">Collateral</TableHead>
                      <TableHead className="text-foreground dark:text-white">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {opportunities.map((opportunity) => (
                      <TableRow key={opportunity.id}>
                        <TableCell className="text-foreground dark:text-white">
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="flex items-center gap-2">
                                {opportunity.lender}
                                {opportunity.verified && (
                                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                    Verified
                                  </Badge>
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Verified lender with 50+ successful loans</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="text-foreground dark:text-white">
                          <div className="flex items-center gap-2">
                            <img src={`/${opportunity.asset.toLowerCase()}-logo.png`} alt={opportunity.asset} className="w-4 h-4" />
                            {opportunity.asset}
                          </div>
                        </TableCell>
                        <TableCell className="text-foreground dark:text-white font-medium">{opportunity.available}</TableCell>
                        <TableCell className="text-foreground dark:text-white">
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="flex items-center gap-1">
                                <BiTimer className="h-4 w-4" />
                                {opportunity.term}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Loan duration: {opportunity.term}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="text-foreground dark:text-white">
                          <div className="flex items-center gap-1">
                            <span className={opportunity.trend?.direction === "up" ? "text-green-500" : "text-red-500"}>
                              {opportunity.apr}
                            </span>
                            {opportunity.trend && (
                              <span className={`text-sm ${opportunity.trend.direction === "up" ? "text-green-500" : "text-red-500"} flex items-center`}>
                                {opportunity.trend.direction === "up" ? (
                                  <ArrowUpIcon className="h-4 w-4" />
                                ) : (
                                  <ArrowDownIcon className="h-4 w-4" />
                                )}
                                {opportunity.trend.value}%
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-foreground dark:text-white">{opportunity.collateral}</TableCell>
                        <TableCell>
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
                <Button className="h-8 px-4 text-sm">
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


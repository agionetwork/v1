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
import { ReputationBadge } from "@/components/ui/badge-reputation"
import { ManageLoanModal } from "./manage-loan-modal"
import { BorrowLoanModal } from "./borrow-loan-modal"

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
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null)
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)
  const [isManageModalOpen, setIsManageModalOpen] = useState(false)
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false)
  
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
      lender: "Gf7HjKl...mN2Xz",
      asset: "USDC",
      available: 15000,
      term: "90 days",
      apr: "5.8%",
      interest: "870 USDC",
      collateral: "155%",
      trend: { value: 0.4, direction: "up" },
      reputation: 87
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
      reputation: 92
    }
  ])

  const handleManageLoan = (loan: Loan) => {
    setSelectedLoan(loan)
    setIsManageModalOpen(true)
  }

  const handleBorrow = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity)
    setIsBorrowModalOpen(true)
  }

  const handleCloseManageModal = () => {
    setIsManageModalOpen(false)
    setSelectedLoan(null)
  }

  const handleCloseBorrowModal = () => {
    setIsBorrowModalOpen(false)
    setSelectedOpportunity(null)
  }

  const totalBorrowed = activeLoans.reduce((total, loan) => total + loan.amount, 0)
  const totalInterest = activeLoans.reduce((total, loan) => {
    const interestAmount = parseFloat(loan.interest.split(" ")[0])
    return total + interestAmount
  }, 0)

  console.log('OPPORTUNITIES:', opportunities)

  // Sanitização para garantir que lender nunca contenha token ou quebras de linha
  const sanitizedOpportunities = opportunities.map(o => ({
    ...o,
    lender: typeof o.lender === 'string' ? o.lender.split('\n')[0].split(' ')[0] : o.lender
  }))

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
        </TabsList>
        
        <TabsContent value="myloans" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-base font-medium">My Active Loans</CardTitle>
              <CardDescription>Your current outstanding loans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-medium text-center">Lender</TableHead>
                      <TableHead className="font-medium text-center">Reputation</TableHead>
                      <TableHead className="font-medium text-center">Asset</TableHead>
                      <TableHead className="font-medium text-center">Amount</TableHead>
                      <TableHead className="font-medium text-center">Collateral</TableHead>
                      <TableHead className="font-medium text-center">APR</TableHead>
                      <TableHead className="font-medium text-center">Interest</TableHead>
                      <TableHead className="font-medium text-center">Due Date</TableHead>
                      <TableHead className="font-medium text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeLoans.map((loan) => (
                      <TableRow key={loan.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="text-center align-middle whitespace-nowrap">
                          <span className="font-mono text-sm">{loan.lender}</span>
                          {loan.verified && (
                            <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-500 border-green-500/20">Verified</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center align-middle whitespace-nowrap">
                          <ReputationBadge score={loan.reputation || 0} />
                        </TableCell>
                        <TableCell className="text-center align-middle whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            <img src={`/images/${loan.asset === "USDT" ? "tether-usdt-logo.png" : loan.asset.toLowerCase() + "-logo.png"}`} alt={loan.asset} className="w-5 h-5" />
                            <span className="font-medium">{loan.asset}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center align-middle font-medium whitespace-nowrap">
                          ${Number(loan.amount).toLocaleString()} {loan.asset}
                        </TableCell>
                        <TableCell className="text-center align-middle font-medium whitespace-nowrap">
                          {/* Cálculo aproximado do valor do colateral baseado na porcentagem */}
                          {Math.round(loan.amount * parseFloat(loan.collateral) / 100).toLocaleString()} {loan.asset}
                        </TableCell>
                        <TableCell className="text-center align-middle font-medium whitespace-nowrap text-red-500">
                          {loan.apr || "-"}
                        </TableCell>
                        <TableCell className="text-center align-middle font-medium whitespace-nowrap text-red-500">
                          {loan.interest}
                        </TableCell>
                        <TableCell className="text-center align-middle font-medium whitespace-nowrap">
                          {loan.dueDate}
                        </TableCell>
                        <TableCell className="text-center align-middle whitespace-nowrap">
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                            onClick={() => handleManageLoan(loan)}
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
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">View All</Button>
              </CardFooter>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="myoffers" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-base font-medium">Available Loan Offers</CardTitle>
              <CardDescription>Loan offers available for borrowing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-medium text-center">Lender</TableHead>
                      <TableHead className="font-medium text-center">Reputation</TableHead>
                      <TableHead className="font-medium text-center">Asset</TableHead>
                      <TableHead className="font-medium text-center">Available</TableHead>
                      <TableHead className="font-medium text-center">Collateral</TableHead>
                      <TableHead className="font-medium text-center">APR</TableHead>
                      <TableHead className="font-medium text-center">Interest</TableHead>
                      <TableHead className="font-medium text-center">Term</TableHead>
                      <TableHead className="font-medium text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sanitizedOpportunities.map((offer) => (
                      <TableRow key={offer.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="text-center align-middle whitespace-nowrap">
                          <span className="font-mono text-sm">{offer.lender}</span>
                          {offer.verified && (
                            <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-500 border-green-500/20">Verified</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center align-middle whitespace-nowrap">
                          <ReputationBadge score={offer.reputation || 0} />
                        </TableCell>
                        <TableCell className="text-center align-middle whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            <img src={`/images/${offer.asset === "USDT" ? "tether-usdt-logo.png" : offer.asset.toLowerCase() + "-logo.png"}`} alt={offer.asset} className="w-5 h-5" />
                            <span className="font-medium">{offer.asset}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center align-middle font-medium whitespace-nowrap">
                          ${Number(offer.available).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-center align-middle font-medium whitespace-nowrap">
                          {/* Cálculo aproximado do valor do colateral baseado na porcentagem */}
                          {Math.round(offer.available * parseFloat(offer.collateral) / 100).toLocaleString()} {offer.asset}
                        </TableCell>
                        <TableCell className="text-center align-middle font-medium whitespace-nowrap text-red-500">
                          {offer.apr}
                          {offer.trend && (
                            <span className="ml-1">
                              {offer.trend.direction === "up" ? (
                                <ArrowUpIcon className="inline h-4 w-4 text-green-500" />
                              ) : (
                                <ArrowDownIcon className="inline h-4 w-4 text-red-500" />
                              )}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-center align-middle font-medium whitespace-nowrap text-red-500">
                          {offer.interest}
                        </TableCell>
                        <TableCell className="text-center align-middle font-medium whitespace-nowrap">
                          {offer.term}
                        </TableCell>
                        <TableCell className="text-center align-middle whitespace-nowrap">
                          <Button 
                            variant="default" 
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                            onClick={() => handleBorrow(offer)}
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
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">View All</Button>
              </CardFooter>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modais específicos */}
      <ManageLoanModal
        loan={selectedLoan}
        isOpen={isManageModalOpen}
        onClose={handleCloseManageModal}
      />
      
      <BorrowLoanModal
        opportunity={selectedOpportunity}
        isOpen={isBorrowModalOpen}
        onClose={handleCloseBorrowModal}
      />
    </div>
  )
}


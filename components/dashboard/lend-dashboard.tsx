"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { ReputationBadge } from "@/components/ui/badge-reputation"
import { ManageLoanModal } from "./manage-loan-modal"
import { AcceptOfferModal } from "./accept-offer-modal"

interface Loan {
  id: number
  borrower: string
  asset: string
  amount: number
  interest: string
  apy: string
  collateral: string
  dueDate: string
  status: string
  verified?: boolean
  reputation?: number
}

interface Offer {
  id: number
  borrower: string
  asset: string
  amount: number
  interest: string
  apy: string
  collateral: string
  term: string
  reputation?: number
  verified?: boolean
}

export default function LendDashboard() {
  const [activeTab, setActiveTab] = useState("myloans")
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null)
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [isManageModalOpen, setIsManageModalOpen] = useState(false)
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false)
  
  const handleAcceptOffer = (offer: Offer) => {
    setSelectedOffer(offer)
    setIsAcceptModalOpen(true)
  }
  
  const handleLoanAction = (loan: Loan) => {
    setSelectedLoan(loan)
    setIsManageModalOpen(true)
  }

  const handleCloseManageModal = () => {
    setIsManageModalOpen(false)
    setSelectedLoan(null)
  }

  const handleCloseAcceptModal = () => {
    setIsAcceptModalOpen(false)
    setSelectedOffer(null)
  }
  
  const activeLoans: Loan[] = [
    {
      id: 1,
      borrower: "Rt7PqLm...kN3Zx",
      asset: "BONK",
      amount: 250000,
      interest: "+9375 BONK",
      apy: "7.5%",
      collateral: "175%",
      dueDate: "Jun 15, 2024",
      status: "Active",
      verified: true,
      reputation: 91
    },
    {
      id: 2,
      borrower: "Jk4FgHt...pL2Mn",
      asset: "USDT",
      amount: 3500,
      interest: "+85.75 USDT",
      apy: "4.9%",
      collateral: "160%",
      dueDate: "Jul 30, 2024",
      status: "Active",
      verified: false,
      reputation: 89
    },
    {
      id: 3,
      borrower: "Vb9NmKl...zR5Qw",
      asset: "JUP",
      amount: 1.5,
      interest: "+0.024 JUP",
      apy: "3.2%",
      collateral: "140%",
      dueDate: "Aug 15, 2024",
      status: "Pending",
      verified: true,
      reputation: 94
    }
  ];
  
  const myOffers: Offer[] = [
    {
      id: 1,
      borrower: "Rt7PqLm...kN3Zx",
      asset: "BONK",
      amount: 250000,
      interest: "+9375 BONK",
      apy: "7.5%",
      collateral: "175%",
      term: "15 days",
      reputation: 91,
      verified: true
    },
    {
      id: 2,
      borrower: "Jk4FgHt...pL2Mn",
      asset: "USDT",
      amount: 3500,
      interest: "+85.75 USDT",
      apy: "4.9%",
      collateral: "160%",
      term: "45 days",
      reputation: 89
    },
    {
      id: 3,
      borrower: "Vb9NmKl...zR5Qw",
      asset: "JUP",
      amount: 1.5,
      interest: "+0.024 JUP",
      apy: "3.2%",
      collateral: "140%",
      term: "60 days",
      reputation: 94,
      verified: true
    }
  ];

  // Sanitização para garantir que borrower nunca contenha token ou quebras de linha
  const sanitizedOffers = myOffers.map(o => ({
    ...o,
    borrower: typeof o.borrower === 'string' ? o.borrower.split('\n')[0].split(' ')[0] : o.borrower
  }));

  const sanitizedLoans = activeLoans.map(loan => ({
    ...loan,
    borrower: typeof loan.borrower === 'string' ? loan.borrower.split('\n')[0].split(' ')[0] : loan.borrower
  }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-center">Total Value Locked</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl font-bold">$1,245,789.32</div>
            <p className="text-xs text-muted-foreground text-center">
              <span className="text-green-500 flex items-center justify-center gap-1">
                <ArrowUpIcon className="h-4 w-4" />
                +12.5% <span className="text-black dark:text-white">from last month</span>
              </span>
            </p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-center">Active Loans</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground text-center">
              <span className="text-green-500 flex items-center justify-center gap-1">
                <ArrowUpIcon className="h-4 w-4" />
                +3 <span className="text-black dark:text-white">from last month</span>
              </span>
            </p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-center">Total Interest Earned</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl font-bold">$34,567.89</div>
            <p className="text-xs text-muted-foreground text-center">
              <span className="text-green-500 flex items-center justify-center gap-1">
                <ArrowUpIcon className="h-4 w-4" />
                +8.2% <span className="text-black dark:text-white">from last month</span>
              </span>
            </p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-center">Average APY</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl font-bold">5.8%</div>
            <p className="text-xs text-muted-foreground text-center">
              <span className="text-red-500 flex items-center justify-center gap-1">
                <ArrowDownIcon className="h-4 w-4" />
                -0.3% <span className="text-black dark:text-white">from last month</span>
              </span>
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
              <CardDescription>
                Track your active loans and payment schedules.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-medium text-center">Borrower</TableHead>
                      <TableHead className="font-medium text-center">Reputation</TableHead>
                      <TableHead className="font-medium text-center">Asset</TableHead>
                      <TableHead className="font-medium text-center">Amount</TableHead>
                      <TableHead className="font-medium text-center">Collateral</TableHead>
                      <TableHead className="font-medium text-center">APY</TableHead>
                      <TableHead className="font-medium text-center">Interest</TableHead>
                      <TableHead className="font-medium text-center">Due Date</TableHead>
                      <TableHead className="font-medium text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sanitizedLoans.map((loan) => (
                      <TableRow key={loan.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="text-center align-middle whitespace-nowrap">
                          <span className="font-mono text-sm">{loan.borrower}</span>
                          {loan.verified && (
                            <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-400 border-green-500/20">Verified</Badge>
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
                          {loan.amount.toLocaleString()} {loan.asset}
                        </TableCell>
                        <TableCell className="text-center align-middle font-medium whitespace-nowrap">
                          {/* Cálculo aproximado do valor do colateral baseado na porcentagem */}
                          {Math.round(loan.amount * parseFloat(loan.collateral) / 100).toLocaleString()} {loan.asset}
                        </TableCell>
                        <TableCell className="text-center align-middle font-medium whitespace-nowrap text-green-500">
                          {loan.apy}
                        </TableCell>
                        <TableCell className="text-center align-middle font-medium whitespace-nowrap text-green-500">
                          {loan.interest}
                        </TableCell>
                        <TableCell className="text-center align-middle font-medium whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1">
                            <svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 text-blue-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                              <circle cx='12' cy='12' r='10' strokeWidth='2' />
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6l4 2' />
                            </svg>
                            {loan.dueDate}
                          </div>
                        </TableCell>
                        <TableCell className="text-center align-middle whitespace-nowrap">
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                            onClick={() => handleLoanAction(loan)}
                          >
                            Manage
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-center mt-6">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">View All</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="myoffers" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-base font-medium">My Offers</CardTitle>
              <CardDescription>
                Manage your pending offers and track your lending opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-medium text-center">Borrower</TableHead>
                      <TableHead className="font-medium text-center">Reputation</TableHead>
                      <TableHead className="font-medium text-center">Asset</TableHead>
                      <TableHead className="font-medium text-center">Amount</TableHead>
                      <TableHead className="font-medium text-center">Collateral</TableHead>
                      <TableHead className="font-medium text-center">APY</TableHead>
                      <TableHead className="font-medium text-center">Interest</TableHead>
                      <TableHead className="font-medium text-center">Term</TableHead>
                      <TableHead className="font-medium text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sanitizedOffers.map((offer) => (
                      <TableRow key={offer.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="text-center align-middle whitespace-nowrap">
                          <span className="font-mono text-sm">{offer.borrower}</span>
                          {offer.verified && (
                            <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-400 border-green-500/20">Verified</Badge>
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
                          {offer.amount.toLocaleString()} {offer.asset}
                        </TableCell>
                        <TableCell className="text-center align-middle font-medium whitespace-nowrap">
                          {/* Cálculo aproximado do valor do colateral baseado na porcentagem */}
                          {Math.round(offer.amount * parseFloat(offer.collateral) / 100).toLocaleString()} {offer.asset}
                        </TableCell>
                        <TableCell className="text-center align-middle font-medium whitespace-nowrap text-green-500">
                          {offer.apy}
                        </TableCell>
                        <TableCell className="text-center align-middle font-medium whitespace-nowrap text-green-500">
                          {offer.interest}
                        </TableCell>
                        <TableCell className="text-center align-middle font-medium whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1">
                            <svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 text-blue-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                              <circle cx='12' cy='12' r='10' strokeWidth='2' />
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6l4 2' />
                            </svg>
                            {offer.term}
                          </div>
                        </TableCell>
                        <TableCell className="text-center align-middle whitespace-nowrap">
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                            onClick={() => handleAcceptOffer(offer)}
                          >
                            Accept
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-center mt-6">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">View All</Button>
              </div>
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
      
      <AcceptOfferModal
        offer={selectedOffer}
        isOpen={isAcceptModalOpen}
        onClose={handleCloseAcceptModal}
      />
    </div>
  )
}


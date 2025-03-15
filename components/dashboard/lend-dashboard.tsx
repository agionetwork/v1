import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoCircledIcon, ArrowUpIcon, ArrowDownIcon, ReloadIcon, LockClosedIcon } from "@radix-ui/react-icons"
import { BiWallet, BiTime } from "react-icons/bi"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

const getScoreColor = (score: number) => {
  if (score >= 80) return "!bg-green-500"
  if (score >= 50) return "!bg-yellow-500"
  return "!bg-red-500"
}

export default function LendDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  
  const handleAcceptOffer = (offer: any) => {
    toast.success(`Offer from ${offer.borrower} accepted successfully!`, {
      description: `You will lend ${offer.amount} ${offer.asset} with ${offer.interest} interest.`,
    })
  }
  
  const handleLoanAction = (loan: any) => {
    toast.success(`Action taken on loan for ${loan.borrower}`, {
      description: `You are managing your loan of ${loan.amount} ${loan.asset}.`,
    })
  }
  
  const activeLoans = [
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
  
  const myOffers = [
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

  const opportunities = [
    {
      id: 1,
      borrower: "HN7cABqLq...vGRE1",
      asset: "USDC",
      amount: 5000,
      interest: "+260 USDC",
      apy: "5.2%",
      collateral: "150%",
      term: "90 days",
      reputation: 95,
      verified: true,
      trend: {
        direction: "up",
        change: "+0.3%"
      }
    },
    {
      id: 2,
      borrower: "5CZoJzV...Uh8Bw",
      asset: "SOL",
      amount: 25,
      interest: "+0.95 SOL",
      apy: "3.8%",
      collateral: "150%",
      term: "60 days",
      reputation: 92,
      trend: {
        direction: "down",
        change: "-0.1%"
      }
    },
    {
      id: 3,
      borrower: "Bv3iF2T...qP5Ks",
      asset: "JUP",
      amount: 1000,
      interest: "+65 JUP",
      apy: "6.5%",
      collateral: "150%",
      term: "120 days",
      reputation: 88,
      verified: true
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Value Locked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,245,789.32</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center gap-1">
                <ArrowUpIcon className="h-4 w-4" />
                +12.5% <span className="text-white dark:text-white">from last month</span>
              </span>
            </p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Active Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center gap-1">
                <ArrowUpIcon className="h-4 w-4" />
                +3 <span className="text-white dark:text-white">from last month</span>
              </span>
            </p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Interest Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$34,567.89</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center gap-1">
                <ArrowUpIcon className="h-4 w-4" />
                +8.2% <span className="text-white dark:text-white">from last month</span>
              </span>
            </p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Average APY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center gap-1">
                <ArrowDownIcon className="h-4 w-4" />
                -0.3% <span className="text-white dark:text-white">from last month</span>
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
          <TabsTrigger 
            value="overview" 
            className="inline-flex items-center justify-center text-base px-6 py-2 flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Opportunities
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-base font-medium">Opportunities</CardTitle>
              <CardDescription>
                Browse available borrowing requests from verified users.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-medium text-center">Borrower</TableHead>
                      <TableHead className="font-medium text-center">Asset</TableHead>
                      <TableHead className="font-medium text-center">Amount</TableHead>
                      <TableHead className="font-medium text-center">Interest</TableHead>
                      <TableHead className="font-medium text-center">APY</TableHead>
                      <TableHead className="font-medium text-center">Collateral</TableHead>
                      <TableHead className="font-medium text-center">Term</TableHead>
                      <TableHead className="font-medium text-center">Reputation</TableHead>
                      <TableHead className="font-medium text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {opportunities.map((opportunity) => (
                      <TableRow key={opportunity.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium text-center">
                          <div className="flex items-center justify-center gap-2">
                            {opportunity.borrower}
                            {opportunity.verified && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                      Verified
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>This borrower has completed KYC verification</p>
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
                        <TableCell className="text-center font-medium">{opportunity.amount.toLocaleString()} {opportunity.asset}</TableCell>
                        <TableCell className="text-center font-medium text-green-500">{opportunity.interest}</TableCell>
                        <TableCell className="text-center font-medium">
                          <div className="flex items-center justify-center gap-1">
                            {opportunity.apy}
                            {opportunity.trend && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    {opportunity.trend.direction === "up" ? (
                                      <ArrowUpIcon className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <ArrowDownIcon className="h-4 w-4 text-red-500" />
                                    )}
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{opportunity.trend.change} from last week</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-medium">{opportunity.collateral}</TableCell>
                        <TableCell className="text-center font-medium">{opportunity.term}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={`${getScoreColor(opportunity.reputation)} text-white`}>
                            {opportunity.reputation}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Lend Now
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="myloans" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-base font-medium">My Loans</CardTitle>
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
                      <TableHead className="font-medium text-center">Asset</TableHead>
                      <TableHead className="font-medium text-center">Amount</TableHead>
                      <TableHead className="font-medium text-center">Interest</TableHead>
                      <TableHead className="font-medium text-center">APY</TableHead>
                      <TableHead className="font-medium text-center">Collateral</TableHead>
                      <TableHead className="font-medium text-center">Due Date</TableHead>
                      <TableHead className="font-medium text-center">Status</TableHead>
                      <TableHead className="font-medium text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeLoans.map((loan) => (
                      <TableRow key={loan.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium text-center">
                          <div className="flex items-center justify-center gap-2">
                            {loan.borrower}
                            {loan.verified && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                      Verified
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Verified borrower with KYC.</p>
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
                        <TableCell className="text-center font-medium">{loan.amount.toLocaleString()} {loan.asset}</TableCell>
                        <TableCell className="text-center font-medium text-green-500">{loan.interest}</TableCell>
                        <TableCell className="text-center font-medium text-green-500">{loan.apy}</TableCell>
                        <TableCell className="text-center font-medium">{loan.collateral}</TableCell>
                        <TableCell className="text-center font-medium">
                          <div className="flex items-center justify-center gap-1">
                            <BiTime className="h-4 w-4 text-blue-500" />
                            {loan.dueDate}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={loan.status === "Active" ? "bg-green-500" : "bg-yellow-500"}>
                            {loan.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
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
                      <TableHead className="font-medium text-center">Asset</TableHead>
                      <TableHead className="font-medium text-center">Amount</TableHead>
                      <TableHead className="font-medium text-center">Interest</TableHead>
                      <TableHead className="font-medium text-center">APY</TableHead>
                      <TableHead className="font-medium text-center">Collateral</TableHead>
                      <TableHead className="font-medium text-center">Term</TableHead>
                      <TableHead className="font-medium text-center">Reputation</TableHead>
                      <TableHead className="font-medium text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myOffers.map((offer) => (
                      <TableRow key={offer.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium text-center">
                          <div className="flex items-center justify-center gap-2">
                            {offer.borrower}
                            {offer.verified && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                      Verified
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Verified borrower with KYC.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </TableCell>
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
                        <TableCell className="text-center font-medium">{offer.amount.toLocaleString()} {offer.asset}</TableCell>
                        <TableCell className="text-center font-medium text-green-500">{offer.interest}</TableCell>
                        <TableCell className="text-center font-medium text-green-500">{offer.apy}</TableCell>
                        <TableCell className="text-center font-medium">{offer.collateral}</TableCell>
                        <TableCell className="text-center font-medium">
                          <div className="flex items-center justify-center gap-1">
                            <BiTime className="h-4 w-4 text-blue-500" />
                            {offer.term}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={`${getScoreColor(offer.reputation || 0)} text-white`}>
                            {offer.reputation}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


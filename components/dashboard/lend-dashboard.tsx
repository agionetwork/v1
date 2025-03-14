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

const getScoreColor = (score: number) => {
  if (score >= 80) return "!bg-green-500"
  if (score >= 50) return "!bg-yellow-500"
  return "!bg-red-500"
}

export default function LendDashboard() {
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

  return (
    <TooltipProvider>
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-blue-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                Total Supplied
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircledIcon className="h-4 w-4 text-white/70" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Total value of assets you have supplied to the lending pool</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold text-white flex items-center gap-2">
                $12,234.00
                <span className="text-sm text-green-300 flex items-center">
                  <ArrowUpIcon className="h-4 w-4" />
                  +5.2%
                </span>
              </div>
              <p className="text-xs text-white/70 flex items-center gap-1">
                <BiWallet className="h-3 w-3" />
                Across 5 assets
              </p>
          </CardContent>
        </Card>

          <Card className="bg-blue-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                Interest Earned
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircledIcon className="h-4 w-4 text-white/70" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Total interest earned from your lending activities</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold text-white flex items-center gap-2">
                $345.67
                <span className="text-sm text-green-300 flex items-center">
                  <ArrowUpIcon className="h-4 w-4" />
                  +12.3%
                </span>
              </div>
              <p className="text-xs text-white/70">+$42.55 this month</p>
          </CardContent>
        </Card>

          <Card className="bg-blue-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                Average APY
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircledIcon className="h-4 w-4 text-white/70" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Average annual percentage yield across all your loans</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold text-white flex items-center gap-2">
                4.8%
                <span className="text-sm text-green-300 flex items-center">
                  <ArrowUpIcon className="h-4 w-4" />
                  +0.3%
                </span>
              </div>
              <p className="text-xs text-white/70">Market avg: 4.2%</p>
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
                    <p>Number of currently active loans you have issued</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-xs text-white/70 flex items-center gap-1">
                <BiWallet className="h-3 w-3" />
                3 due this week
              </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle className="dark:text-white flex items-center gap-2">
              Lending Overview
              <Button variant="outline" size="icon" className="h-6 w-6">
                <ReloadIcon className="h-4 w-4" />
              </Button>
            </CardTitle>
            <CardDescription className="dark:text-gray-400">Browse available lending opportunities and earn interest on your assets.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="my-loans">
              <TabsList className="bg-transparent border dark:border-white/10">
                <TabsTrigger 
                  value="my-loans"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  My Loans
                </TabsTrigger>
                <TabsTrigger 
                  value="marketplace"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  My Offers
                </TabsTrigger>
                <TabsTrigger 
                  value="opportunities"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Opportunities
                </TabsTrigger>
            </TabsList>
              <TabsContent value="my-loans" className="mt-4">
                <div className="rounded-lg border bg-card p-2 mb-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BiWallet className="h-4 w-4" />
                      <span>Total Active Loans: $32,450</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BiWallet className="h-4 w-4" />
                      <span>Next Payment Due: 3 days</span>
                    </div>
                  </div>
                </div>
              <Table>
                <TableHeader>
                  <TableRow>
                      <TableHead className="text-foreground dark:text-white text-center">Borrower</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Asset</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Amount</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Interest</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">APY</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Collateral</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Due Date</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Status</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Reputation</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center gap-2 justify-center">
                              HN7cABqLq...vGRE1
                              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Verified</Badge>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Verified borrower with KYC.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <div className="flex items-center gap-2 justify-center">
                          <img src="/images/usdc-logo.png" alt="USDC" className="w-4 h-4" />
                          USDC
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">5,000</TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <span className="text-green-500">+260 USDC</span>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <span className="text-green-500 font-medium">5.2%</span>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">150%</TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center gap-1 justify-center">
                              <BiTime className="h-4 w-4 text-blue-500" />
                              <span>90 days</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Due in: {formatDistanceToNow(new Date(2025, 5, 10))}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <Badge className="bg-green-500 text-white hover:bg-green-500">Active</Badge>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge className={getScoreColor(92)}>92/100</Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Excellent reputation score<br />Based on loan history and collateral</p>
                          </TooltipContent>
                        </Tooltip>
                    </TableCell>
                      <TableCell className="text-center">
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white font-medium">
                          Claim Collateral
                        </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell className="text-foreground dark:text-white text-center">5CZoJzV...Uh8Bw</TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <div className="flex items-center gap-2 justify-center">
                          <img src="/images/sol-logo.png" alt="SOL" className="w-4 h-4" />
                          SOL
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">25</TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <span className="text-green-500">+0.95 SOL</span>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <span className="text-green-500 font-medium">3.8%</span>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">150%</TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <div className="flex items-center gap-1 justify-center">
                          <BiTime className="h-4 w-4 text-blue-500" />
                          <span>60 days</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <Badge className="bg-blue-500 text-white hover:bg-blue-500">Completed</Badge>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge className={getScoreColor(92)}>92/100</Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Good reputation score<br />Based on loan history and collateral</p>
                          </TooltipContent>
                        </Tooltip>
                    </TableCell>
                      <TableCell className="text-center">
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white font-medium">
                          Claim Collateral
                        </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell className="text-foreground dark:text-white text-center">9dRKEp7...mFGQs</TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <div className="flex items-center gap-2 justify-center">
                          <img src="/images/msol-logo.png" alt="mSOL" className="w-4 h-4" />
                          mSOL
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">15</TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <span className="text-green-500">+0.43 mSOL</span>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <span className="text-green-500 font-medium">2.9%</span>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">150%</TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <div className="flex items-center gap-1 justify-center">
                          <BiTime className="h-4 w-4 text-blue-500" />
                          <span>120 days</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <Badge className="bg-blue-500 text-white hover:bg-blue-500">Completed</Badge>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge className={getScoreColor(92)}>92/100</Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Good reputation score<br />Based on loan history and collateral</p>
                          </TooltipContent>
                        </Tooltip>
                    </TableCell>
                      <TableCell className="text-center">
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white font-medium">
                          Claim Collateral
                        </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
              <TabsContent value="marketplace" className="mt-4">
                <div className="rounded-lg border bg-card p-2 mb-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BiWallet className="h-4 w-4" />
                      <span>My Pending Offers: {myOffers.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LockClosedIcon className="h-4 w-4" />
                      <span>Total Value: ${myOffers.reduce((total, offer) => total + offer.amount, 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              <Table>
                <TableHeader>
                  <TableRow>
                      <TableHead className="text-foreground dark:text-white text-center">Borrower</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Asset</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Amount</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Interest</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">APY</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Collateral</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Term</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Reputation</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myOffers.map(offer => (
                    <TableRow key={offer.id}>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center gap-2 justify-center">
                              {offer.borrower}
                              {offer.verified && (
                                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Verified</Badge>
                              )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Verified borrower with KYC.</p>
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
                      <TableCell className="text-foreground dark:text-white text-center">{offer.amount}</TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <span className="text-green-500">{offer.interest}</span>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <span className="text-green-500 font-medium">{offer.apy}</span>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">{offer.collateral}</TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <div className="flex items-center gap-1 justify-center">
                          <BiTime className="h-4 w-4 text-blue-500" />
                          <span>{offer.term}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge className={getScoreColor(offer.reputation)}>{offer.reputation}/100</Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{offer.reputation >= 90 ? 'Excellent' : 'Good'} reputation score<br />Based on loan history and collateral</p>
                          </TooltipContent>
                        </Tooltip>
                    </TableCell>
                      <TableCell className="text-center">
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white font-medium">
                          Accept
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
                      <span>Total Available to Lend: $45,890</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LockClosedIcon className="h-4 w-4" />
                      <span>Collateral Locked: $12,450</span>
                    </div>
                  </div>
                </div>
              <Table>
                <TableHeader>
                  <TableRow>
                      <TableHead className="text-foreground dark:text-white text-center">Borrower</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Asset</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Amount</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Interest</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">APY</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Collateral</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Term</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Reputation</TableHead>
                      <TableHead className="text-foreground dark:text-white text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center gap-2 justify-center">
                              HN7cABqLq...vGRE1
                              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Verified</Badge>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Verified borrower with KYC.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <div className="flex items-center gap-2 justify-center">
                          <img src="/images/usdc-logo.png" alt="USDC" className="w-4 h-4" />
                          USDC
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">5,000</TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <span className="text-green-500">+260 USDC</span>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <span className="text-green-500 font-medium">5.2%</span>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">150%</TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <div className="flex items-center gap-1 justify-center">
                          <BiTime className="h-4 w-4 text-blue-500" />
                          <span>90 days</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge className={getScoreColor(95)}>95/100</Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Excellent reputation score<br />Based on loan history and collateral</p>
                          </TooltipContent>
                        </Tooltip>
                    </TableCell>
                      <TableCell className="text-center">
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white font-medium">
                          Lend Now
                        </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell className="text-foreground dark:text-white text-center">5CZoJzV...Uh8Bw</TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <div className="flex items-center gap-2 justify-center">
                          <img src="/images/sol-logo.png" alt="SOL" className="w-4 h-4" />
                          SOL
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">25</TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <span className="text-green-500">+0.95 SOL</span>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <span className="text-green-500 font-medium">3.8%</span>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">150%</TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <div className="flex items-center gap-1 justify-center">
                          <BiTime className="h-4 w-4 text-blue-500" />
                          <span>60 days</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge className={getScoreColor(92)}>92/100</Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Good reputation score<br />Based on loan history and collateral</p>
                          </TooltipContent>
                        </Tooltip>
                    </TableCell>
                      <TableCell className="text-center">
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white font-medium">
                          Lend Now
                        </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell className="text-foreground dark:text-white text-center">Bv3iF2T...qP5Ks</TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <div className="flex items-center gap-2 justify-center">
                          <img src="/images/jup-logo.png" alt="JUP" className="w-4 h-4" />
                          JUP
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">1,000</TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <span className="text-green-500">+65 JUP</span>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <span className="text-green-500 font-medium">6.5%</span>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">150%</TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <div className="flex items-center gap-1 justify-center">
                          <BiTime className="h-4 w-4 text-blue-500" />
                          <span>120 days</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white text-center">
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge className={getScoreColor(92)}>92/100</Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Good reputation score<br />Based on loan history and collateral</p>
                          </TooltipContent>
                        </Tooltip>
                    </TableCell>
                      <TableCell className="text-center">
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white font-medium">
                          Lend Now
                        </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
          <CardFooter className="flex justify-center mt-4">
            <Link href="/loan-offers/marketplace?tab=lend">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-4 text-sm">
                View All Opportunities
              </Button>
            </Link>
        </CardFooter>
      </Card>
    </div>
    </TooltipProvider>
  )
}


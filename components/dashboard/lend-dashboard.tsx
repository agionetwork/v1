import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoCircledIcon, ArrowUpIcon, ArrowDownIcon, ReloadIcon, LockClosedIcon } from "@radix-ui/react-icons"
import { BiWallet, BiTimer } from "react-icons/bi"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

const getScoreColor = (score: number) => {
  if (score >= 80) return "!bg-green-500"
  if (score >= 50) return "!bg-yellow-500"
  return "!bg-red-500"
}

export default function LendDashboard() {
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
                <BiTimer className="h-3 w-3" />
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
                      <BiTimer className="h-4 w-4" />
                      <span>Next Payment Due: 3 days</span>
                    </div>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-foreground dark:text-white">Borrower</TableHead>
                      <TableHead className="text-foreground dark:text-white">Asset</TableHead>
                      <TableHead className="text-foreground dark:text-white">Amount</TableHead>
                      <TableHead className="text-foreground dark:text-white">Interest</TableHead>
                      <TableHead className="text-foreground dark:text-white">Due Date</TableHead>
                      <TableHead className="text-foreground dark:text-white">Status</TableHead>
                      <TableHead className="text-foreground dark:text-white">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-foreground dark:text-white">
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center gap-2">
                              0x7a23...45df
                              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Verified</Badge>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Verified borrower with 50+ successful loans</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white">
                        <div className="flex items-center gap-2">
                          <img src="/usdc-logo.png" alt="USDC" className="w-4 h-4" />
                          USDC
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white">5,000</TableCell>
                      <TableCell className="text-foreground dark:text-white">260 USDC</TableCell>
                      <TableCell className="text-foreground dark:text-white">Apr 15, 2025</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-500 text-white hover:bg-blue-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500 hover:bg-green-600 cursor-pointer">PAY LOAN</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-foreground dark:text-white">0x3f12...87ab</TableCell>
                      <TableCell className="text-foreground dark:text-white">SOL</TableCell>
                      <TableCell className="text-foreground dark:text-white">25</TableCell>
                      <TableCell className="text-foreground dark:text-white">0.95 SOL</TableCell>
                      <TableCell className="text-foreground dark:text-white">May 20, 2025</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-500 text-white hover:bg-blue-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500 hover:bg-green-600 cursor-pointer">PAY LOAN</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-foreground dark:text-white">0x9d45...12ef</TableCell>
                      <TableCell className="text-foreground dark:text-white">mSOL</TableCell>
                      <TableCell className="text-foreground dark:text-white">15</TableCell>
                      <TableCell className="text-foreground dark:text-white">0.43 mSOL</TableCell>
                      <TableCell className="text-foreground dark:text-white">Jun 10, 2025</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-500 text-white hover:bg-blue-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500 hover:bg-green-600 cursor-pointer">PAY LOAN</Badge>
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
                      <TableHead className="text-foreground dark:text-white">Borrower</TableHead>
                      <TableHead className="text-foreground dark:text-white">Asset</TableHead>
                      <TableHead className="text-foreground dark:text-white">Amount</TableHead>
                      <TableHead className="text-foreground dark:text-white">Term</TableHead>
                      <TableHead className="text-foreground dark:text-white">APY</TableHead>
                      <TableHead className="text-foreground dark:text-white">Reputation</TableHead>
                      <TableHead className="text-foreground dark:text-white">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-foreground dark:text-white">
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center gap-2">
                              0x7a23...45df
                              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Verified</Badge>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Verified borrower with 50+ successful loans</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white">
                        <div className="flex items-center gap-2">
                          <img src="/usdc-logo.png" alt="USDC" className="w-4 h-4" />
                          USDC
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white font-medium">5,000</TableCell>
                      <TableCell className="text-foreground dark:text-white">
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center gap-1">
                              <BiTimer className="h-4 w-4" />
                              30 days
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Loan duration: 30 days<br />Due: {formatDistanceToNow(new Date(2025, 3, 15))}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell className="text-foreground dark:text-white">
                        <span className="text-green-500 font-medium">5.2%</span>
                      </TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge className={getScoreColor(95)}>95/100</Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Excellent reputation score<br />Based on loan history and collateral</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white font-medium">
                          Lend Now
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-foreground dark:text-white">0x3f12...87ab</TableCell>
                      <TableCell className="text-foreground dark:text-white">SOL</TableCell>
                      <TableCell className="text-foreground dark:text-white">25</TableCell>
                      <TableCell className="text-foreground dark:text-white">60 days</TableCell>
                      <TableCell className="text-foreground dark:text-white">3.8%</TableCell>
                      <TableCell>
                        <Badge className={getScoreColor(88)}>88/100</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white font-medium">
                          Lend Now
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-foreground dark:text-white">0x9d45...12ef</TableCell>
                      <TableCell className="text-foreground dark:text-white">mSOL</TableCell>
                      <TableCell className="text-foreground dark:text-white">15</TableCell>
                      <TableCell className="text-foreground dark:text-white">90 days</TableCell>
                      <TableCell className="text-foreground dark:text-white">2.9%</TableCell>
                      <TableCell>
                        <Badge className={getScoreColor(75)}>75/100</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white font-medium">
                          Lend Now
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-foreground dark:text-white">0x2b67...34cd</TableCell>
                      <TableCell className="text-foreground dark:text-white">RAY</TableCell>
                      <TableCell className="text-foreground dark:text-white">1,000</TableCell>
                      <TableCell className="text-foreground dark:text-white">45 days</TableCell>
                      <TableCell className="text-foreground dark:text-white">6.5%</TableCell>
                      <TableCell>
                        <Badge className={getScoreColor(92)}>92/100</Badge>
                      </TableCell>
                      <TableCell>
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


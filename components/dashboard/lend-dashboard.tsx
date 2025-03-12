import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LendDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">Total Supplied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">$12,234.00</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">Across 5 assets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">Interest Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">$345.67</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">+$42.55 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">Average APY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">4.8%</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">+0.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">Active Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">12</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">3 due this week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="dark:text-white">Lending Overview</CardTitle>
          <CardDescription className="dark:text-gray-400">Browse available lending opportunities and earn interest on your assets.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="marketplace">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="marketplace">Opportunities</TabsTrigger>
              <TabsTrigger value="my-loans">My Loans</TabsTrigger>
            </TabsList>
            <TabsContent value="marketplace" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="dark:text-white">Borrower</TableHead>
                    <TableHead className="dark:text-white">Asset</TableHead>
                    <TableHead className="dark:text-white">Amount</TableHead>
                    <TableHead className="dark:text-white">Term</TableHead>
                    <TableHead className="dark:text-white">APY</TableHead>
                    <TableHead className="dark:text-white">Reputation</TableHead>
                    <TableHead className="dark:text-white">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="dark:text-white">0x7a23...45df</TableCell>
                    <TableCell className="dark:text-white">USDC</TableCell>
                    <TableCell className="dark:text-white">5,000</TableCell>
                    <TableCell className="dark:text-white">30 days</TableCell>
                    <TableCell className="dark:text-white">5.2%</TableCell>
                    <TableCell>
                      <Badge className="bg-twitter">95/100</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" className="bg-twitter hover:bg-twitter/90">
                        Lend
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="dark:text-white">0x3f12...87ab</TableCell>
                    <TableCell className="dark:text-white">SOL</TableCell>
                    <TableCell className="dark:text-white">25</TableCell>
                    <TableCell className="dark:text-white">60 days</TableCell>
                    <TableCell className="dark:text-white">3.8%</TableCell>
                    <TableCell>
                      <Badge className="bg-twitter">88/100</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" className="bg-twitter hover:bg-twitter/90">
                        Lend
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="dark:text-white">0x9d45...12ef</TableCell>
                    <TableCell className="dark:text-white">mSOL</TableCell>
                    <TableCell className="dark:text-white">15</TableCell>
                    <TableCell className="dark:text-white">90 days</TableCell>
                    <TableCell className="dark:text-white">2.9%</TableCell>
                    <TableCell>
                      <Badge className="bg-linkedin">75/100</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" className="bg-twitter hover:bg-twitter/90">
                        Lend
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="dark:text-white">0x2b67...34cd</TableCell>
                    <TableCell className="dark:text-white">RAY</TableCell>
                    <TableCell className="dark:text-white">1,000</TableCell>
                    <TableCell className="dark:text-white">45 days</TableCell>
                    <TableCell className="dark:text-white">6.5%</TableCell>
                    <TableCell>
                      <Badge className="bg-twitter">92/100</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" className="bg-twitter hover:bg-twitter/90">
                        Lend
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="my-loans" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Borrower</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Interest</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>0x7a23...45df</TableCell>
                    <TableCell>USDC</TableCell>
                    <TableCell>5,000</TableCell>
                    <TableCell>260 USDC</TableCell>
                    <TableCell>Apr 15, 2025</TableCell>
                    <TableCell>
                      <Badge className="bg-twitter">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>0x3f12...87ab</TableCell>
                    <TableCell>SOL</TableCell>
                    <TableCell>25</TableCell>
                    <TableCell>0.95 SOL</TableCell>
                    <TableCell>May 20, 2025</TableCell>
                    <TableCell>
                      <Badge className="bg-twitter">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>0x9d45...12ef</TableCell>
                    <TableCell>mSOL</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>0.43 mSOL</TableCell>
                    <TableCell>Jun 10, 2025</TableCell>
                    <TableCell>
                      <Badge className="bg-twitter">Active</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-twitter hover:bg-twitter/90">View All Opportunities</Button>
        </CardFooter>
      </Card>
    </div>
  )
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function LoansDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white shadow-md rounded-xl overflow-hidden">
          <CardHeader className="bg-agio rounded-t-xl">
            <CardTitle className="text-lg text-white">Total Borrowed</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-foreground dark:text-white">4,550 SOL</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md rounded-xl overflow-hidden">
          <CardHeader className="bg-agio rounded-t-xl">
            <CardTitle className="text-lg text-white">Total Lent</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-foreground dark:text-white">12,234 SOL</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">+10.5% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md rounded-xl overflow-hidden">
          <CardHeader className="bg-agio rounded-t-xl">
            <CardTitle className="text-lg text-white">Active Loans</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-foreground dark:text-white">7</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md rounded-xl overflow-hidden">
          <CardHeader className="bg-agio rounded-t-xl">
            <CardTitle className="text-lg text-white">Reputation Score</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-foreground dark:text-white">92/100</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">+5 from last month</p>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-white shadow-md rounded-xl overflow-hidden">
        <CardHeader className="bg-agio rounded-t-xl">
          <CardTitle className="text-white">Recent Transactions</CardTitle>
          <CardDescription className="text-white opacity-80">
            Your recent lending and borrowing activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="text-foreground dark:text-white">Type</TableHead>
                <TableHead className="text-foreground dark:text-white">Amount</TableHead>
                <TableHead className="text-foreground dark:text-white">APY</TableHead>
                <TableHead className="text-foreground dark:text-white">Fee</TableHead>
                <TableHead className="text-foreground dark:text-white">Term</TableHead>
                <TableHead className="text-foreground dark:text-white">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Badge variant="outline" className="bg-agio-light text-agio-dark">
                    Borrowed
                  </Badge>
                </TableCell>
                <TableCell className="text-foreground dark:text-white">25 SOL</TableCell>
                <TableCell className="text-foreground dark:text-white">3.5%</TableCell>
                <TableCell className="text-foreground dark:text-white">1%</TableCell>
                <TableCell className="text-foreground dark:text-white">30 days</TableCell>
                <TableCell>
                  <Badge className="bg-agio text-white">Active</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge variant="outline" className="bg-agio-light text-agio-dark">
                    Lent
                  </Badge>
                </TableCell>
                <TableCell className="text-foreground dark:text-white">5,000 USDC</TableCell>
                <TableCell className="text-foreground dark:text-white">5.2%</TableCell>
                <TableCell className="text-foreground dark:text-white">1.5%</TableCell>
                <TableCell className="text-foreground dark:text-white">60 days</TableCell>
                <TableCell>
                  <Badge className="bg-agio text-white">Active</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge variant="outline" className="bg-agio-light text-agio-dark">
                    Lent
                  </Badge>
                </TableCell>
                <TableCell className="text-foreground dark:text-white">2,500 USDT</TableCell>
                <TableCell className="text-foreground dark:text-white">4.8%</TableCell>
                <TableCell className="text-foreground dark:text-white">1.2%</TableCell>
                <TableCell className="text-foreground dark:text-white">45 days</TableCell>
                <TableCell>
                  <Badge className="bg-agio text-white">Active</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge variant="outline" className="bg-agio-light text-agio-dark">
                    Borrowed
                  </Badge>
                </TableCell>
                <TableCell className="text-foreground dark:text-white">1,000 RAY</TableCell>
                <TableCell className="text-foreground dark:text-white">3.2%</TableCell>
                <TableCell className="text-foreground dark:text-white">0.8%</TableCell>
                <TableCell className="text-foreground dark:text-white">15 days</TableCell>
                <TableCell>
                  <Badge className="bg-agio-dark text-white">Repaid</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}


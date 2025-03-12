import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import { Search, SlidersHorizontal } from "lucide-react"

export default function MarketplacePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 p-6">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-bold tracking-tight dark:text-white">P2P AGIO MARKETPLACE</h1>
              <p className="text-muted-foreground dark:text-white">Browse and filter available lending and borrowing opportunities.</p>
            </div>

            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="flex w-full items-center space-x-2 md:w-2/3">
                <Input placeholder="Search by asset, amount, or term..." className="w-full dark:text-white" />
                <Button type="submit" size="icon" className="!bg-twitter hover:!bg-twitter/90 text-white">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
              <Button
                className="flex items-center gap-2 !bg-twitter hover:!bg-twitter/90 text-white"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>

            <Tabs defaultValue="borrow">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger 
                  value="borrow" 
                  className="flex-1 data-[state=active]:bg-agio data-[state=active]:text-white dark:text-white"
                >
                  Borrow Requests
                </TabsTrigger>
                <TabsTrigger 
                  value="lend" 
                  className="flex-1 data-[state=active]:bg-agio data-[state=active]:text-white dark:text-white"
                >
                  Lending Offers
                </TabsTrigger>
              </TabsList>
              <TabsContent value="borrow" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <LoanCard
                    asset="SOL"
                    amount="50.0"
                    term="30 days"
                    interest="3.5%"
                    borrower="HN7cABqLq..."
                    reputation={95}
                    collateral="Yes - 150%"
                  />
                  <LoanCard
                    asset="USDC"
                    amount="10,000"
                    term="60 days"
                    interest="5.2%"
                    borrower="5Ueaf7M3P..."
                    reputation={88}
                    collateral="No"
                  />
                  <LoanCard
                    asset="mSOL"
                    amount="25"
                    term="90 days"
                    interest="2.8%"
                    borrower="9xQeWvG4u..."
                    reputation={92}
                    collateral="Yes - 150%"
                  />
                  <LoanCard
                    asset="USDT"
                    amount="7,500"
                    term="45 days"
                    interest="4.8%"
                    borrower="2JCxFk3ze..."
                    reputation={85}
                    collateral="No"
                  />
                  <LoanCard
                    asset="RAY"
                    amount="2,500"
                    term="15 days"
                    interest="6.5%"
                    borrower="8fTAm2fiL..."
                    reputation={78}
                    collateral="Yes - 200%"
                  />
                  <LoanCard
                    asset="SRM"
                    amount="5,000"
                    term="30 days"
                    interest="7.2%"
                    borrower="4dZx7pfRa..."
                    reputation={90}
                    collateral="Yes - 200%"
                  />
                </div>
              </TabsContent>
              <TabsContent value="lend" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <LendingCard
                    asset="SOL"
                    amount="10.0"
                    term="Flexible"
                    interest="3.2%"
                    lender="0x5b32...67cd"
                    reputation={97}
                    requirements="Reputation > 80"
                  />
                  <LendingCard
                    asset="USDC"
                    amount="25,000"
                    term="30-90 days"
                    interest="4.8%"
                    lender="0x1a45...23ef"
                    reputation={94}
                    requirements="Collateral Required"
                  />
                  <LendingCard
                    asset="mSOL"
                    amount="0.5"
                    term="60-120 days"
                    interest="2.5%"
                    lender="0x7c23...89ab"
                    reputation={96}
                    requirements="Reputation > 85"
                  />
                  <LendingCard
                    asset="USDT"
                    amount="15,000"
                    term="Flexible"
                    interest="4.5%"
                    lender="0x3d56...12cd"
                    reputation={91}
                    requirements="None"
                  />
                  <LendingCard
                    asset="SOL"
                    amount="3.0"
                    term="30-60 days"
                    interest="3.0%"
                    lender="0x9f34...45gh"
                    reputation={89}
                    requirements="Collateral Required"
                  />
                  <LendingCard
                    asset="USDT"
                    amount="10,000"
                    term="Flexible"
                    interest="4.9%"
                    lender="0x2c67...78ef"
                    reputation={93}
                    requirements="Reputation > 75"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

function LoanCard({
  asset,
  amount,
  term,
  interest,
  borrower,
  reputation,
  collateral,
}: {
  asset: string
  amount: string
  term: string
  interest: string
  borrower: string
  reputation: number
  collateral: string
}) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "!bg-green-500"
    if (score >= 50) return "!bg-yellow-500"
    return "!bg-red-500"
  }

  return (
    <Card className="dark:text-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="dark:text-white">{asset} Loan Request</CardTitle>
          <Badge className={getScoreColor(reputation)}>{reputation}/100</Badge>
        </div>
        <CardDescription className="dark:text-white">Requested by {borrower}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground dark:text-white">Amount</p>
              <p className="font-medium dark:text-white">
                {amount} {asset}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground dark:text-white">Term</p>
              <p className="font-medium dark:text-white">{term}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground dark:text-white">Interest Rate</p>
              <p className="font-medium dark:text-white">{interest}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground dark:text-white">Collateral</p>
              <p className="font-medium dark:text-white">{collateral}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full !bg-twitter hover:!bg-twitter/90 text-white">Fund This Loan</Button>
      </CardFooter>
    </Card>
  )
}

function LendingCard({
  asset,
  amount,
  term,
  interest,
  lender,
  reputation,
  requirements,
}: {
  asset: string
  amount: string
  term: string
  interest: string
  lender: string
  reputation: number
  requirements: string
}) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "!bg-green-500"
    if (score >= 50) return "!bg-yellow-500"
    return "!bg-red-500"
  }

  return (
    <Card className="dark:text-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="dark:text-white">{asset} Lending Offer</CardTitle>
          <Badge className={getScoreColor(reputation)}>{reputation}/100</Badge>
        </div>
        <CardDescription className="dark:text-white">Offered by {lender}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground dark:text-white">Amount</p>
              <p className="font-medium dark:text-white">
                {amount} {asset}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground dark:text-white">Term</p>
              <p className="font-medium dark:text-white">{term}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground dark:text-white">Interest Rate</p>
              <p className="font-medium dark:text-white">{interest}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground dark:text-white">Requirements</p>
              <p className="font-medium dark:text-white">{requirements}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full !bg-twitter hover:!bg-twitter/90 text-white">Apply for Loan</Button>
      </CardFooter>
    </Card>
  )
}


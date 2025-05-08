import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BiWallet, BiTime } from "react-icons/bi"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function LoanOffers() {
  const lendingOffers = [
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
    },
    {
      id: 4,
      borrower: "Dz9RtKp...xL4Vb",
      asset: "SOL",
      amount: 35,
      interest: "+0.735 SOL",
      apy: "4.2%",
      collateral: "165%",
      verified: true,
      reputation: 93
    },
    {
      id: 5,
      borrower: "Nh8PqRs...tZ2Yx",
      asset: "USDC",
      amount: 12500,
      interest: "+625 USDC",
      apy: "5.0%",
      collateral: "155%",
      term: "30 days",
      reputation: 88
    },
    {
      id: 6,
      borrower: "Bk7MnLp...xR4Vz",
      asset: "mSOL",
      amount: 20,
      interest: "+0.65 mSOL",
      apy: "3.25%",
      collateral: "170%",
      term: "90 days",
      verified: true,
      reputation: 95
    },
    {
      id: 7,
      borrower: "Ft5GhJk...pL3Mn",
      asset: "JUP",
      amount: 4.5,
      interest: "+0.081 JUP",
      apy: "3.6%",
      collateral: "145%",
      term: "45 days",
      reputation: 87
    },
    {
      id: 8,
      borrower: "Qs9WxYz...bC6Vn",
      asset: "BONK",
      amount: 850000,
      interest: "+38250 BONK",
      apy: "9.0%",
      collateral: "185%",
      verified: true,
      term: "21 days",
      reputation: 90
    }
  ];

  const borrowRequests = [
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
      reputation: 94
    },
    {
      id: 4,
      lender: "Gf7HjKl...mN2Xz",
      asset: "USDC",
      available: 15000,
      term: "90 days",
      apr: "5.8%",
      interest: "870 USDC",
      collateral: "155%",
      reputation: 87
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Loan Offers</h2>
        </div>
        <Tabs defaultValue="lend" className="space-y-4">
          <TabsList>
            <TabsTrigger value="lend">Lending Offers</TabsTrigger>
            <TabsTrigger value="borrow">Borrow Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="lend" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {lendingOffers.map(offer => (
                <Card key={offer.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <img 
                          src={`/images/${offer.asset === "USDT" ? "tether-usdt-logo.png" : offer.asset.toLowerCase() + "-logo.png"}`} 
                          alt={offer.asset} 
                          className="w-5 h-5" 
                        />
                        {offer.asset} Loan
                        {offer.verified && (
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 ml-2">
                            Verified
                          </Badge>
                        )}
                      </CardTitle>
                      <Badge className={getScoreColor(offer.reputation)}>{offer.reputation}/100</Badge>
                    </div>
                    <CardDescription>
                      Borrower: {offer.borrower}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Amount</span>
                        <span className="font-medium">{offer.amount} {offer.asset}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Interest</span>
                        <span className="font-medium text-green-500">{offer.interest}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">APY</span>
                        <span className="font-medium text-green-500">{offer.apy}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Term</span>
                        <span className="font-medium flex items-center gap-1">
                          <BiTime className="h-4 w-4 text-blue-500" />
                          {offer.term}
                        </span>
                      </div>
                      <div className="flex flex-col col-span-2">
                        <span className="text-muted-foreground">Collateral</span>
                        <span className="font-medium">{offer.collateral}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Lend Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="borrow" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {borrowRequests.map(request => (
                <Card key={request.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <img 
                          src={`/images/${request.asset === "USDT" ? "tether-usdt-logo.png" : request.asset.toLowerCase() + "-logo.png"}`} 
                          alt={request.asset} 
                          className="w-5 h-5" 
                        />
                        {request.asset} Request
                        {request.verified && (
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 ml-2">
                            Verified
                          </Badge>
                        )}
                      </CardTitle>
                      <Badge className={getScoreColor(request.reputation)}>{request.reputation}/100</Badge>
                    </div>
                    <CardDescription>
                      Lender: {request.lender}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Available</span>
                        <span className="font-medium">{request.available} {request.asset}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Interest</span>
                        <span className="font-medium text-red-500">-{request.interest}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">APR</span>
                        <span className="font-medium text-red-500">{request.apr}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Term</span>
                        <span className="font-medium flex items-center gap-1">
                          <BiTime className="h-4 w-4 text-blue-500" />
                          {request.term}
                        </span>
                      </div>
                      <div className="flex flex-col col-span-2">
                        <span className="text-muted-foreground">Collateral</span>
                        <span className="font-medium">{request.collateral}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Borrow Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  )
}
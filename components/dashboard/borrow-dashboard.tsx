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
import { toast } from "sonner"

interface Loan {
  id: number
  lender: string
  asset: string
  amount: number
  interest: string
  dueDate: string
  status: string
}

interface Opportunity {
  id: number
  lender: string
  asset: string
  available: number
  term: string
  apr: string
  collateral: string
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
      status: "Active"
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
      status: "Active"
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
      collateral: "None"
    },
    {
      id: 2,
      lender: "0x3f12...87ab",
      asset: "SOL",
      available: 50,
      term: "60 days",
      apr: "3.8%",
      collateral: "150%"
    },
    {
      id: 3,
      lender: "0x9d45...12ef",
      asset: "mSOL",
      available: 30,
      term: "90 days",
      apr: "2.9%",
      collateral: "150%"
    },
    {
      id: 4,
      lender: "0x2b67...34cd",
      asset: "RAY",
      available: 2000,
      term: "45 days",
      apr: "6.5%",
      collateral: "200%"
    }
  ])

  const handleBorrow = (opportunity: Opportunity) => {
    // Simula o processo de empréstimo
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: "Processando empréstimo...",
        success: () => {
          // Adiciona o empréstimo à lista de empréstimos ativos
          const newLoan: Loan = {
            id: activeLoans.length + 1,
            lender: opportunity.lender,
            asset: opportunity.asset,
            amount: opportunity.available,
            interest: `${(opportunity.available * parseFloat(opportunity.apr) / 100).toFixed(2)} ${opportunity.asset}`,
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            status: "Active"
          }
          setActiveLoans([...activeLoans, newLoan])

          // Remove a oportunidade da lista
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
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">Total Borrowed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">${totalBorrowed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">Across {activeLoans.length} assets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">Interest Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">${totalInterest.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">Next payment: {activeLoans[0]?.dueDate}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">Average APR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">5.2%</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">-0.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">Active Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{activeLoans.length}</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">{activeLoans.length} due this month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="dark:text-white">Borrowing Overview</CardTitle>
          <CardDescription className="dark:text-gray-400">Manage your active loans and explore new borrowing opportunities.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active-loans">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active-loans">Active Loans</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            </TabsList>
            <TabsContent value="active-loans" className="mt-4">
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
                      <TableCell className="dark:text-white">{loan.lender}</TableCell>
                      <TableCell className="dark:text-white">{loan.asset}</TableCell>
                      <TableCell className="dark:text-white">{loan.amount}</TableCell>
                      <TableCell className="dark:text-white">{loan.interest}</TableCell>
                      <TableCell className="dark:text-white">{loan.dueDate}</TableCell>
                      <TableCell>
                        <Badge className="bg-twitter">{loan.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="opportunities" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lender</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Term</TableHead>
                    <TableHead>APR</TableHead>
                    <TableHead>Collateral</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {opportunities.map((opportunity) => (
                    <TableRow key={opportunity.id}>
                      <TableCell>{opportunity.lender}</TableCell>
                      <TableCell>{opportunity.asset}</TableCell>
                      <TableCell>{opportunity.available}</TableCell>
                      <TableCell>{opportunity.term}</TableCell>
                      <TableCell>{opportunity.apr}</TableCell>
                      <TableCell>{opportunity.collateral}</TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          className="bg-twitter hover:bg-twitter/90"
                          onClick={() => handleBorrow(opportunity)}
                        >
                          Borrow
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
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


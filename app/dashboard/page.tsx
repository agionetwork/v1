"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, Loader2 } from "lucide-react"
import Link from "next/link"
import ProfileDashboard from "@/components/dashboard/profile-dashboard"
import { RiskAssessment } from "@/components/risk-assessment"
import { ReferralProgram } from "@/components/referral-program"
import BorrowDashboard from "@/components/dashboard/borrow-dashboard"
import LendDashboard from "@/components/dashboard/lend-dashboard"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts'
import { useTheme } from "next-themes"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { BiWater, BiTrendingUp, BiPieChart, BiBarChart } from "react-icons/bi"
import { RiMoneyDollarCircleLine, RiFlashlightLine } from "react-icons/ri"
import { useWalletTokens } from "@/hooks/useWalletTokens"
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useSearchParams } from "next/navigation"

type LoanSummary = {
  totalBorrowed: number
  totalLent: number
  activeLoans: number
  reputation: number
}

type LoanActivity = {
  id: number
  date: string
  type: string
  asset: string
  amount: number
  counterparty: string
  status: string
}

const mockSummary: LoanSummary = {
  totalBorrowed: 5000,
  totalLent: 10000,
  activeLoans: 3,
  reputation: 85
}

// Dados simulados para os gráficos
const activeLoansData = [
  { month: 'Jan', loans: 1 },
  { month: 'Feb', loans: 2 },
  { month: 'Mar', loans: 2 },
  { month: 'Apr', loans: 3 },
  { month: 'May', loans: 2 },
  { month: 'Jun', loans: 3 }
]

const reputationData = [
  { month: 'Jan', score: 75 },
  { month: 'Feb', score: 78 },
  { month: 'Mar', score: 80 },
  { month: 'Apr', score: 82 },
  { month: 'May', score: 83 },
  { month: 'Jun', score: 85 }
]

const volumeTrendData = [
  { month: 'Jan', volume: 12500 },
  { month: 'Feb', volume: 18700 },
  { month: 'Mar', volume: 15800 },
  { month: 'Apr', volume: 22400 },
  { month: 'May', volume: 19600 },
  { month: 'Jun', volume: 25800 }
]

const assetDistributionData = [
  { name: 'SOL', value: 45 },
  { name: 'USDC', value: 30 },
  { name: 'BONK', value: 15 },
  { name: 'JUP', value: 10 }
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const loanActivity: LoanActivity[] = [
  {
    id: 1,
    date: "06/15/2025",
    type: "Borrowed",
    asset: "SOL",
    amount: 25,
    counterparty: "5CZoJzV...Uh8Bw",
    status: "Completed"
  },
  {
    id: 2,
    date: "05/10/2025",
    type: "Borrowed",
    asset: "USDC",
    amount: 5000,
    counterparty: "HN7cABqLq...vGRE1",
    status: "Pending"
  },
  {
    id: 3,
    date: "04/01/2025",
    type: "Lent",
    asset: "mSOL",
    amount: 15,
    counterparty: "9dRKEp7...mFGQs",
    status: "Completed"
  }
]

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") || "overview"
  const [activeTab, setActiveTab] = useState("profile")
  const { theme } = useTheme()
  const { tokens, isLoading, error } = useWalletTokens()
  
  // Função para aplicar estilos aos elementos do gráfico no modo escuro
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const applyChartStyles = () => {
        const isDarkMode = document.documentElement.classList.contains('dark');
        
        document.querySelectorAll('.recharts-cartesian-axis-tick-value tspan').forEach(el => {
          el.setAttribute('fill', isDarkMode ? '#fff' : '#000');
        });
        
        document.querySelectorAll('.recharts-cartesian-grid-horizontal line, .recharts-cartesian-grid-vertical line').forEach(el => {
          el.setAttribute('stroke', isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.2)');
        });
        
        document.querySelectorAll('.recharts-cartesian-axis-line').forEach(el => {
          el.setAttribute('stroke', isDarkMode ? '#fff' : '#000');
        });
      };
      
      // Aplicar estilos inicialmente e sempre que houver mudanças no DOM
      applyChartStyles();
      
      // Criar um observador para detectar mudanças no DOM
      const observer = new MutationObserver((mutations) => {
        // Verificar se alguma mutação afeta a classe 'dark' no documentElement
        for (const mutation of mutations) {
          if (mutation.type === 'attributes' && 
              mutation.attributeName === 'class' && 
              mutation.target === document.documentElement) {
            applyChartStyles();
            break;
          }
        }
        
        // Também verificar se os elementos do gráfico foram adicionados/modificados
        applyChartStyles();
      });
      
      observer.observe(document.documentElement, { 
        attributes: true, 
        attributeFilter: ['class'] 
      });
      
      observer.observe(document.body, { 
        childList: true, 
        subtree: true 
      });
      
      // Também aplicar quando o tema mudar explicitamente
      const themeChangeHandler = () => {
        setTimeout(applyChartStyles, 100);
      };
      
      return () => {
        observer.disconnect();
      };
    }
  }, [theme, activeTab]);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <Tabs defaultValue={tab} className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="loans">My Loans</TabsTrigger>
          <TabsTrigger value="offers">My Offers</TabsTrigger>
          <TabsTrigger value="reputation">Reputation</TabsTrigger>
            </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <div className="grid gap-4 lg:grid-cols-3">
              <Card className="lg:col-span-1 border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-center">
                    <div className="flex items-center justify-center gap-2">
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <BiWater className="h-5 w-5 text-blue-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Shows funds available for lending in your wallet</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                      Available Liquidity
                    </div>
                  </CardTitle>
                  <CardDescription className="text-center">
                    Total funds available for lending
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    </div>
                  ) : error ? (
                    <div className="text-center text-red-500 py-4">
                      {error}
                    </div>
                  ) : tokens.length === 0 ? (
                    <div className="text-center text-muted-foreground py-4">
                      0 tokens available
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {tokens.map((token) => (
                        <div key={token.symbol} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <img 
                                src={`/images/${token.symbol === "USDT" ? "tether-usdt-logo.png" : token.symbol.toLowerCase() + "-logo.png"}`} 
                                alt={token.symbol} 
                                className="w-5 h-5" 
                              />
                              <span>{token.symbol}</span>
                            </div>
                            <span className="font-bold">
                              {token.symbol === "BONK" 
                                ? `${(token.balance / 1000000000).toFixed(1)}B ${token.symbol}`
                                : token.symbol === "SOL" 
                                  ? `${token.balance} ${token.symbol}`
                                  : `$${token.balance.toLocaleString()}`
                              }
                            </span>
                          </div>
                          <div className="w-full bg-muted/50 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${token.percentOfTotal}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Tokens adicionais estáticos */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <img 
                              src="/images/jup-logo.png" 
                              alt="JUP" 
                              className="w-5 h-5" 
                            />
                            <span>JUP</span>
                          </div>
                          <span className="font-bold">
                            1,250 JUP
                          </span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: "15%" }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <img 
                              src="/images/msol-logo.png" 
                              alt="mSOL" 
                              className="w-5 h-5" 
                            />
                            <span>mSOL</span>
                          </div>
                          <span className="font-bold">
                            3.5 mSOL
                          </span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: "20%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="lg:col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-center">
                    <div className="flex items-center justify-center gap-2">
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <InfoCircledIcon className="h-5 w-5 text-blue-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Assessment of your loan portfolio risk</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                      Risk Analysis
                    </div>
                  </CardTitle>
                  <CardDescription className="text-center">
                    Assessment of your loan portfolio risk
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative w-32 h-32">
                        <div className="w-32 h-32 rounded-full border-8 border-blue-500"></div>
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                          <span className="text-3xl font-bold">Low</span>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground text-center">
                        Your portfolio has a low risk profile with good diversification
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-muted/20 p-3 rounded-md">
                        <div className="text-sm text-muted-foreground">Default Risk</div>
                        <div className="text-lg font-bold text-green-500">2.3%</div>
                      </div>
                      <div className="bg-muted/20 p-3 rounded-md">
                        <div className="text-sm text-muted-foreground">Diversification</div>
                        <div className="text-lg font-bold text-green-500">High</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 lg:col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-center">
                    <div className="flex items-center justify-center gap-2">
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <BiPieChart className="h-5 w-5 text-blue-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Distribution of your loans by asset type</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                      Asset Distribution
                    </div>
                  </CardTitle>
                  <CardDescription className="text-center">
                    Distribution of your loans by asset type
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-3">
                  <div className="h-60 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
                        <Pie
                          data={assetDistributionData}
                          cx="50%"
                          cy="45%"
                          labelLine={false}
                          outerRadius={60}
                          innerRadius={30}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                          paddingAngle={4}
                        >
                          {assetDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend 
                          layout="horizontal" 
                          verticalAlign="bottom" 
                          align="center" 
                          wrapperStyle={{ paddingTop: '20px' }}
                        />
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 mt-6 lg:grid-cols-2">
              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-center">
                    <div className="flex items-center justify-center gap-2">
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <BiBarChart className="h-5 w-5 text-blue-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Loan volume over the last 6 months</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                      Volume Trend
                    </div>
                  </CardTitle>
                  <CardDescription className="text-center">
                    Loan volume over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-56 w-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={volumeTrendData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 20,
                          bottom: 20,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '10px' }} />
                        <Bar dataKey="volume" fill="#2563eb" name="Volume ($)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-center">
                    <div className="flex items-center justify-center gap-2">
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <RiFlashlightLine className="h-5 w-5 text-blue-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Quick actions to start lending or borrowing</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                      Quick Actions
                    </div>
                  </CardTitle>
                  <CardDescription className="text-center">Start lending or borrowing</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-1">
                  <Link href="/loan-offers/marketplace" className="flex justify-center">
                    <Button className="w-3/4 bg-blue-600 hover:bg-blue-700 text-white">
                      Loan Offers <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/borrow-lend" className="flex justify-center">
                    <Button className="w-3/4 bg-blue-600 hover:bg-blue-700 text-white">
                      Create Loan Request <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 mt-6 lg:grid-cols-2">
              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-center">
                    <div className="flex items-center justify-center gap-2">
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <BiBarChart className="h-5 w-5 text-blue-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Active loans over the last 6 months</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                      Active Loans
                    </div>
                  </CardTitle>
                  <CardDescription className="text-center">
                    Number of active loans over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-56 w-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={activeLoansData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 20,
                          bottom: 20,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '10px' }} />
                        <Line type="monotone" dataKey="loans" stroke="#2563eb" name="Active Loans" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-center">
                    <div className="flex items-center justify-center gap-2">
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <BiTrendingUp className="h-5 w-5 text-blue-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Your reputation score growth over time</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                      Reputation Growth
                    </div>
                  </CardTitle>
                  <CardDescription className="text-center">
                    Your reputation score over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-56 w-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={reputationData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 20,
                          bottom: 20,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[70, 100]} />
                        <Tooltip />
                        <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '10px' }} />
                        <Line type="monotone" dataKey="score" stroke="#10b981" name="Reputation Score" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-center">
                    <div className="flex items-center justify-center gap-2">
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <RiMoneyDollarCircleLine className="h-5 w-5 text-blue-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>History of your lending activities</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                      Loan Activity
                    </div>
                  </CardTitle>
                  <CardDescription className="text-center">History of your loans</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow>
                          <TableHead className="font-medium text-center">ID</TableHead>
                          <TableHead className="font-medium text-center">Date</TableHead>
                          <TableHead className="font-medium text-center">Type</TableHead>
                          <TableHead className="font-medium text-center">Asset</TableHead>
                          <TableHead className="font-medium text-center">Amount</TableHead>
                          <TableHead className="font-medium text-center">Counterparty</TableHead>
                          <TableHead className="font-medium text-center">Status</TableHead>
                          <TableHead className="font-medium text-center">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loanActivity.length > 0 ? (
                          loanActivity.map((activity) => (
                            <TableRow key={activity.id} className="hover:bg-muted/50 transition-colors">
                              <TableCell className="text-center font-medium">#{activity.id}</TableCell>
                              <TableCell className="text-center">{activity.date}</TableCell>
                              <TableCell className="text-center">
                                <Badge className={activity.type === "Borrowed" ? "bg-green-500" : "bg-blue-500"}>
                                  <span className="text-white">{activity.type}</span>
                                </Badge>
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <img 
                                    src={`/images/${activity.asset === "USDT" ? "tether-usdt-logo.png" : activity.asset.toLowerCase() + "-logo.png"}`} 
                                    alt={activity.asset} 
                                    className="w-5 h-5" 
                                  />
                                  {activity.asset}
                                </div>
                              </TableCell>
                              <TableCell className="text-center font-medium">{activity.amount} {activity.asset}</TableCell>
                              <TableCell className="text-center">{activity.counterparty}</TableCell>
                              <TableCell className="text-center">
                                <Badge className={
                                  activity.status === "Completed" ? "bg-green-500" : 
                                  activity.status === "Pending" ? "bg-yellow-500" : 
                                  "bg-red-500"
                                }>
                                  <span className="text-white">{activity.status}</span>
                                </Badge>
                              </TableCell>
                              <TableCell className="text-center">
                                <Button
                                  size="sm"
                                  className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                              Connect your wallet to view activity history
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                      View All
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
            </TabsContent>

        <TabsContent value="loans">
          <div className="grid gap-6">
            <h2 className="text-2xl font-semibold">My Loans</h2>
            {/* Add loans content */}
          </div>
            </TabsContent>

        <TabsContent value="offers">
          <div className="grid gap-6">
            <h2 className="text-2xl font-semibold">My Offers</h2>
            {/* Add offers content */}
          </div>
            </TabsContent>

        <TabsContent value="reputation">
          <div className="grid gap-6">
            <h2 className="text-2xl font-semibold">Reputation</h2>
            {/* Add reputation content */}
          </div>
            </TabsContent>
          </Tabs>
    </div>
  )
}
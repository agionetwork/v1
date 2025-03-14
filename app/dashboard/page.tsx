"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import ProfileDashboard from "@/components/dashboard/profile-dashboard"
import { RiskAssessment } from "@/components/risk-assessment"
import { ReferralProgram } from "@/components/referral-program"
import BorrowDashboard from "@/components/dashboard/borrow-dashboard"
import LendDashboard from "@/components/dashboard/lend-dashboard"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useTheme } from "next-themes"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type LoanSummary = {
  totalBorrowed: number
  totalLent: number
  activeLoans: number
  reputation: number
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

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const { theme } = useTheme()
  
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
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your lending and borrowing activities.
          </p>
        </div>

        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Profile</TabsTrigger>
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="borrow" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Borrow</TabsTrigger>
            <TabsTrigger value="lend" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Lend</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileDashboard />
          </TabsContent>

          <TabsContent value="overview">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-1 grid gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Total Lent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${mockSummary.totalLent.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Across all active loans
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Total Borrowed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${mockSummary.totalBorrowed.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Across all active loans
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-center">Risk Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid gap-3">
                      <div className="grid grid-cols-3 items-center gap-3">
                        <Label htmlFor="loan-amount" className="text-right text-sm dark:text-white">
                          Loan Amount (SOL)
                        </Label>
                        <Input
                          id="loan-amount"
                          type="number"
                          className="col-span-2 h-8 text-sm"
                          defaultValue={0}
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-3">
                        <Label htmlFor="collateral" className="text-right text-sm dark:text-white">
                          Collateral (SOL)
                        </Label>
                        <Input
                          id="collateral"
                          type="number"
                          className="col-span-2 h-8 text-sm"
                          defaultValue={0}
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-3">
                        <Label htmlFor="term" className="text-right text-sm dark:text-white">
                          Term (Days)
                        </Label>
                        <Input
                          id="term"
                          type="number"
                          className="col-span-2 h-8 text-sm"
                          defaultValue={30}
                        />
                      </div>
                    </div>
                    <Button className="w-full h-8 text-sm bg-blue-600 hover:bg-blue-700 text-white">Calculate Risk</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-1">
                <CardHeader className="text-center">
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Start lending or borrowing</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <Link href="/loan-offers/marketplace">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Loan Offers <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/borrow-lend">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Create Loan Request <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 mt-6 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Active Loans</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={activeLoansData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="month" 
                        />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            borderRadius: '4px',
                            color: '#000'
                          }}
                          wrapperClassName="dark:text-white"
                          formatter={(value, name) => {
                            return [value, document.documentElement.classList.contains('dark') ? 'Loans' : name];
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="loans" 
                          stroke="#2563eb" 
                          strokeWidth={2}
                          dot={{ fill: '#2563eb', strokeWidth: 2 }}
                          activeDot={{ r: 6, fill: '#2563eb' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Reputation Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={reputationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="month" 
                        />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            borderRadius: '4px',
                            color: '#000'
                          }}
                          wrapperClassName="dark:text-white"
                          formatter={(value, name) => {
                            return [value, document.documentElement.classList.contains('dark') ? 'Score' : name];
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="#2563eb" 
                          strokeWidth={2}
                          dot={{ fill: '#2563eb', strokeWidth: 2 }}
                          activeDot={{ r: 6, fill: '#2563eb' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    Connect your wallet to view activity
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="borrow">
            <BorrowDashboard />
          </TabsContent>

          <TabsContent value="lend">
            <LendDashboard />
          </TabsContent>

          <TabsContent value="risk">
            <RiskAssessment />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 
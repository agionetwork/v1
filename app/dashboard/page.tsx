"use client"

import { useState } from "react"
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

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your lending and borrowing activities.
          </p>
        </div>

        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Profile</TabsTrigger>
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="borrow" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Borrow</TabsTrigger>
            <TabsTrigger value="lend" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Lend</TabsTrigger>
            <TabsTrigger value="risk" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Risk Calculator</TabsTrigger>
            <TabsTrigger value="referral" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Referral</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileDashboard />
          </TabsContent>

          <TabsContent value="overview">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2 grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Borrowed</CardTitle>
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
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Lent</CardTitle>
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
              </div>

              <Card className="lg:col-span-1">
                <CardHeader>
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
                  <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={activeLoansData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                        <XAxis 
                          dataKey="month" 
                          stroke="#fff"
                          tick={{ fill: '#fff', fontSize: 12 }}
                        />
                        <YAxis 
                          stroke="#fff"
                          tick={{ fill: '#fff', fontSize: 12 }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#fff'
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
                  <CardTitle className="text-sm font-medium">Reputation Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={reputationData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                        <XAxis 
                          dataKey="month" 
                          stroke="#fff"
                          tick={{ fill: '#fff', fontSize: 12 }}
                        />
                        <YAxis 
                          stroke="#fff"
                          tick={{ fill: '#fff', fontSize: 12 }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#fff'
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

          <TabsContent value="referral">
            <ReferralProgram />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 
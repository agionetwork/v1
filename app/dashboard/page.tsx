"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { useWalletTokens } from "../../hooks/useWalletTokens"
import { useTokenPrices } from "../../hooks/useTokenPrices"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Separator } from "../../components/ui/separator"
import { Switch } from "../../components/ui/switch"
import { Textarea } from "../../components/ui/textarea"
import { ResponsiveLine } from "@nivo/line"
import { useSearchParams, useRouter } from "next/navigation"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip"
import { ResponsiveBar } from '@nivo/bar'
import { ResponsivePie } from '@nivo/pie'
import BorrowDashboard from "../../components/dashboard/borrow-dashboard"
import LendDashboard from "../../components/dashboard/lend-dashboard"
import LoanViewModal from "../../components/dashboard/loan-view-modal"
import Link from "next/link"
import ProfileDashboard from "../../components/dashboard/profile-dashboard"

type LoanSummary = {
  totalBorrowed: number
  totalLent: number
  activeLoans: number
  avgInterestRate: number
  avgDuration: number
}

const loanSummary: LoanSummary = {
  totalBorrowed: 1000,
  totalLent: 2000,
  activeLoans: 3,
  avgInterestRate: 5.5,
  avgDuration: 30,
}

const loanHistory = [
  {
    id: "borrowed",
    data: [
      { x: "Jan", y: 100 },
      { x: "Feb", y: 300 },
      { x: "Mar", y: 500 },
      { x: "Apr", y: 700 },
      { x: "May", y: 1000 },
    ],
  },
  {
    id: "lent",
    data: [
      { x: "Jan", y: 200 },
      { x: "Feb", y: 400 },
      { x: "Mar", y: 800 },
      { x: "Apr", y: 1200 },
      { x: "May", y: 2000 },
    ],
  },
]

const recentActivity = [
  {
    id: 1,
    type: "Borrowed",
    amount: 25,
    token: "SOL",
    date: "2024-06-15",
    status: "Completed",
    counterparty: "5CZoJzV...Uh8Bw",
    interest: "0.95 SOL",
    collateral: "50 SOL",
    apr: "7.6%",
    term: "60 days",
    dueDate: "2025-08-15",
    description: "Business expansion loan with collateralization through staked SOL",
    transactionHash: "5ptzMFMKqY4RGnHQZC9CjJVDxV4VuWGXzKr42YZiEYRgEkpXMpYyQfBHDAB3KZopE",
  },
  {
    id: 2,
    type: "Borrowed",
    amount: 5000,
    token: "USDC",
    date: "2024-05-10",
    status: "Pending",
    counterparty: "HN7cABqLq...vGRE1",
    interest: "260 USDC",
    collateral: "7500 USDC",
    apr: "5.2%",
    term: "45 days",
    dueDate: "2025-06-24",
    description: "Short-term working capital loan for digital goods procurement",
    transactionHash: "7rFYtHXzM5pVQDn8LJKGwRsZBCv6mF2qP9TyJkL4WxaE3SdN1VuY92bTrEhDpA8c",
  },
  {
    id: 3,
    type: "Lent",
    amount: 15,
    token: "mSOL",
    date: "2024-04-01",
    status: "Active",
    counterparty: "9dRKEp7...mFGQs",
    interest: "0.43 mSOL",
    collateral: "22.5 mSOL",
    apr: "8.6%",
    term: "90 days",
    dueDate: "2025-06-30",
    description: "Liquidity provision loan for DEX market making operations",
    transactionHash: "3hLqN7KrBvXtZWgS5aPJ2mD9UcY6RfE8GxVnFk4p1QwTjMsHbPzA5eKdLuC4xX9V",
  }
]

type BadgeVariant = "default" | "destructive" | "outline" | "secondary"

interface Badge {
  title: string
  description: string
  variant: BadgeVariant
  className: string
}

const badges: Badge[] = [
  {
    title: "Trusted Lender",
    description: "Você é um credor confiável na plataforma",
    variant: "default",
    className: "bg-blue-500",
  },
  {
    title: "Security Expert",
    description: "Você é um mutuário confiável na plataforma",
    variant: "secondary",
    className: "bg-green-500",
  },
]

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tab = searchParams.get("tab") || "overview"
  const [activeTab, setActiveTab] = useState(tab)
  const { theme } = useTheme()
  const { tokens, isLoading, error } = useWalletTokens()
  const { prices } = useTokenPrices()
  
  const [chartData, setChartData] = useState(loanHistory)
  const [selectedLoan, setSelectedLoan] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const colors = theme === "dark" ? ["#60A5FA", "#34D399"] : ["#2563EB", "#059669"]
    setChartData(
      loanHistory.map((series, i) => ({
        ...series,
        color: colors[i],
      }))
    )
  }, [theme, activeTab])

  useEffect(() => {
    setActiveTab(tab)
  }, [tab])

  const handleViewLoan = (loan: any) => {
    setSelectedLoan(loan)
    setIsModalOpen(true)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/dashboard?tab=${value}`)
  }

  // Definir cores baseadas no tema
  const titleColor = theme === 'dark' ? 'text-blue-200' : 'text-blue-600'
  const subtitleColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
  const textColor = theme === 'dark' ? 'text-white' : 'text-black'
  const descriptionColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700'

  // Cores para gráficos baseadas no tema
  const chartAxisColor = theme === 'dark' ? '#e0e7ef' : '#374151'
  const chartGridColor = theme === 'dark' ? '#b6c6e3' : '#6b7280'

  // Gerar dados do gráfico de distribuição baseado nos tokens reais
  const getAssetDistributionData = () => {
    if (tokens.length === 0) {
      return [
        { id: 'SOL', value: 45, color: '#60A5FA' },
        { id: 'USDC', value: 30, color: '#34D399' },
        { id: 'BONK', value: 15, color: '#FBBF24' },
        { id: 'JUP', value: 10, color: '#F87171' },
      ]
    }

    return tokens.map(token => {
      const colors: Record<string, string> = {
        SOL: '#60A5FA',
        USDC: '#34D399',
        USDT: '#10B981',
        mSOL: '#8B5CF6',
        BONK: '#FBBF24',
        JUP: '#F87171'
      }
      
      return {
        id: token.symbol,
        value: Math.round(token.percentOfTotal),
        color: colors[token.symbol] || '#6B7280'
      }
    }).filter(item => item.value > 0)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl font-bold tracking-tighter">
              Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground">
            Gerencie seus empréstimos e investimentos
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="borrow">Borrow</TabsTrigger>
            <TabsTrigger value="lend">Lend</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="flex flex-col gap-8">
              {/* Linha de cards principais */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Available Liquidity */}
                <Card className="border-2 p-6">
                  <div className={`${titleColor} flex items-center justify-center gap-2 mb-2`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold">Available Liquidity</span>
                  </div>
                  <div className={`${subtitleColor} text-sm mb-4 text-center`}>Total funds available for lending</div>
                  
                  {isLoading ? (
                    <div className="flex justify-center items-center h-24">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  ) : tokens.length > 0 ? (
                    <div className="space-y-3">
                      {tokens.map((token, index) => {
                        const tokenPrice = prices[token.symbol]
                        const priceChange = tokenPrice?.change24h || 0
                        const isPositive = priceChange >= 0
                        
                        return (
                          <div key={index} className="flex justify-between items-center border-b border-blue-900 pb-2 last:border-0">
                            <div className="flex items-center gap-2">
                              <img 
                                src={`/images/${token.symbol === "USDT" ? "tether-usdt-logo.png" : token.symbol.toLowerCase()}-logo.png`} 
                                alt={token.symbol} 
                                className="w-6 h-6 rounded-full"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/images/token-placeholder.png'
                                }}
                              />
                              <div className="flex flex-col">
                                <span className="font-medium text-sm">{token.symbol}</span>
                                {tokenPrice && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-xs text-gray-500">${tokenPrice.price.toFixed(4)}</span>
                                    <span className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                      {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="font-bold text-sm">{token.balance.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span>
                              <span className={`text-xs ${subtitleColor}`}>${token.usdValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                              <span className="text-xs text-gray-400">{token.percentOfTotal.toFixed(1)}%</span>
                            </div>
                          </div>
                        )
                      })}
                      <div className="pt-2 text-center">
                        <div className="font-bold text-lg text-blue-400">
                          Total: ${tokens.reduce((sum, token) => sum + token.usdValue, 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <div className={`${textColor} text-lg font-medium mb-2`}>No tokens available</div>
                      <div className={`${subtitleColor} text-sm`}>Connect your wallet to see your available tokens</div>
                    </div>
                  )}
                </Card>
                {/* Risk Analysis */}
                <Card className="border-2 p-6 flex flex-col items-center justify-center">
                  <div className={`${titleColor} flex items-center justify-center gap-2 mb-2`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="font-semibold">Risk Analysis</span>
                  </div>
                  <div className={`${subtitleColor} text-sm mb-2`}>Assessment of your loan portfolio risk</div>
                  <div className="flex flex-col items-center justify-center mb-2">
                    <div className="rounded-full border-4 border-blue-600 w-24 h-24 flex items-center justify-center mb-2">
                      <span className="text-3xl text-blue-400 font-bold">Low</span>
                    </div>
                    <div className={`${descriptionColor} text-center text-sm`}>Your portfolio has a low risk profile with good diversification</div>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <div className="bg-blue-900 rounded-lg px-4 py-2 flex flex-col items-center">
                      <span className="text-xs text-white">Default Risk</span>
                      <span className="text-green-400 font-semibold">2.3%</span>
                    </div>
                    <div className="bg-blue-900 rounded-lg px-4 py-2 flex flex-col items-center">
                      <span className="text-xs text-white">Diversification</span>
                      <span className="text-green-400 font-semibold">High</span>
                    </div>
                  </div>
                </Card>
                {/* Asset Distribution */}
                <Card className="border-2 p-6 flex flex-col items-center justify-center">
                  <div className={`${titleColor} flex items-center justify-center gap-2 mb-2`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                    <span className="font-semibold">Asset Distribution</span>
                  </div>
                  <div className={`${subtitleColor} text-sm mb-2`}>Distribution of your assets by token type</div>
                  <div className="flex flex-col items-center w-full">
                    <div className="w-56 h-56">
                      <ResponsivePie
                        data={getAssetDistributionData()}
                        margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
                        innerRadius={0.5}
                        padAngle={2}
                        cornerRadius={3}
                        colors={({ data }) => data.color}
                        borderWidth={1}
                        borderColor="#fff"
                        enableArcLabels={false}
                        enableArcLinkLabels={true}
                        arcLinkLabelsSkipAngle={5}
                        arcLinkLabelsTextColor={({ data }) => data.color}
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsDiagonalLength={16}
                        arcLinkLabelsStraightLength={24}
                        arcLinkLabelsOffset={4}
                        arcLinkLabel={d => `${d.value}%`}
                        isInteractive={true}
                        theme={{
                          labels: {
                            text: {
                              fontWeight: 700,
                              fontSize: 14
                            }
                          },
                          tooltip: {
                            container: {
                              background: '#ffffff',
                              color: '#333333',
                              fontSize: 12
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 text-xs justify-center">
                      {tokens.map((token) => {
                        const colors: Record<string, string> = {
                          SOL: 'text-blue-400',
                          USDC: 'text-green-400',
                          USDT: 'text-emerald-400',
                          mSOL: 'text-purple-400',
                          BONK: 'text-yellow-400',
                          JUP: 'text-red-400'
                        }
                        return (
                          <div key={token.symbol} className={`flex items-center gap-1 ${colors[token.symbol] || 'text-gray-400'}`}>
                            <span className="w-2 h-2 rounded-full bg-current"></span>
                            {token.symbol}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Linha de gráficos e ações */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Volume Trend */}
                <Card className="border-2 p-6">
                  <div className={`${titleColor} flex items-center justify-center gap-2 mb-2`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="font-semibold">Volume Trend</span>
                  </div>
                  <div className={`${subtitleColor} text-sm mb-2 text-center`}>Loan volume over the last 6 months</div>
                  <div className="w-full h-40 md:h-56">
                    <ResponsiveBar
                      data={[
                        { month: 'Jan', volume: 8000 },
                        { month: 'Feb', volume: 12000 },
                        { month: 'Mar', volume: 15000 },
                        { month: 'Apr', volume: 18000 },
                        { month: 'May', volume: 21000 },
                        { month: 'Jun', volume: 25000 },
                      ]}
                      keys={['volume']}
                      indexBy="month"
                      margin={{ top: 20, right: 20, bottom: 48, left: 60 }}
                      padding={0.38}
                      colors={({ id, data }) => `url(#volumeBarGradient)`}
                      axisBottom={{
                        tickSize: 0,
                        tickPadding: 12,
                        legend: 'Month',
                        legendPosition: 'middle',
                        legendOffset: 40,
                        tickRotation: 0
                      }}
                      axisLeft={{
                        tickSize: 0,
                        tickPadding: 12,
                        legend: 'Volume',
                        legendPosition: 'middle',
                        legendOffset: -50,
                        format: v => Math.round(v),
                        tickValues: [8000, 16000, 25000],
                      }}
                      enableLabel={false}
                      isInteractive={true}
                      borderRadius={8}
                      borderColor="#fff"
                      theme={{
                        axis: {
                          ticks: { text: { fill: chartAxisColor, fontWeight: 700 } },
                          legend: { text: { fill: chartAxisColor, fontWeight: 700, textAlign: 'center' } }
                        },
                        grid: { line: { stroke: chartGridColor, strokeWidth: 2, opacity: 0.7 } },
                        tooltip: { container: { background: '#fff', color: '#1358EC', borderRadius: 10, fontSize: 16, fontWeight: 700, boxShadow: '0 2px 8px #0003', border: '1px solid #1358EC' } },
                        crosshair: { line: { stroke: '#2563eb', strokeWidth: 3, strokeDasharray: '4 4' } }
                      }}
                      gridYValues={[8000, 16000, 25000]}
                      enableGridY={true}
                      enableGridX={false}
                      tooltip={({ value, indexValue }) => (
                        <div style={{ padding: 12, background: '#fff', color: '#1358EC', borderRadius: 10, fontWeight: 700, fontSize: 16, border: '1px solid #1358EC', boxShadow: '0 2px 8px #0003' }}>
                          <strong>{indexValue}</strong>: <span style={{ color: '#2563eb' }}>${value}</span>
                        </div>
                      )}
                      layers={['grid', 'axes', 'bars', 'markers', 'legends',
                        (props) => (
                          <defs>
                            <linearGradient id="volumeBarGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#60a5fa" />
                              <stop offset="100%" stopColor="#2563eb" />
                            </linearGradient>
                          </defs>
                        )
                      ]}
                    />
                  </div>
                  <div className="text-blue-400 text-xs mt-2">Volume ($)</div>
                </Card>
                {/* Quick Actions */}
                <Card className="border-2 p-6 flex flex-col items-center justify-center">
                  <div className={`${titleColor} flex items-center justify-center gap-2 mb-2`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="font-semibold">Quick Actions</span>
                  </div>
                  <div className={`${subtitleColor} text-sm mb-4 text-center`}>Start lending or borrowing</div>
                  <Link href="/loan-offers" className="w-3/4 mb-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Loan Offers</Button>
                  </Link>
                  <Link href="/borrow-lend" className="w-3/4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Create Loan Request</Button>
                  </Link>
                </Card>
              </div>

              {/* Linha de gráficos inferiores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Active Loans */}
                <Card className="border-2 p-6">
                  <div className={`${titleColor} flex items-center justify-center gap-2 mb-2`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="font-semibold">Active Loans</span>
                  </div>
                  <div className={`${subtitleColor} text-sm mb-2 text-center`}>Number of active loans over time</div>
                  <div className="w-full h-40 md:h-56">
                    <ResponsiveLine
                      data={[
                        {
                          id: 'Active Loans',
                          color: '#2563eb',
                          data: [
                            { x: 'Jan', y: 1 },
                            { x: 'Feb', y: 2 },
                            { x: 'Mar', y: 2 },
                            { x: 'Apr', y: 3 },
                            { x: 'May', y: 2 },
                            { x: 'Jun', y: 3 },
                          ],
                        },
                      ]}
                      margin={{ top: 20, right: 20, bottom: 48, left: 60 }}
                      xScale={{ type: 'point' }}
                      yScale={{ type: 'linear', min: 0, max: 5 }}
                      axisBottom={{
                        tickSize: 0,
                        tickPadding: 12,
                        legend: 'Month',
                        legendPosition: 'middle',
                        legendOffset: 32,
                        tickRotation: 0
                      }}
                      axisLeft={{
                        tickSize: 0,
                        tickPadding: 12,
                        legend: 'Loans',
                        legendPosition: 'middle',
                        legendOffset: -50,
                        format: v => Number.isInteger(v) ? v : '',
                        tickValues: [0, 1, 2, 3, 4, 5],
                      }}
                      colors={["#2563eb"]}
                      enablePoints={true}
                      pointSize={16}
                      pointColor="#2563eb"
                      pointBorderWidth={5}
                      pointBorderColor={{ from: 'serieColor' }}
                      enableArea={true}
                      areaOpacity={0.22}
                      isInteractive={true}
                      enableGridX={false}
                      enableGridY={true}
                      gridYValues={6}
                      lineWidth={5}
                      theme={{
                        axis: {
                          ticks: { text: { fill: chartAxisColor, fontWeight: 700 } },
                          legend: { text: { fill: chartAxisColor, fontWeight: 700, textAlign: 'center' } }
                        },
                        grid: { line: { stroke: chartGridColor, strokeWidth: 2, opacity: 0.7 } },
                        tooltip: { container: { background: '#fff', color: '#1358EC', borderRadius: 10, fontSize: 16, fontWeight: 700, boxShadow: '0 2px 8px #0003', border: '1px solid #1358EC' } },
                        crosshair: { line: { stroke: '#2563eb', strokeWidth: 3, strokeDasharray: '4 4' } }
                      }}
                      tooltip={({ point }) => (
                        <div style={{ padding: 12, background: '#fff', color: '#1358EC', borderRadius: 10, fontWeight: 700, fontSize: 16, border: '1px solid #1358EC', boxShadow: '0 2px 8px #0003' }}>
                          <strong>{point.data.x}</strong>: <span style={{ color: '#2563eb' }}>{point.data.y}</span>
                        </div>
                      )}
                      pointLabel="y"
                      pointLabelYOffset={-16}
                      enableSlices="x"
                    />
                  </div>
                  <div className="text-blue-400 text-xs mt-2 text-center w-full">Active Loans</div>
                </Card>
                {/* Reputation Growth */}
                <Card className="border-2 p-6">
                  <div className={`${titleColor} flex items-center justify-center gap-2 mb-2`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span className="font-semibold">Reputation Growth</span>
                  </div>
                  <div className={`${subtitleColor} text-sm mb-2 text-center`}>Your reputation score over time</div>
                  <div className="w-full h-40 md:h-56">
                    <ResponsiveLine
                      data={[
                        {
                          id: 'Reputation Score',
                          color: '#10B981',
                          data: [
                            { x: 'Jan', y: 20 },
                            { x: 'Feb', y: 40 },
                            { x: 'Mar', y: 60 },
                            { x: 'Apr', y: 80 },
                            { x: 'May', y: 95 },
                            { x: 'Jun', y: 100 },
                          ],
                        },
                      ]}
                      margin={{ top: 20, right: 20, bottom: 48, left: 60 }}
                      xScale={{ type: 'point' }}
                      yScale={{ type: 'linear', min: 0, max: 100 }}
                      axisBottom={{
                        tickSize: 0,
                        tickPadding: 12,
                        legend: 'Month',
                        legendPosition: 'middle',
                        legendOffset: 32,
                        tickRotation: 0
                      }}
                      axisLeft={{
                        tickSize: 0,
                        tickPadding: 12,
                        legend: 'Score',
                        legendPosition: 'middle',
                        legendOffset: -50,
                        format: v => Math.round(v),
                        tickValues: [0, 20, 40, 60, 80, 100],
                      }}
                      colors={["#10B981"]}
                      enablePoints={true}
                      pointSize={16}
                      pointColor="#10B981"
                      pointBorderWidth={5}
                      pointBorderColor={{ from: 'serieColor' }}
                      enableArea={true}
                      areaOpacity={0.22}
                      isInteractive={true}
                      enableGridX={false}
                      enableGridY={true}
                      gridYValues={6}
                      lineWidth={5}
                      theme={{
                        axis: {
                          ticks: { text: { fill: chartAxisColor, fontWeight: 700 } },
                          legend: { text: { fill: chartAxisColor, fontWeight: 700, textAlign: 'center' } }
                        },
                        grid: { line: { stroke: chartGridColor, strokeWidth: 2, opacity: 0.7 } },
                        tooltip: { container: { background: '#fff', color: '#10B981', borderRadius: 10, fontSize: 16, fontWeight: 700, boxShadow: '0 2px 8px #0003', border: '1px solid #10B981' } },
                        crosshair: { line: { stroke: '#10B981', strokeWidth: 3, strokeDasharray: '4 4' } }
                      }}
                      tooltip={({ point }) => (
                        <div style={{ padding: 12, background: '#fff', color: '#10B981', borderRadius: 10, fontWeight: 700, fontSize: 16, border: '1px solid #10B981', boxShadow: '0 2px 8px #0003' }}>
                          <strong>{point.data.x}</strong>: <span style={{ color: '#10B981' }}>{point.data.y}</span>
                        </div>
                      )}
                      pointLabel="y"
                      pointLabelYOffset={-16}
                      enableSlices="x"
                    />
                  </div>
                  <div className="text-green-400 text-xs mt-2 text-center w-full">Reputation Score</div>
                </Card>
              </div>

              {/* Loan Activity Table */}
              <Card className="border-2 p-8 mt-8">
                <div className="flex flex-col items-center mb-6">
                  <div className={`${titleColor} flex items-center gap-2 mb-1 text-lg font-semibold`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Loan Activity
                  </div>
                  <div className={`${subtitleColor} text-sm`}>History of your loans</div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-center">
                    <thead>
                      <tr className={`${subtitleColor} border-b border-blue-900`}>
                        <th className="py-2 px-3 font-normal">ID</th>
                        <th className="py-2 px-3 font-normal">Date</th>
                        <th className="py-2 px-3 font-normal">Type</th>
                        <th className="py-2 px-3 font-normal">Asset</th>
                        <th className="py-2 px-3 font-normal">Amount</th>
                        <th className="py-2 px-3 font-normal">Counterparty</th>
                        <th className="py-2 px-3 font-normal">Status</th>
                        <th className="py-2 px-3 font-normal">Action</th>
                      </tr>
                    </thead>
                    <tbody className={textColor}>
                      {recentActivity.map((loan) => (
                        <tr key={loan.id} className={`border-b border-blue-900`}>
                          <td className="py-2 px-3">#{loan.id}</td>
                          <td className="py-2 px-3">{loan.date}</td>
                          <td className="py-2 px-3">
                            <span className={`${
                              loan.type === "Borrowed" ? "bg-green-700" : "bg-blue-700"
                            } text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                              {loan.type}
                            </span>
                          </td>
                          <td className="py-2 px-3 flex items-center justify-center gap-2">
                            <img src={`/images/${loan.token.toLowerCase()}-logo.png`} alt={loan.token} className="w-5 h-5" />
                            <span className="font-medium">{loan.token}</span>
                          </td>
                          <td className="py-2 px-3">{loan.amount} {loan.token}</td>
                          <td className="py-2 px-3">{loan.counterparty}</td>
                          <td className="py-2 px-3">
                            <span className={`${
                              loan.status === "Completed" ? "bg-green-900 text-green-400" :
                              loan.status === "Active" ? "bg-blue-900 text-blue-400" :
                              "bg-yellow-600 text-white"
                            } px-3 py-1 rounded-full text-xs font-semibold`}>
                              {loan.status}
                            </span>
                          </td>
                          <td className="py-2 px-3">
                            <Button 
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg"
                              onClick={() => handleViewLoan(loan)}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center mt-6">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg">View All</Button>
                </div>
              </Card>

              {/* Modal for viewing loan details */}
              <LoanViewModal 
                loan={selectedLoan}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <ProfileDashboard />
          </TabsContent>

          <TabsContent value="borrow">
            <BorrowDashboard />
          </TabsContent>

          <TabsContent value="lend">
            <LendDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
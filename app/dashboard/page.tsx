"use client"

import { useEffect, useState, Suspense } from "react"
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

function DashboardContent() {
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

    const totalValue = tokens.reduce((sum, token) => {
      const price = prices[token.symbol]?.price || 0
      return sum + (token.balance * price)
    }, 0)

    return tokens
      .filter(token => {
        const price = prices[token.symbol]?.price || 0
        return token.balance * price > 0
      })
      .map(token => {
        const price = prices[token.symbol]?.price || 0
        const value = (token.balance * price / totalValue) * 100
        
        // Cores baseadas no token
        const colors: { [key: string]: string } = {
          'SOL': '#60A5FA',
          'USDC': '#34D399',
          'USDT': '#F87171',
          'mSOL': '#8B5CF6',
          'BONK': '#FBBF24',
          'JUP': '#F59E0B'
        }
        
        return {
          id: token.symbol,
          value: Math.round(value * 100) / 100,
          color: colors[token.symbol] || '#6B7280'
        }
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold ${titleColor} mb-2`}>
            Dashboard
          </h1>
          <p className={`text-lg ${subtitleColor}`}>
            Gerencie seus empréstimos, ofertas e portfólio
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="borrow">Empréstimos</TabsTrigger>
            <TabsTrigger value="lend">Emprestar</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Available Liquidity Section */}
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className={`text-2xl font-bold ${titleColor}`}>
                  Liquidez Disponível
                </CardTitle>
                <CardDescription className={descriptionColor}>
                  Seus ativos disponíveis para empréstimos e investimentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : error ? (
                  <div className="text-red-500 text-center py-4">
                    Erro ao carregar tokens: {error}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tokens.map((token) => {
                      const price = prices[token.symbol]?.price || 0
                      const valueUSD = token.balance * price
                      const priceChange24h = prices[token.symbol]?.change24h || 0
                      
                      return (
                        <Card key={token.symbol} className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                                  {token.symbol.charAt(0)}
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  {token.symbol}
                                </span>
                              </div>
                              <Badge 
                                variant={priceChange24h >= 0 ? "default" : "destructive"}
                                className="text-xs"
                              >
                                {priceChange24h >= 0 ? '+' : ''}{priceChange24h.toFixed(2)}%
                              </Badge>
                            </div>
                            <div className="space-y-1">
                              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {token.balance.toFixed(4)}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                ${valueUSD.toFixed(2)} USD
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-500">
                                ${price.toFixed(4)} por {token.symbol}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Asset Distribution Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className={`text-xl font-bold ${titleColor}`}>
                    Distribuição de Ativos
                  </CardTitle>
                  <CardDescription className={descriptionColor}>
                    Composição do seu portfólio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsivePie
                      data={getAssetDistributionData()}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      innerRadius={0.5}
                      padAngle={0.7}
                      cornerRadius={3}
                      activeOuterRadiusOffset={8}
                      colors={{ datum: 'data.color' }}
                      borderWidth={1}
                      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                      arcLinkLabelsSkipAngle={10}
                      arcLinkLabelsTextColor={chartAxisColor}
                      arcLinkLabelsThickness={2}
                      arcLinkLabelsColor={{ from: 'color' }}
                      arcLabelsSkipAngle={10}
                      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                      legends={[
                        {
                          anchor: 'bottom',
                          direction: 'row',
                          justify: false,
                          translateX: 0,
                          translateY: 56,
                          itemsSpacing: 0,
                          itemWidth: 100,
                          itemHeight: 18,
                          itemTextColor: chartAxisColor,
                          itemDirection: 'left-to-right',
                          itemOpacity: 1,
                          symbolSize: 18,
                          symbolShape: 'circle'
                        }
                      ]}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Loan History Chart */}
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className={`text-xl font-bold ${titleColor}`}>
                    Histórico de Empréstimos
                  </CardTitle>
                  <CardDescription className={descriptionColor}>
                    Evolução dos seus empréstimos ao longo do tempo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveLine
                      data={chartData}
                      margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                      xScale={{ type: 'point' }}
                      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                      axisTop={null}
                      axisRight={null}
                      axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Mês',
                        legendOffset: 36,
                        legendPosition: 'middle',
                        truncateTickAt: 0
                      }}
                      axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Valor ($)',
                        legendOffset: -40,
                        legendPosition: 'middle',
                        truncateTickAt: 0
                      }}
                      pointSize={10}
                      pointColor={{ theme: 'background' }}
                      pointBorderWidth={2}
                      pointBorderColor={{ from: 'serieColor' }}
                      pointLabelYOffset={-12}
                      useMesh={true}
                      legends={[
                        {
                          anchor: 'top',
                          direction: 'row',
                          justify: false,
                          translateX: 0,
                          translateY: -20,
                          itemsSpacing: 0,
                          itemDirection: 'left-to-right',
                          itemWidth: 80,
                          itemHeight: 20,
                          itemOpacity: 0.75,
                          symbolSize: 12,
                          symbolShape: 'circle',
                          symbolBorderColor: 'rgba(0, 0, 0, .5)',
                          effects: [
                            {
                              on: 'hover',
                              style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                              }
                            }
                          ]
                        }
                      ]}
                      theme={{
                        axis: {
                          domain: {
                            line: {
                              stroke: chartGridColor,
                              strokeWidth: 1
                            }
                          },
                          ticks: {
                            line: {
                              stroke: chartGridColor,
                              strokeWidth: 1
                            },
                            text: {
                              fill: chartAxisColor,
                              fontSize: 12
                            }
                          },
                          legend: {
                            text: {
                              fill: chartAxisColor,
                              fontSize: 12,
                              fontWeight: 'bold'
                            }
                          }
                        },
                        grid: {
                          line: {
                            stroke: chartGridColor,
                            strokeWidth: 1
                          }
                        },
                        legends: {
                          text: {
                            fill: chartAxisColor,
                            fontSize: 12
                          }
                        },
                        tooltip: {
                          container: {
                            background: theme === 'dark' ? '#374151' : '#ffffff',
                            color: theme === 'dark' ? '#ffffff' : '#000000',
                            fontSize: 12,
                            borderRadius: 8,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Loan Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Total Emprestado</p>
                      <p className="text-2xl font-bold">${loanSummary.totalBorrowed}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Total Emprestado</p>
                      <p className="text-2xl font-bold">${loanSummary.totalLent}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Empréstimos Ativos</p>
                      <p className="text-2xl font-bold">{loanSummary.activeLoans}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-400/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">Taxa Média</p>
                      <p className="text-2xl font-bold">{loanSummary.avgInterestRate}%</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-400/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className={`text-xl font-bold ${titleColor}`}>
                  Atividade Recente
                </CardTitle>
                <CardDescription className={descriptionColor}>
                  Suas transações mais recentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'Borrowed' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-green-100 dark:bg-green-900'
                        }`}>
                          <svg className={`w-5 h-5 ${
                            activity.type === 'Borrowed' ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {activity.type} {activity.amount} {activity.token}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {activity.date} • {activity.counterparty}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={activity.status === 'Completed' ? 'default' : activity.status === 'Active' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {activity.status}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewLoan(activity)}
                          className="text-xs"
                        >
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Borrow Tab */}
          <TabsContent value="borrow">
            <BorrowDashboard />
          </TabsContent>

          {/* Lend Tab */}
          <TabsContent value="lend">
            <LendDashboard />
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <ProfileDashboard />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className={`text-xl font-bold ${titleColor}`}>
                  Configurações da Conta
                </CardTitle>
                <CardDescription className={descriptionColor}>
                  Gerencie suas preferências e configurações de segurança
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Notificações por Email</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receba notificações sobre seus empréstimos
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Notificações Push</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receba notificações em tempo real
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Autenticação de Dois Fatores</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Adicione uma camada extra de segurança
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className={`text-xl font-bold ${titleColor}`}>
                  Preferências de Empréstimo
                </CardTitle>
                <CardDescription className={descriptionColor}>
                  Configure suas preferências para empréstimos automáticos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minAmount">Valor Mínimo de Empréstimo</Label>
                    <Input id="minAmount" type="number" placeholder="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxAmount">Valor Máximo de Empréstimo</Label>
                    <Input id="maxAmount" type="number" placeholder="10000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minAPR">APR Mínimo (%)</Label>
                    <Input id="minAPR" type="number" placeholder="5.0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxDuration">Duração Máxima (dias)</Label>
                    <Input id="maxDuration" type="number" placeholder="90" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição do Perfil</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Descreva seu perfil de investimento e preferências..."
                    rows={4}
                  />
                </div>
                <Button className="w-full">
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Loan View Modal */}
      {selectedLoan && (
        <LoanViewModal
          loan={selectedLoan}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
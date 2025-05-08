"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { useWalletTokens } from "@/hooks/useWalletTokens"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ResponsiveLine } from "@nivo/line"
import { useSearchParams } from "next/navigation"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
    type: "Borrowed",
    amount: 500,
    token: "SOL",
    date: "2024-05-01",
    status: "Active",
  },
  {
    type: "Lent",
    amount: 1000,
    token: "USDC",
    date: "2024-04-28",
    status: "Active",
  },
  {
    type: "Repaid",
    amount: 300,
    token: "SOL",
    date: "2024-04-25",
    status: "Completed",
  },
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
  const tab = searchParams.get("tab") || "overview"
  const [activeTab, setActiveTab] = useState("profile")
  const { theme } = useTheme()
  const { tokens, isLoading, error } = useWalletTokens()

  const [chartData, setChartData] = useState(loanHistory)

  useEffect(() => {
    const colors = theme === "dark" ? ["#60A5FA", "#34D399"] : ["#2563EB", "#059669"]
    setChartData(
      loanHistory.map((series, i) => ({
        ...series,
        color: colors[i],
      }))
    )
  }, [theme, activeTab])

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

        <Tabs defaultValue={tab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6">
              <h2 className="text-2xl font-semibold">Visão Geral</h2>
              <div className="grid gap-4 lg:grid-cols-3">
                <Card className="lg:col-span-1 border-2">
                  <CardHeader className="pb-2">
                    <CardTitle>Resumo dos Empréstimos</CardTitle>
                    <CardDescription>
                      Seus empréstimos e investimentos ativos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Emprestado:</span>
                        <span className="font-medium">{loanSummary.totalBorrowed} SOL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Investido:</span>
                        <span className="font-medium">{loanSummary.totalLent} SOL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Empréstimos Ativos:</span>
                        <span className="font-medium">{loanSummary.activeLoans}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Taxa Média:</span>
                        <span className="font-medium">{loanSummary.avgInterestRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duração Média:</span>
                        <span className="font-medium">{loanSummary.avgDuration} dias</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2 border-2">
                  <CardHeader className="pb-2">
                    <CardTitle>Histórico de Empréstimos</CardTitle>
                    <CardDescription>
                      Valores emprestados e investidos ao longo do tempo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveLine
                        data={chartData}
                        margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
                        xScale={{ type: "point" }}
                        yScale={{ type: "linear", min: 0, max: "auto" }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                        }}
                        axisLeft={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                        }}
                        enablePoints={true}
                        pointSize={8}
                        pointColor={{ theme: "background" }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: "serieColor" }}
                        enableArea={true}
                        areaOpacity={0.15}
                        useMesh={true}
                        legends={[
                          {
                            anchor: "bottom",
                            direction: "row",
                            justify: false,
                            translateX: 0,
                            translateY: 40,
                            itemsSpacing: 0,
                            itemDirection: "left-to-right",
                            itemWidth: 80,
                            itemHeight: 20,
                            symbolSize: 12,
                            symbolShape: "circle",
                          },
                        ]}
                        theme={{
                          axis: {
                            ticks: {
                              text: {
                                fill: theme === "dark" ? "#9CA3AF" : "#4B5563",
                              },
                            },
                          },
                          grid: {
                            line: {
                              stroke: theme === "dark" ? "#374151" : "#E5E7EB",
                            },
                          },
                          legends: {
                            text: {
                              fill: theme === "dark" ? "#9CA3AF" : "#4B5563",
                            },
                          },
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-3 border-2">
                  <CardHeader className="pb-2">
                    <CardTitle>Atividade Recente</CardTitle>
                    <CardDescription>
                      Últimas transações e atualizações
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`h-2 w-2 rounded-full ${
                                activity.status === "Active"
                                  ? "bg-green-500"
                                  : "bg-blue-500"
                              }`}
                            />
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">
                                {activity.type}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {activity.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="text-sm font-medium">
                              {activity.amount} {activity.token}
                            </p>
                            <Badge
                              variant={
                                activity.status === "Active"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {activity.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="grid gap-6">
              <h2 className="text-2xl font-semibold">Perfil</h2>
              <div className="grid gap-4">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Informações do Perfil</CardTitle>
                    <CardDescription>
                      Atualize suas informações pessoais
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" placeholder="Conte um pouco sobre você" />
                    </div>
                    <Button>Salvar Alterações</Button>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Suas Conquistas</CardTitle>
                    <CardDescription>
                      Badges e conquistas na plataforma
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {badges.map((badge, index) => (
                        <Card key={index} className="border">
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={badge.variant}
                                className={badge.className}
                              >
                                Concedido
                              </Badge>
                              <CardTitle className="text-lg">
                                {badge.title}
                              </CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              {badge.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid gap-6">
              <h2 className="text-2xl font-semibold">Configurações</h2>
              <div className="grid gap-4">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Preferências</CardTitle>
                    <CardDescription>
                      Gerencie suas preferências na plataforma
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificações por Email</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba atualizações sobre seus empréstimos
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificações Push</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações em tempo real
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Segurança</CardTitle>
                    <CardDescription>
                      Gerencie suas configurações de segurança
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Autenticação em Duas Etapas</Label>
                        <p className="text-sm text-muted-foreground">
                          Adicione uma camada extra de segurança
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Endereços IP Confiáveis</Label>
                      <Textarea placeholder="Digite os endereços IP (um por linha)" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
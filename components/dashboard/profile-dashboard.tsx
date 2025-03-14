"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, Shield, Star, Trophy, Users } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

export default function ProfileDashboard() {
  const { publicKey } = useWallet()
  
  // Função para formatar o endereço da carteira (mostrar início e fim)
  const formatAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <TooltipProvider>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/images/surfer-png.png" alt="Web 3 Surfer Profile" />
                  <AvatarFallback>WS</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="dark:text-white flex items-center gap-2">
                    Web 3 Surfer
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Verified</Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Verified user with KYC.</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">@w3_surfer</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium dark:text-white">Reputation Score</span>
                  <span className="text-sm font-medium dark:text-white">92/100</span>
                </div>
                <Progress value={92} className="h-2 bg-gray-200 dark:bg-gray-700">
                  <div className="h-full bg-blue-600" style={{ width: '92%' }} />
                </Progress>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground dark:text-gray-400">Wallet Address</span>
                  <p className="text-sm font-medium dark:text-white">{publicKey ? formatAddress(publicKey.toBase58()) : "Not connected"}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground dark:text-gray-400">Total Transactions</span>
                  <p className="text-sm font-medium dark:text-white">47</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground dark:text-gray-400">Loans Repaid</span>
                  <p className="text-sm font-medium dark:text-white">12</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground dark:text-gray-400">Default Rate</span>
                  <p className="text-sm font-medium dark:text-white">0%</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full bg-blue-600 text-white hover:bg-blue-700 border-blue-600">
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Tabs defaultValue="achievements">
            <TabsList className="grid w-full grid-cols-4 bg-muted">
              <TabsTrigger 
                value="achievements" 
                className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:text-white"
              >
                Achievements
              </TabsTrigger>
              <TabsTrigger 
                value="reputation" 
                className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:text-white"
              >
                Reputation
              </TabsTrigger>
              <TabsTrigger 
                value="social" 
                className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:text-white"
              >
                Social
              </TabsTrigger>
              <TabsTrigger 
                value="referral" 
                className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:text-white"
              >
                Referral
              </TabsTrigger>
            </TabsList>
            <TabsContent value="achievements" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="dark:text-white">Achievements</CardTitle>
                  <CardDescription className="dark:text-gray-400">Badges and achievements you've earned on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                      <Trophy className="h-8 w-8 text-blue-600" />
                      <span className="text-sm font-medium dark:text-white">Early Adopter</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                      <CheckCircle className="h-8 w-8 text-blue-600" />
                      <span className="text-sm font-medium dark:text-white">Perfect Repayment</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                      <Star className="h-8 w-8 text-blue-600" />
                      <span className="text-sm font-medium dark:text-white">Top Lender</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                      <Shield className="h-8 w-8 text-blue-600" />
                      <span className="text-sm font-medium dark:text-white">Trusted Borrower</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="dark:text-white">Lending History</CardTitle>
                  <CardDescription className="dark:text-gray-400">Your lending activity over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground dark:text-gray-400">Lending activity chart would appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reputation" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="dark:text-white">Reputation Factors</CardTitle>
                  <CardDescription className="dark:text-gray-400">Factors that contribute to your reputation score</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium dark:text-white">Repayment History</span>
                      <span className="text-sm font-medium dark:text-white">100/100</span>
                    </div>
                    <Progress value={100} className="h-2 bg-gray-200 dark:bg-gray-700">
                      <div className="h-full bg-blue-600" style={{ width: '100%' }} />
                    </Progress>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium dark:text-white">Transaction Volume</span>
                      <span className="text-sm font-medium dark:text-white">85/100</span>
                    </div>
                    <Progress value={85} className="h-2 bg-gray-200 dark:bg-gray-700">
                      <div className="h-full bg-blue-600" style={{ width: '85%' }} />
                    </Progress>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium dark:text-white">Account Age</span>
                      <span className="text-sm font-medium dark:text-white">70/100</span>
                    </div>
                    <Progress value={70} className="h-2 bg-gray-200 dark:bg-gray-700">
                      <div className="h-full bg-blue-600" style={{ width: '70%' }} />
                    </Progress>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium dark:text-white">Community Engagement</span>
                      <span className="text-sm font-medium dark:text-white">95/100</span>
                    </div>
                    <Progress value={95} className="h-2 bg-gray-200 dark:bg-gray-700">
                      <div className="h-full bg-blue-600" style={{ width: '95%' }} />
                    </Progress>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Reputation Growth</CardTitle>
                  <CardDescription>How your reputation has grown over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Reputation growth chart would appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="social" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="dark:text-white">Social Connections</CardTitle>
                  <CardDescription className="dark:text-gray-400">Your network on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback>AB</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium dark:text-white">Alice Brown</p>
                        <p className="text-xs text-muted-foreground dark:text-gray-400">5 mutual transactions</p>
                      </div>
                      <Badge className="bg-blue-600 text-white">Connected</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback>MS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium dark:text-white">Mike Smith</p>
                        <p className="text-xs text-muted-foreground dark:text-gray-400">3 mutual transactions</p>
                      </div>
                      <Badge className="bg-blue-600 text-white">Connected</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback>JW</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium dark:text-white">Jane Wilson</p>
                        <p className="text-xs text-muted-foreground dark:text-gray-400">2 mutual transactions</p>
                      </div>
                      <Button size="sm" variant="outline" className="ml-auto bg-blue-600 text-white hover:bg-blue-700">
                        Connect
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <Users className="mr-2 h-4 w-4 text-white" />
                    Find More Connections
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="dark:text-white">Community Activity</CardTitle>
                  <CardDescription className="dark:text-gray-400">Your participation in the platform community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <p className="text-sm font-medium dark:text-white">Forum Posts</p>
                      <p className="text-2xl font-bold dark:text-white">12</p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <p className="text-sm font-medium dark:text-white">Governance Votes</p>
                      <p className="text-2xl font-bold dark:text-white">8</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="referral" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="dark:text-white">Referral Program</CardTitle>
                  <CardDescription className="dark:text-gray-400">Invite friends and earn rewards when they join AGIO NETWORK</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Your Referral Code</Label>
                      <div className="flex items-center gap-2">
                        <Input value={"AGIO-" + Math.random().toString(36).substring(7).toUpperCase()} readOnly className="h-8 text-sm" />
                        <Button className="h-8 text-sm px-3 bg-blue-600 hover:bg-blue-700 text-white">Copy</Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-sm text-muted-foreground dark:text-gray-400">Invited Users</span>
                        <p className="text-lg font-semibold dark:text-white">10</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-sm text-muted-foreground dark:text-gray-400">Rewards Earned</span>
                        <p className="text-lg font-semibold dark:text-white">50 SOL</p>
                      </div>
                    </div>
                    
                    <Button className="w-full h-8 text-sm bg-blue-600 hover:bg-blue-700 text-white">Share Referral Link</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  )
}


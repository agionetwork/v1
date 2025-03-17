"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, Shield, Star, Trophy, Users, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { useState } from "react"

export default function ProfileDashboard() {
  const { publicKey } = useWallet()
  const [profileName, setProfileName] = useState("Web 3 Surfer")
  const [profileImage, setProfileImage] = useState("/images/surfer-pfp.png")
  
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
                  <AvatarImage src={profileImage} alt="Web 3 Surfer Profile" />
                  <AvatarFallback>WS</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="dark:text-white flex items-center gap-2">
                    {profileName}
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full bg-blue-600 text-white hover:bg-blue-700 border-blue-600">
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profileImage} alt="Profile" />
                        <AvatarFallback>PFP</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Upload Image
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter className="flex justify-center gap-2">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Tabs defaultValue="badges">
            <TabsList className="grid w-full grid-cols-4 bg-muted">
              <TabsTrigger 
                value="badges" 
                className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:text-white"
              >
                Badges
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
            <TabsContent value="badges" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="dark:text-white">Badges</CardTitle>
                  <CardDescription className="dark:text-gray-400">Badges and conquistas you've earned on the platform</CardDescription>
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

              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium dark:text-white">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-blue-500" />
                      Leaderboard
                    </div>
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Your position in the platform's reputation ranking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/20 rounded-md">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-yellow-500">1</Badge>
                        <span className="dark:text-white">Xp9TrQm...bF7Vy</span>
                      </div>
                      <Badge className="bg-green-500 text-white">99/100</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-muted/20 rounded-md">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-yellow-500">2</Badge>
                        <span className="dark:text-white">Rt7PqLm...kN3Zx</span>
                      </div>
                      <Badge className="bg-green-500 text-white">98/100</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-blue-500/10 border-2 border-blue-500 rounded-md">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-green-500">3</Badge>
                        <span className="font-bold dark:text-white">You</span>
                      </div>
                      <Badge className="bg-green-500 text-white">95/100</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="social" className="mt-4">
              <div className="grid grid-cols-1 gap-4">
                <Card className="h-[300px]">
                  <CardHeader className="pb-2">
                    <CardTitle className="dark:text-white">Community Activity</CardTitle>
                    <CardDescription className="dark:text-gray-400 text-xs">Your participation in the platform</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="space-y-4 flex flex-col items-center">
                      <div className="rounded-lg border p-3 w-3/5 text-center">
                        <p className="text-sm font-medium dark:text-white">Forum Posts</p>
                        <p className="text-xl font-bold dark:text-white">12</p>
                      </div>
                      <div className="rounded-lg border p-3 w-3/5 text-center">
                        <p className="text-sm font-medium dark:text-white">Governance Votes</p>
                        <p className="text-xl font-bold dark:text-white">8</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="referral" className="mt-4 space-y-4">
              <Card className="w-full">
                <CardHeader className="py-3 text-center">
                  <CardTitle className="dark:text-white">Referral Program</CardTitle>
                  <CardDescription className="dark:text-gray-400 text-xs">Invite friends and earn rewards when they join AGIO NETWORK</CardDescription>
                </CardHeader>
                <CardContent className="py-2 flex justify-center">
                  <div className="space-y-3 max-w-md w-full">
                    <div className="space-y-1 flex flex-col items-center">
                      <Label className="text-xs">Your Referral Code</Label>
                      <div className="flex items-center gap-1 w-3/5">
                        <Input value={"AGIO-" + Math.random().toString(36).substring(7).toUpperCase()} readOnly className="h-7 text-xs" />
                        <Button className="h-7 text-xs px-2 bg-blue-600 hover:bg-blue-700 text-white">Copy</Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-0 text-center">
                        <span className="text-xs text-muted-foreground dark:text-gray-400">Invited Users</span>
                        <p className="text-base font-semibold dark:text-white">10</p>
                      </div>
                      <div className="space-y-0 text-center">
                        <span className="text-xs text-muted-foreground dark:text-gray-400">Rewards Earned</span>
                        <p className="text-base font-semibold dark:text-white">50 SOL</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button className="w-3/5 h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white">Share Referral Link</Button>
                    </div>
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


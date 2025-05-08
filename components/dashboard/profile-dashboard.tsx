"use client"

<<<<<<< HEAD
import { useUser } from "@civic/auth-web3/react"
=======
import { useWallet } from "@solana/wallet-adapter-react"
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
<<<<<<< HEAD
import { CheckCircle, Shield, Star, Trophy, Users, X, Award, Heart, Share2, Gift, Pencil } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import React from "react"

export default function ProfileDashboard() {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("badges")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [displayName, setDisplayName] = useState<string>(user?.name?.toString() || "")
  const [nickname, setNickname] = useState<string>(user?.nickname?.toString() || "")
  const [bio, setBio] = useState<string>(user?.bio?.toString() || "")
  const [profileImage, setProfileImage] = useState<string>("/placeholder.svg")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleSaveProfile = () => {
    // Aqui seria implementada a lógica para salvar as alterações do perfil
    console.log("Salvando perfil:", { displayName, nickname, bio, profileImage })
    setIsEditModalOpen(false)
  }

  const handleDiscardChanges = () => {
    // Restaurar valores originais
    setDisplayName(user?.name?.toString() || "")
    setNickname(user?.nickname?.toString() || "")
    setBio(user?.bio?.toString() || "")
    setProfileImage("/placeholder.svg")
    setIsEditModalOpen(false)
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        setIsUploading(true)
        const reader = new FileReader()
        reader.onloadend = () => {
          setProfileImage(reader.result as string)
          setIsUploading(false)
        }
        reader.readAsDataURL(file)
      } catch (error) {
        console.error('Erro ao carregar imagem:', error)
        setIsUploading(false)
      }
    }
  }

  const handlePhotoClick = () => {
    fileInputRef.current?.click()
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg text-muted-foreground">Please connect your wallet to view your profile</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Menu Lateral - Perfil */}
      <div className="w-full md:w-64">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profileImage} alt={displayName || "User"} />
                <AvatarFallback>{displayName?.slice(0, 2) || "UN"}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{displayName || "Anonymous User"}</h2>
                <p className="text-xs text-muted-foreground">{nickname || "@user"}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile information here.
=======
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
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-center gap-4">
<<<<<<< HEAD
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={profileImage} alt={displayName || "User"} />
                          <AvatarFallback>{displayName?.slice(0, 2) || "UN"}</AvatarFallback>
                        </Avatar>
                        {isUploading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handlePhotoClick}
                        disabled={isUploading}
                      >
                        {isUploading ? "Uploading..." : "Change Photo"}
                      </Button>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Your display name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="nickname">Nickname (@handle)</Label>
                      <Input
                        id="nickname"
                        value={nickname}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
                        placeholder="@yourhandle"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
                        placeholder="Tell us about yourself"
                        className="h-24"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={handleDiscardChanges}>
                      Discard
                    </Button>
                    <Button onClick={handleSaveProfile}>
                      Save
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Reputation Score</span>
                <Badge className="bg-green-500">850</Badge>
              </div>
              <Progress value={85} className="h-2" />
              
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-2xl font-bold">47</div>
                  <div className="text-xs text-muted-foreground">Total Transactions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs text-muted-foreground">Loans Repaid</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">0%</div>
                  <div className="text-xs text-muted-foreground">Default Rate</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1">
        <Card>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <CardHeader className="pb-2">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="badges" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  <Award className="h-4 w-4" />
                  Badges
                </TabsTrigger>
                <TabsTrigger value="reputation" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  <Star className="h-4 w-4" />
                  Reputation
                </TabsTrigger>
                <TabsTrigger value="social" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  <Users className="h-4 w-4" />
                  Social
                </TabsTrigger>
                <TabsTrigger value="referral" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  <Gift className="h-4 w-4" />
                  Referral
                </TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="pt-6">
              <TabsContent value="badges" className="mt-0">
                <div className="grid gap-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-blue-500" />
                        <CardTitle>Security Expert</CardTitle>
                      </div>
                      <CardDescription>You are a security expert on the platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="default" className="bg-blue-500">Granted</Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-blue-500" />
                        <CardTitle>Trusted Lender</CardTitle>
                      </div>
                      <CardDescription>You are a trusted lender on the platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="default" className="bg-blue-500">Granted</Badge>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="reputation" className="mt-0">
                <div className="space-y-6">
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <div className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                      <Progress 
                        value={85} 
                        className={`h-32 w-32 rounded-full ${
                          850 >= 800 ? "bg-green-500" : 
                          850 >= 500 ? "bg-yellow-500" : 
                          850 >= 200 ? "bg-orange-500" : 
                          "bg-red-500"
                        }`} 
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold">850</div>
                          <div className="text-xs text-muted-foreground">/1000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium">Payment History</span>
                        </div>
                        <span className="text-sm text-muted-foreground">95%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium">Network Quality</span>
                        </div>
                        <span className="text-sm text-muted-foreground">80%</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Trophy className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">Activity Level</span>
                        </div>
                        <span className="text-sm text-muted-foreground">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="social" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Alice Brown</p>
                      <p className="text-xs text-muted-foreground">5 mutual transactions</p>
                    </div>
                    <Badge className="bg-blue-600 text-white text-xs ml-auto">Connected</Badge>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>MS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Mike Smith</p>
                      <p className="text-xs text-muted-foreground">3 mutual transactions</p>
                    </div>
                    <Badge className="bg-blue-600 text-white text-xs ml-auto">Connected</Badge>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>JW</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Jane Wilson</p>
                      <p className="text-xs text-muted-foreground">2 mutual transactions</p>
                    </div>
                    <Button size="sm" variant="outline" className="ml-auto h-7 text-xs bg-blue-600 text-white hover:bg-blue-700">
                      Connect
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="referral" className="mt-0">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">Total Referrals</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">5</p>
                      <p className="text-sm text-muted-foreground">Active Users</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">$120</p>
                      <p className="text-sm text-muted-foreground">Earned</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="referral-link">Your Referral Link</Label>
                    <div className="flex gap-2">
                      <Input id="referral-link" value="https://agionetwork.com/ref/user123" readOnly />
                      <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Share Your Link</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Share2 className="mr-2 h-4 w-4" />
                        Twitter
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Share2 className="mr-2 h-4 w-4" />
                        Telegram
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
=======
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
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
  )
}


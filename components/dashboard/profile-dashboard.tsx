"use client"

import { useUser } from "@civic/auth-web3/react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, Shield, Star, Trophy, Users, X, Award, Heart, Share2, Gift, Pencil } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import React from "react"

export default function ProfileDashboard() {
  const { user } = useUser()
  const { publicKey } = useWallet()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("badges")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [displayName, setDisplayName] = useState<string>(user?.name?.toString() || "Web 3 Surfer")
  const [nickname, setNickname] = useState<string>(user?.nickname?.toString() || "@w3_surfer")
  const [bio, setBio] = useState<string>(user?.bio?.toString() || "")
  const [profileImage, setProfileImage] = useState<string>("/images/surfer-pfp.png")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // Função para formatar o endereço da carteira
  const formatAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  const handleSaveProfile = () => {
    // Aqui seria implementada a lógica para salvar as alterações do perfil
    console.log("Salvando perfil:", { displayName, nickname, bio, profileImage })
    setIsEditModalOpen(false)
  }

  const handleDiscardChanges = () => {
    // Restaurar valores originais
    setDisplayName(user?.name?.toString() || "Web 3 Surfer")
    setNickname(user?.nickname?.toString() || "@w3_surfer")
    setBio(user?.bio?.toString() || "")
    setProfileImage("/images/surfer-pfp.png")
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

  if (!user && !publicKey) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg text-muted-foreground">Please connect your wallet to view your profile</p>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profileImage} alt={displayName || "User"} />
                  <AvatarFallback>{displayName?.slice(0, 2) || "WS"}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="dark:text-white flex items-center gap-2">
                    {displayName}
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Verified</Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Verified user with KYC.</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">{nickname}</CardDescription>
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
              <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
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
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="nickname">Nickname</Label>
                      <Input
                        id="nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Profile Picture</Label>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={profileImage} alt={displayName} />
                          <AvatarFallback>{displayName?.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <Button
                          variant="outline"
                          onClick={handlePhotoClick}
                          disabled={isUploading}
                        >
                          {isUploading ? "Uploading..." : "Change Photo"}
                        </Button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={handleDiscardChanges}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfile}>
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}


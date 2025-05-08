import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, VideoIcon, TrendingUp, Calendar, ChevronDown, Users } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function SocialFiPage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-3xl font-bold tracking-tight">SocialFi</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="w-full cursor-pointer">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/borrow-lend" className="w-full cursor-pointer">Borrow / Lend</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/loan-offers/marketplace" className="w-full cursor-pointer">Loan Offers</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/socialfi" className="w-full cursor-pointer">SocialFi</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feed Principal e Área de Criação de Post */}
        <div className="md:col-span-2 space-y-6">
          {/* Área de Criação de Post */}
          <Card>
            <CardHeader>
              <CardTitle>Create Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <Textarea placeholder="What's on your mind?" className="min-h-[100px]" />
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" className="flex items-center">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Add Image
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <VideoIcon className="w-4 h-4 mr-2" />
                      Add Video
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Post</Button>
            </CardFooter>
          </Card>

          {/* Feed de Posts */}
          <div className="space-y-6">
            {/* Post 1 */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">John Doe</CardTitle>
                    <CardDescription>2 hours ago</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Just completed my first loan on AGIO Network! The process was smooth and efficient. #DeFi #Lending</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm">Like</Button>
                  <Button variant="ghost" size="sm">Comment</Button>
                  <Button variant="ghost" size="sm">Share</Button>
                </div>
              </CardFooter>
            </Card>

            {/* Post 2 */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">Alice Smith</CardTitle>
                    <CardDescription>5 hours ago</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Excited to share my latest lending strategy on AGIO. Check out my portfolio performance! 📈 #CryptoLending #DeFi</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm">Like</Button>
                  <Button variant="ghost" size="sm">Comment</Button>
                  <Button variant="ghost" size="sm">Share</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Sidebar - Trending e Events */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">#DeFiLending</p>
                  <p className="text-sm text-muted-foreground">2.5k posts</p>
                </div>
                <div>
                  <p className="font-medium">#AGIONetwork</p>
                  <p className="text-sm text-muted-foreground">1.8k posts</p>
                </div>
                <div>
                  <p className="font-medium">#CryptoLoans</p>
                  <p className="text-sm text-muted-foreground">1.2k posts</p>
                </div>
                <div>
                  <p className="font-medium">#SolanaDeFi</p>
                  <p className="text-sm text-muted-foreground">950 posts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="font-medium">DeFi Lending Workshop</p>
                  <p className="text-sm text-muted-foreground">Apr 15, 2024 • Virtual</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-2">Register Now</Button>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">AGIO Community Call</p>
                  <p className="text-sm text-muted-foreground">Apr 20, 2024 • Online</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-2">Register Now</Button>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Crypto Lending Summit</p>
                  <p className="text-sm text-muted-foreground">May 5, 2024 • Miami</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-2">Register Now</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Events</Button>
            </CardFooter>
          </Card>
          
          {/* Social Connections */}
          <Card className="overflow-auto">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Social Connections
              </CardTitle>
              <CardDescription className="text-xs">Your network on the platform</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Alice Brown</p>
                    <p className="text-xs text-muted-foreground">5 mutual transactions</p>
                  </div>
                  <Badge className="bg-blue-600 text-white text-xs ml-auto">Connected</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Mike Smith</p>
                    <p className="text-xs text-muted-foreground">3 mutual transactions</p>
                  </div>
                  <Badge className="bg-blue-600 text-white text-xs ml-auto">Connected</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
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
            </CardContent>
            <CardFooter className="pt-0">
              <Button
                variant="outline"
                size="sm"
                className="w-full h-7 text-xs bg-blue-600 text-white hover:bg-blue-700"
              >
                <Users className="mr-1 h-3 w-3 text-white" />
                Find More Connections
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
} 
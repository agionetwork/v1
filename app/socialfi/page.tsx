import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, VideoIcon, TrendingUp, Calendar } from "lucide-react"

export default function SocialFiPage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">SocialFi</h2>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Register Now</Button>
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
              <div className="space-y-4">
                <div>
                  <p className="font-medium">DeFi Lending Workshop</p>
                  <p className="text-sm text-muted-foreground">Apr 15, 2024 • Virtual</p>
                </div>
                <div>
                  <p className="font-medium">AGIO Community Call</p>
                  <p className="text-sm text-muted-foreground">Apr 20, 2024 • Online</p>
                </div>
                <div>
                  <p className="font-medium">Crypto Lending Summit</p>
                  <p className="text-sm text-muted-foreground">May 5, 2024 • Miami</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Events</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
} 
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Image as ImageIcon, Video, BarChart2, Heart, Share2, Bookmark, MessageCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/95">
      <DashboardHeader />
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/50 to-background/95" />
        <main className="container relative mx-auto p-6">
          <div className="rounded-xl border bg-card p-8 shadow-lg backdrop-blur-sm">
            <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
              <div className="space-y-6">
                <div className="flex flex-col space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight">Community</h1>
                  <p className="text-muted-foreground">
                    Connect with other users, share insights, and build your reputation.
                  </p>
                </div>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-4">
                        <Textarea placeholder="Share your thoughts..." className="min-h-[100px] resize-none" />
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                              <ImageIcon className="h-5 w-5 mr-1" />
                              Image
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                              <Video className="h-5 w-5 mr-1" />
                              Video
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                              <BarChart2 className="h-5 w-5 mr-1" />
                              Poll
                            </Button>
                          </div>
                          <Button className="bg-blue-500 hover:bg-blue-600">Post</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" alt="Alice" />
                          <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">Alice</div>
                          <div className="text-sm text-muted-foreground">7fgX...j9Yk</div>
                        </div>
                        <div className="ml-auto text-sm text-muted-foreground">2h ago</div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-base">Just lent 1000 SOL on AGIO platform. The experience was amazing! 🚀</p>
                      <div className="flex items-center gap-4 pt-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                          <Heart className="h-4 w-4 mr-1" />
                          245
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          56
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                          <Share2 className="h-4 w-4 mr-1" />
                          12
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary ml-auto">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" alt="Bob" />
                          <AvatarFallback>B</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">Bob</div>
                          <div className="text-sm text-muted-foreground">3hKp...m2Wx</div>
                        </div>
                        <div className="ml-auto text-sm text-muted-foreground">4h ago</div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-base">Can someone explain how the reputation system works? Thinking about starting to lend.</p>
                      <div className="flex items-center gap-4 pt-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                          <Heart className="h-4 w-4 mr-1" />
                          132
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          89
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                          <Share2 className="h-4 w-4 mr-1" />
                          8
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary ml-auto">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Trending Topics</CardTitle>
                    <CardDescription>What people are talking about</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-twitter" />
                          <span className="font-medium">#SolanaLend</span>
                        </div>
                        <span className="text-xs text-muted-foreground">2.5K posts</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-twitter" />
                          <span className="font-medium">#DeFi</span>
                        </div>
                        <span className="text-xs text-muted-foreground">1.8K posts</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-twitter" />
                          <span className="font-medium">#SocialFi</span>
                        </div>
                        <span className="text-xs text-muted-foreground">1.2K posts</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-twitter" />
                          <span className="font-medium">#SOL</span>
                        </div>
                        <span className="text-xs text-muted-foreground">950 posts</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Lenders</CardTitle>
                    <CardDescription>Users with highest lending volume</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">$120K+ lent</p>
                      </div>
                      <Badge className="ml-auto bg-twitter">95/100</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback>AB</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Alice Brown</p>
                        <p className="text-xs text-muted-foreground">$95K+ lent</p>
                      </div>
                      <Badge className="ml-auto bg-twitter">92/100</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback>MS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Mike Smith</p>
                        <p className="text-xs text-muted-foreground">$82K+ lent</p>
                      </div>
                      <Badge className="ml-auto bg-twitter">90/100</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Community Events</CardTitle>
                    <CardDescription>Upcoming events and webinars</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">DeFi on Solana Workshop</p>
                      <p className="text-xs text-muted-foreground">March 15, 2025 • 2:00 PM UTC</p>
                      <Button className="w-full bg-blue-500 hover:bg-blue-600">
                        Register
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">SocialFi Meetup</p>
                      <p className="text-xs text-muted-foreground">March 22, 2025 • 6:00 PM UTC</p>
                      <Button className="w-full bg-blue-500 hover:bg-blue-600">
                        Register
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

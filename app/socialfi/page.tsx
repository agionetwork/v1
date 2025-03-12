import DashboardHeader from "@/components/dashboard/dashboard-header"
import SocialFeed from "@/components/social-feed"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <div className="space-y-6">
              <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-linkedin dark:text-white">Community</h1>
                <p className="text-muted-foreground dark:text-white">
                  Connect with other users, share insights, and build your reputation.
                </p>
              </div>

              <SocialFeed />
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="dark:text-white">Trending Topics</CardTitle>
                  <CardDescription className="dark:text-white">What people are talking about</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-twitter dark:text-white" />
                        <span className="font-medium dark:text-white">#SolanaLend</span>
                      </div>
                      <span className="text-xs text-muted-foreground dark:text-white">2.5K posts</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-twitter dark:text-white" />
                        <span className="font-medium dark:text-white">#DeFi</span>
                      </div>
                      <span className="text-xs text-muted-foreground dark:text-white">1.8K posts</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-twitter dark:text-white" />
                        <span className="font-medium dark:text-white">#SocialFi</span>
                      </div>
                      <span className="text-xs text-muted-foreground dark:text-white">1.2K posts</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-twitter dark:text-white" />
                        <span className="font-medium dark:text-white">#SOL</span>
                      </div>
                      <span className="text-xs text-muted-foreground dark:text-white">950 posts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="dark:text-white">Top Lenders</CardTitle>
                  <CardDescription className="dark:text-white">Users with highest lending volume</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium dark:text-white">John Doe</p>
                      <p className="text-xs text-muted-foreground dark:text-white">$120K+ lent</p>
                    </div>
                    <Badge className="ml-auto bg-twitter">95/100</Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium dark:text-white">Alice Brown</p>
                      <p className="text-xs text-muted-foreground dark:text-white">$95K+ lent</p>
                    </div>
                    <Badge className="ml-auto bg-twitter">92/100</Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                      <AvatarFallback>MS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium dark:text-white">Mike Smith</p>
                      <p className="text-xs text-muted-foreground dark:text-white">$82K+ lent</p>
                    </div>
                    <Badge className="ml-auto bg-twitter">90/100</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="dark:text-white">Community Events</CardTitle>
                  <CardDescription className="dark:text-white">Upcoming events and webinars</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium dark:text-white">DeFi on Solana Workshop</p>
                    <p className="text-xs text-muted-foreground dark:text-white">March 15, 2025 • 2:00 PM UTC</p>
                    <Button variant="outline" className="w-full border-twitter text-twitter hover:bg-twitter/10">
                      Register
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium dark:text-white">SocialFi Meetup</p>
                    <p className="text-xs text-muted-foreground dark:text-white">March 22, 2025 • 6:00 PM UTC</p>
                    <Button variant="outline" className="w-full border-twitter text-twitter hover:bg-twitter/10">
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
  )
}


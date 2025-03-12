"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react"

export default function SocialFeed() {
  const [activeTab, setActiveTab] = useState("trending")
  const [postText, setPostText] = useState("")

  const handlePost = () => {
    console.log("Posting:", postText)
    setPostText("")
    // In a real app, this would send the post to a backend
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Input
                placeholder="Share your thoughts on the market..."
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="border-none bg-muted/50 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-between border-t pt-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Add:</span>
            <Button variant="ghost" size="sm" className="h-8 rounded-full px-3 text-xs">
              📊 Poll
            </Button>
            <Button variant="ghost" size="sm" className="h-8 rounded-full px-3 text-xs">
              📷 Image
            </Button>
            <Button variant="ghost" size="sm" className="h-8 rounded-full px-3 text-xs">
              🔗 Link
            </Button>
          </div>
          <Button
            onClick={handlePost}
            disabled={!postText.trim()}
            className="rounded-full bg-twitter hover:bg-twitter/90"
          >
            Post
          </Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
        </TabsList>
        <TabsContent value="trending" className="mt-4 space-y-4">
          <SocialPost
            user="Solana Foundation"
            handle="@SolanaFnd"
            verified={true}
            avatar="/placeholder.svg?height=40&width=40"
            content="Excited to announce our new partnership with SolanaLend to bring decentralized lending to millions of users! #Solana #DeFi"
            time="2h"
            likes={1243}
            comments={89}
            reposts={356}
          />
          <SocialPost
            user="DeFi Daily"
            handle="@DeFiDaily"
            verified={true}
            avatar="/placeholder.svg?height=40&width=40"
            content="SolanaLend is revolutionizing P2P lending with their social reputation system. Users with high reputation scores are seeing 30% better rates! #SocialFi"
            time="5h"
            likes={892}
            comments={124}
            reposts={201}
          />
          <SocialPost
            user="Crypto Analyst"
            handle="@CryptoAnalyst"
            verified={false}
            avatar="/placeholder.svg?height=40&width=40"
            content="Just borrowed 500 SOL on SolanaLend at 3.2% APR. The process was seamless and took less than 2 minutes to complete. This is the future of lending! 🚀"
            time="1d"
            likes={456}
            comments={67}
            reposts={98}
          />
        </TabsContent>
        <TabsContent value="following" className="mt-4 space-y-4">
          <SocialPost
            user="Alice Brown"
            handle="@alice_defi"
            verified={false}
            avatar="/placeholder.svg?height=40&width=40"
            content="Just increased my reputation score to 95/100 on SolanaLend! Lower interest rates, here I come 💪"
            time="3h"
            likes={45}
            comments={12}
            reposts={5}
          />
          <SocialPost
            user="Mike Smith"
            handle="@mikesmith"
            verified={false}
            avatar="/placeholder.svg?height=40&width=40"
            content="Looking for recommendations on which tokens to lend on SolanaLend. Currently have some SOL, USDC, and RAY. What's giving the best returns?"
            time="6h"
            likes={23}
            comments={31}
            reposts={2}
          />
        </TabsContent>
        <TabsContent value="market" className="mt-4 space-y-4">
          <SocialPost
            user="Market Updates"
            handle="@MarketUpdates"
            verified={true}
            avatar="/placeholder.svg?height=40&width=40"
            content="SOL up 5.2% in the last 24 hours. Lending rates on SolanaLend for SOL have decreased to an average of 3.5% APR. Good time to borrow! 📈"
            time="1h"
            likes={324}
            comments={45}
            reposts={87}
          />
          <SocialPost
            user="DeFi Insights"
            handle="@DeFiInsights"
            verified={true}
            avatar="/placeholder.svg?height=40&width=40"
            content="Weekly lending market report: USDC remains the most borrowed asset with $12.5M in volume. RAY seeing increased demand with rates up to 7.2% for lenders. #SolanaLend"
            time="4h"
            likes={189}
            comments={32}
            reposts={56}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function SocialPost({
  user,
  handle,
  verified,
  avatar,
  content,
  time,
  likes,
  comments,
  reposts,
}: {
  user: string
  handle: string
  verified: boolean
  avatar: string
  content: string
  time: string
  likes: number
  comments: number
  reposts: number
}) {
  const [liked, setLiked] = useState(false)
  const [reposted, setReposted] = useState(false)

  return (
    <Card className="dark:bg-card">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} alt={user} />
            <AvatarFallback>{user.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-foreground dark:text-white">{user}</span>
              {verified && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-twitter">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
              <span className="text-sm">
                <span className="text-twitter">{handle}</span>
                <span className="text-muted-foreground dark:text-white"> · {time}</span>
              </span>
            </div>
            <p className="text-foreground dark:text-white text-sm">{content}</p>
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-1 text-xs dark:text-white ${liked ? "text-red-500" : ""}`}
                onClick={() => setLiked(!liked)}
              >
                <Heart className="h-4 w-4" fill={liked ? "currentColor" : "none"} />
                {liked ? likes + 1 : likes}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs dark:text-white">
                <MessageCircle className="h-4 w-4" /> {comments}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-1 text-xs dark:text-white ${reposted ? "text-green-500" : ""}`}
                onClick={() => setReposted(!reposted)}
              >
                <Repeat2 className="h-4 w-4" /> {reposted ? reposts + 1 : reposts}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs dark:text-white">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


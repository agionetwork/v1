"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Heart, Share2, MoreHorizontal } from "lucide-react"

export default function SocialFiPage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-3xl font-bold tracking-tight">SocialFi</h2>
          <Badge variant="secondary" className="text-sm">Beta</Badge>
        </div>
        <p className="text-muted-foreground mt-2">
          Connect with other users and share your DeFi journey
        </p>
      </div>

      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="feed" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src="/avatars/01.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input placeholder="Share your thoughts..." />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Post</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src="/avatars/02.png" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-base">Alice Brown</CardTitle>
                  <CardDescription>2 hours ago</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Just completed my first loan on Agio Network! The process was smooth and the rates are competitive. Highly recommend!
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    24
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    8
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="discover">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Discover content will be added here */}
          </div>
        </TabsContent>
        <TabsContent value="profile">
          <div className="space-y-6">
            {/* Profile content will be added here */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
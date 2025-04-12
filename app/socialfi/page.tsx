"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SocialFiPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Social Finance</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Reputation Score</CardTitle>
            <CardDescription>Your on-chain reputation score</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add reputation score content */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Connections</CardTitle>
            <CardDescription>Your network of borrowers and lenders</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add social connections content */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Feed</CardTitle>
            <CardDescription>Recent lending and borrowing activities</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add activity feed content */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
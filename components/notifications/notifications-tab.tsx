"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  title: string
  message: string
  type: "success" | "error" | "info"
  timestamp: Date
  read: boolean
}

export function NotificationsTab() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Loan Request Approved",
      message: "Your loan request has been approved",
      type: "success",
      timestamp: new Date(),
      read: false
    },
    {
      id: "2",
      title: "New Lending Opportunity",
      message: "New Lending Opportunity Available",
      type: "info",
      timestamp: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: "3",
      title: "Reputation Increase",
      message: "Your reputation score has increased",
      type: "success",
      timestamp: new Date(Date.now() - 7200000),
      read: false
    }
  ])

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <Icons.loan className="h-6 w-6 text-green-500" />
      case "error":
        return <Icons.solana className="h-6 w-6 text-red-500" />
      case "info":
        return <Icons.usdc className="h-6 w-6 text-blue-500" />
    }
  }

  return (
    <Card className="w-full bg-white border shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
          <span className="text-sm text-gray-500">
            {notifications.filter(n => !n.read).length} unread
          </span>
        </div>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 rounded-lg border transition-colors bg-gray-50 hover:bg-gray-100 cursor-pointer",
                  notification.read
                    ? "border-gray-100 opacity-75"
                    : "border-gray-200 shadow-sm"
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-4">
                  {getIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{notification.title}</h3>
                      <span className="text-xs text-gray-500">
                        {notification.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 
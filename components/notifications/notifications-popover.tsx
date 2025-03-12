"use client"

import * as React from "react"
import { Bell } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"

interface Notification {
  id: string
  title: string
  message: string
  type: "success" | "error" | "info"
  timestamp: Date
  read: boolean
}

export function NotificationsPopover() {
  const [notifications, setNotifications] = React.useState<Notification[]>([
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

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const getIcon = (type: Notification["type"]) => {
    return <Bell className="h-5 w-5 text-blue-500" />
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-white" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-white p-4" align="end">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <span className="text-xs text-gray-500">{unreadCount} unread</span>
          )}
        </div>
        <ScrollArea className="h-[300px] -mr-4 pr-4">
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex gap-3 p-2 rounded-lg transition-colors cursor-pointer",
                  notification.read
                    ? "opacity-75"
                    : "bg-gray-50"
                )}
                onClick={() => markAsRead(notification.id)}
              >
                {getIcon(notification.type)}
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {notification.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
} 
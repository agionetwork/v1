"use client"

import DashboardHeader from "@/components/dashboard/dashboard-header"

interface SocialFiLayoutProps {
  children: React.ReactNode
}

export default function SocialFiLayout({ children }: SocialFiLayoutProps) {
  return (
    <>
      <DashboardHeader />
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
      </div>
    </>
  )
} 
"use client"

import DashboardHeader from "@/components/dashboard/dashboard-header"

export default function SocialFiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DashboardHeader />
      <div className="container mx-auto p-6">
        {children}
      </div>
    </>
  )
} 
"use client"

import DashboardHeader from "@/components/dashboard/dashboard-header"

export default function BorrowLendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  )
} 
"use client"

<<<<<<< HEAD
export default function SocialFiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto p-6">
      {children}
    </div>
=======
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
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
  )
} 
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { ReferralProgram } from "@/components/referral-program"

export default function ReferralPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <DashboardHeader />
      <main className="container mx-auto p-6">
        <ReferralProgram />
      </main>
    </div>
  )
} 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import LoansDashboard from "@/components/dashboard/loans-dashboard"
import ProfileDashboard from "@/components/dashboard/profile-dashboard"
import LendDashboard from "@/components/dashboard/lend-dashboard"
import BorrowDashboard from "@/components/dashboard/borrow-dashboard"
import { RiskAssessment } from "@/components/risk-assessment"
import { ReferralProgram } from "@/components/referral-program"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="container mx-auto p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="flex w-full bg-muted">
            <TabsTrigger 
              value="profile" 
              className="flex-1 data-[state=active]:bg-agio data-[state=active]:text-white dark:text-white"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="overview" 
              className="flex-1 data-[state=active]:bg-agio data-[state=active]:text-white dark:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="borrow" 
              className="flex-1 data-[state=active]:bg-agio data-[state=active]:text-white dark:text-white"
            >
              Borrow
            </TabsTrigger>
            <TabsTrigger 
              value="lend" 
              className="flex-1 data-[state=active]:bg-agio data-[state=active]:text-white dark:text-white"
            >
              Lend
            </TabsTrigger>
            <TabsTrigger 
              value="risk" 
              className="flex-1 data-[state=active]:bg-agio data-[state=active]:text-white dark:text-white"
            >
              Risk Calculator
            </TabsTrigger>
            <TabsTrigger 
              value="referral" 
              className="flex-1 data-[state=active]:bg-agio data-[state=active]:text-white dark:text-white"
            >
              Referral
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <LoansDashboard />
          </TabsContent>
          <TabsContent value="borrow" className="mt-6">
            <BorrowDashboard />
          </TabsContent>
          <TabsContent value="lend" className="mt-6">
            <LendDashboard />
          </TabsContent>
          <TabsContent value="risk" className="mt-6">
            <div className="max-w-md mx-auto rounded-xl border bg-card p-6 shadow-lg backdrop-blur-sm">
              <RiskAssessment />
            </div>
          </TabsContent>
          <TabsContent value="profile" className="mt-6">
            <ProfileDashboard />
          </TabsContent>
          <TabsContent value="referral" className="mt-6">
            <div className="max-w-md mx-auto rounded-xl border bg-card p-6 shadow-lg backdrop-blur-sm">
              <ReferralProgram />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}


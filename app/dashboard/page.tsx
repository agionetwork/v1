import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import LoansDashboard from "@/components/dashboard/loans-dashboard"
import { LoanCreation } from "@/components/loan-creation"
import LendDashboard from "@/components/dashboard/lend-dashboard"
import BorrowDashboard from "@/components/dashboard/borrow-dashboard"
import ProfileDashboard from "@/components/dashboard/profile-dashboard"
import { RiskAssessment } from "@/components/risk-assessment"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="container mx-auto p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="flex w-full bg-muted">
            <TabsTrigger 
              value="overview" 
              className="flex-1 data-[state=active]:bg-agio data-[state=active]:text-white dark:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="flex-1 data-[state=active]:bg-agio data-[state=active]:text-white dark:text-white"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="create-loan" 
              className="flex-1 data-[state=active]:bg-agio data-[state=active]:text-white dark:text-white"
            >
              Create Loan
            </TabsTrigger>
            <TabsTrigger 
              value="lend" 
              className="flex-1 data-[state=active]:bg-agio data-[state=active]:text-white dark:text-white"
            >
              Lend
            </TabsTrigger>
            <TabsTrigger 
              value="borrow" 
              className="flex-1 data-[state=active]:bg-agio data-[state=active]:text-white dark:text-white"
            >
              Borrow
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <LoansDashboard />
          </TabsContent>
          <TabsContent value="profile" className="mt-6">
            <ProfileDashboard />
          </TabsContent>
          <TabsContent value="create-loan" className="mt-6">
            <LoanCreation />
          </TabsContent>
          <TabsContent value="lend" className="mt-6">
            <LendDashboard />
          </TabsContent>
          <TabsContent value="borrow" className="mt-6">
            <BorrowDashboard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}


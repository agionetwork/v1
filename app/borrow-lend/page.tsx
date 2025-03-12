import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { BorrowLoanCreation } from "@/components/borrow-loan-creation"
import { LendLoanCreation } from "@/components/lend-loan-creation"

export default function BorrowLendPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="container mx-auto p-6">
        <div className="flex justify-center mb-6">
          <Tabs defaultValue="borrow" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
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
            </TabsList>
            <TabsContent value="borrow" className="mt-6">
              <BorrowLoanCreation />
            </TabsContent>
            <TabsContent value="lend" className="mt-6">
              <LendLoanCreation />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LoanOffers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Loan Offers</h2>
      </div>
      <Tabs defaultValue="lend" className="space-y-4">
        <TabsList>
          <TabsTrigger value="lend">Lending Offers</TabsTrigger>
          <TabsTrigger value="borrow">Borrow Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="lend" className="space-y-4">
          <div className="grid gap-4">
            {/* Lending offers content */}
            <p>No lending offers available at the moment.</p>
          </div>
        </TabsContent>
        <TabsContent value="borrow" className="space-y-4">
          <div className="grid gap-4">
            {/* Borrow requests content */}
            <p>No borrow requests available at the moment.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
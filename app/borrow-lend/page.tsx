"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BorrowLoanCreation } from "@/components/borrow-loan-creation"
import { LendLoanCreation } from "@/components/lend-loan-creation"

export default function BorrowLendPage() {
  const [activeTab, setActiveTab] = useState("borrow")

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Borrow / Lend</h1>
          <p className="text-muted-foreground">
            Create a new loan offer or request to borrow funds.
          </p>
        </div>

        <Tabs defaultValue="borrow" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="borrow" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Borrow</TabsTrigger>
            <TabsTrigger value="lend" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Lend</TabsTrigger>
          </TabsList>

          <TabsContent value="borrow">
            <BorrowLoanCreation />
          </TabsContent>

          <TabsContent value="lend">
            <LendLoanCreation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 
"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BorrowLoanCreation } from "@/components/borrow-loan-creation"
import { LendLoanCreation } from "@/components/lend-loan-creation"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function BorrowLendPage() {
  const [activeTab, setActiveTab] = useState("borrow")

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Borrow / Lend</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="w-full cursor-pointer">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/borrow-lend" className="w-full cursor-pointer">Borrow / Lend</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/loan-offers/marketplace" className="w-full cursor-pointer">Loan Offers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/socialfi" className="w-full cursor-pointer">SocialFi</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-muted-foreground">
            Create a new loan offer or request to borrow funds.
          </p>
        </div>

        <Tabs defaultValue="borrow" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-center w-full">
            <TabsList className="inline-flex h-10 w-full max-w-md mx-auto mb-4 bg-muted/50 border dark:border-white/10">
              <TabsTrigger 
                value="borrow" 
                className="inline-flex items-center justify-center text-base px-6 py-2 flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Borrow
              </TabsTrigger>
              <TabsTrigger 
                value="lend" 
                className="inline-flex items-center justify-center text-base px-6 py-2 flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Lend
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="borrow" className="flex justify-center">
            <BorrowLoanCreation />
          </TabsContent>

          <TabsContent value="lend" className="flex justify-center">
            <LendLoanCreation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 
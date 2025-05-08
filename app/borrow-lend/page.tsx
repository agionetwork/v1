"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BorrowLoanCreation } from "@/components/borrow-loan-creation"
import { LendLoanCreation } from "@/components/lend-loan-creation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"
import { useWalletTokens } from "@/hooks/useWalletTokens"

export default function BorrowLendPage() {
  const [activeTab, setActiveTab] = useState("borrow")

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl font-bold tracking-tighter">
              Empréstimos e Investimentos
            </h1>
          </div>
          <p className="text-muted-foreground">
            Crie ou participe de empréstimos na plataforma
          </p>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="borrow">Pegar Empréstimo</TabsTrigger>
            <TabsTrigger value="lend">Emprestar</TabsTrigger>
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
"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"

export default function BorrowLendPage() {
  const { connected } = useWallet()
  const [loanAmount, setLoanAmount] = useState("")
  const [tokenType, setTokenType] = useState("")
  const [collateral, setCollateral] = useState("")
  const [interestRate, setInterestRate] = useState(5)
  const [duration, setDuration] = useState(30)
  const [terms, setTerms] = useState("")

  const handleCreateLoan = () => {
    // Implementar lógica de criação de empréstimo
    console.log({
      loanAmount,
      tokenType,
      collateral,
      interestRate,
      duration,
      terms
    })
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Borrow & Lend</h1>
      
      <Tabs defaultValue="borrow" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="borrow">Borrow</TabsTrigger>
          <TabsTrigger value="lend">Lend</TabsTrigger>
        </TabsList>

        <TabsContent value="borrow">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Loan Request</CardTitle>
                <CardDescription>Fill in the details to create your loan request</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Loan Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="token">Token Type</Label>
                  <Select value={tokenType} onValueChange={setTokenType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SOL">SOL</SelectItem>
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collateral">Collateral</Label>
                  <Input
                    id="collateral"
                    type="number"
                    placeholder="Enter collateral amount"
                    value={collateral}
                    onChange={(e) => setCollateral(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Interest Rate (%)</Label>
                  <Slider
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    max={20}
                    step={0.1}
                  />
                  <div className="text-sm text-muted-foreground">{interestRate}%</div>
                </div>

                <div className="space-y-2">
                  <Label>Duration (days)</Label>
                  <Slider
                    value={[duration]}
                    onValueChange={(value) => setDuration(value[0])}
                    max={365}
                    step={1}
                  />
                  <div className="text-sm text-muted-foreground">{duration} days</div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="terms">Terms & Conditions</Label>
                  <Textarea
                    id="terms"
                    placeholder="Enter loan terms and conditions"
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                {!connected ? (
                  <div className="w-full flex justify-center">
                    <WalletMultiButton />
                  </div>
                ) : (
                  <Button className="w-full" onClick={handleCreateLoan}>
                    Create Request
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lend">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Lending Offer</CardTitle>
                <CardDescription>Fill in the details to create your lending offer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="lend-amount">Amount to Lend</Label>
                  <Input
                    id="lend-amount"
                    type="number"
                    placeholder="Enter amount"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lend-token">Token Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SOL">SOL</SelectItem>
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Interest Rate (%)</Label>
                  <Slider
                    defaultValue={[5]}
                    max={20}
                    step={0.1}
                  />
                  <div className="text-sm text-muted-foreground">5%</div>
                </div>

                <div className="space-y-2">
                  <Label>Duration (days)</Label>
                  <Slider
                    defaultValue={[30]}
                    max={365}
                    step={1}
                  />
                  <div className="text-sm text-muted-foreground">30 days</div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lend-terms">Terms & Conditions</Label>
                  <Textarea
                    id="lend-terms"
                    placeholder="Enter lending terms and conditions"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                {!connected ? (
                  <div className="w-full flex justify-center">
                    <WalletMultiButton />
                  </div>
                ) : (
                  <Button className="w-full">
                    Create Offer
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
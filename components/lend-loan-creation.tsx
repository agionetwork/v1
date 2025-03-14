"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/ui/icons"

export function LendLoanCreation() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [loanAmount, setLoanAmount] = useState(1000)
  const [loanTerm, setLoanTerm] = useState(30)
  const [apy, setApy] = useState(5)
  const [token, setToken] = useState("SOL")
  const [tokenCollateral, setTokenCollateral] = useState("SOL")
  const [collateralAmount, setCollateralAmount] = useState(1000)
  const [receiverAddress, setReceiverAddress] = useState("")
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleCreateLoan = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log({ operationType: "LEND", loanAmount, loanTerm, apy, token, tokenCollateral, collateralAmount, receiverAddress })
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 3000)
      resetForm()
    } catch (error) {
      console.error("Erro ao criar empréstimo:", error)
      setErrors({ submit: "Erro ao criar empréstimo. Tente novamente." })
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setLoanAmount(1000)
    setLoanTerm(30)
    setApy(5)
    setToken("SOL")
    setTokenCollateral("SOL")
    setCollateralAmount(1000)
    setReceiverAddress("")
    setErrors({})
  }

  const handleSetWalletAddress = (address: string) => {
    setReceiverAddress(address)
    setIsWalletDialogOpen(false)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (loanAmount <= 0) newErrors.loanAmount = "Valor deve ser maior que 0"
    if (loanTerm < 1) newErrors.loanTerm = "Prazo mínimo é 1 dia"
    if (apy < 0) newErrors.apy = "APY não pode ser negativo"
    if (!receiverAddress) newErrors.receiverAddress = "Endereço da carteira é obrigatório"
    if (receiverAddress && !receiverAddress.startsWith("0x")) {
      newErrors.receiverAddress = "Endereço da carteira inválido"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-blue-950 shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-agio rounded-t-xl text-center py-1 relative">
        <CardTitle className="text-lg font-bold text-black dark:text-white text-center">
          CREATE LEND OFFER
        </CardTitle>
        {isSuccess && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-4 py-1 rounded-md animate-fade-out">
            Loan created successfully!
          </div>
        )}
      </CardHeader>
      <CardContent className="py-2">
        <div className="space-y-2">
          <div className="grid grid-cols-1 gap-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="loan-amount" className="text-sm font-medium text-foreground">
                  LOAN AMOUNT ({token})
                </Label>
                <Input
                  id="loan-amount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="bg-white h-8 text-black"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="token" className="text-sm font-medium text-foreground">
                  TOKEN
                </Label>
                <Select value={token} onValueChange={setToken}>
                  <SelectTrigger className="w-full h-8 bg-white text-black">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-black">
                    <SelectItem value="SOL">SOL</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="mSOL">mSOL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="collateral-amount" className="text-sm font-medium text-foreground">
                  COLLATERAL AMOUNT ({tokenCollateral})
                </Label>
                <Input
                  id="collateral-amount"
                  type="number"
                  value={collateralAmount}
                  onChange={(e) => setCollateralAmount(Number(e.target.value))}
                  className="bg-white h-8 text-black"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="token-collateral" className="text-sm font-medium text-foreground">
                  TOKEN COLLATERAL
                </Label>
                <Select value={tokenCollateral} onValueChange={setTokenCollateral}>
                  <SelectTrigger className="w-full h-8 bg-white text-black">
                    <SelectValue placeholder="Select collateral token" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-black">
                    <SelectItem value="SOL">SOL</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="mSOL">mSOL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="agio" className="text-sm font-medium text-foreground">
                  AGIO: {apy}%
                </Label>
                <Slider
                  id="agio"
                  min={0}
                  max={100}
                  step={0.1}
                  value={[apy]}
                  onValueChange={([value]) => setApy(value)}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="loan-term" className="text-sm font-medium text-foreground">
                  LOAN TERM: {loanTerm} days
                </Label>
                <Slider
                  id="loan-term"
                  min={1}
                  max={365}
                  step={1}
                  value={[loanTerm]}
                  onValueChange={([value]) => setLoanTerm(value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="wallet" className="text-sm font-medium text-foreground">
                SEND OFFER:
              </Label>
              <Input
                id="wallet"
                type="text"
                value={receiverAddress}
                readOnly
                placeholder="CLICK IN WALLET TO SET ADDRESS"
                className="w-full bg-white h-8"
              />
              <Dialog open={isWalletDialogOpen} onOpenChange={setIsWalletDialogOpen}>
                <DialogTrigger asChild>
                  <div className="flex justify-center">
                    <Button variant="outline" className="w-auto mt-2 h-8 px-6 bg-blue-600 text-white hover:bg-blue-700">
                      WALLET
                    </Button>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Enter the Wallet Address</DialogTitle>
                    <DialogDescription>Please enter the public address of the receiver for this loan.</DialogDescription>
                  </DialogHeader>
                  <Input
                    placeholder="Enter wallet address"
                    value={receiverAddress}
                    onChange={(e) => setReceiverAddress(e.target.value)}
                  />
                  <DialogFooter>
                    <Button onClick={() => handleSetWalletAddress(receiverAddress)} className="bg-blue-600 text-white hover:bg-blue-700">Set Address</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="p-2 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium mb-1 text-black">Loan Summary</h3>
              <div className="grid grid-cols-3 gap-2 text-xs text-black">
                <p>Total: {(loanAmount * (1 + (apy / 100) * (loanTerm / 365))).toFixed(2)} {token}</p>
                <p>Interest: {(loanAmount * (apy / 100) * (loanTerm / 365)).toFixed(2)} {token}</p>
                <p>Daily: {((apy / 100) * loanAmount / 365).toFixed(2)} {token}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="py-2 flex justify-center items-center gap-4 bg-white dark:bg-blue-950">
        <Button
          variant="outline"
          onClick={resetForm}
          className="px-6 bg-white text-black hover:bg-gray-100 h-8"
          disabled={isLoading}
        >
          Reset
        </Button>
        <Button 
          onClick={handleCreateLoan}
          className="bg-blue-600 text-white h-8 text-base px-12 hover:bg-blue-700"
          disabled={isLoading || Object.keys(errors).length > 0}
        >
          {isLoading ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Create Loan"
          )}
        </Button>
        {Object.keys(errors).length > 0 && (
          <div className="absolute right-4 text-red-500 text-sm">
            Please fix the errors before continuing
          </div>
        )}
      </CardFooter>
    </Card>
  )
} 
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
import { ChevronDown } from "lucide-react"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useLoanContract } from '@/hooks/useLoanContract'
import { useWallet } from '@solana/wallet-adapter-react'
import { toast } from 'sonner'

export function LendLoanCreation() {
  const { publicKey } = useWallet()
  const { createLoan } = useLoanContract()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [loanAmount, setLoanAmount] = useState(1000)
  const [loanTerm, setLoanTerm] = useState(30)
  const [apy, setApy] = useState(5)
  const [token, setToken] = useState("SOL")
  const [tokenCollateral, setTokenCollateral] = useState("SOL")
  const [collateralPercentage, setCollateralPercentage] = useState(150)
  const [receiverAddress, setReceiverAddress] = useState("")
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false)
  const [isSummaryDialogOpen, setIsSummaryDialogOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleCreateLoan = async () => {
    if (!validateForm()) return
    setIsSummaryDialogOpen(true)
  }

  const handleConfirmLoan = async () => {
    if (!publicKey) {
      toast.error('Please connect your wallet first')
      return
    }

    try {
      setIsLoading(true)
      const tx = await createLoan(
        Number(loanAmount),
        Number(apy),
        Number(loanTerm)
      )
      toast.success('Loan created successfully!')
      console.log('Transaction:', tx)
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 3000)
      setIsSummaryDialogOpen(false)
      resetForm()
    } catch (error) {
      toast.error('Error creating loan')
      console.error(error)
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
    setCollateralPercentage(150)
    setReceiverAddress("")
    setErrors({})
  }

  const handleSetWalletAddress = (address: string) => {
    setReceiverAddress(address)
    setIsWalletDialogOpen(false)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (loanAmount <= 0) newErrors.loanAmount = "Value must be greater than 0"
    if (loanTerm < 1) newErrors.loanTerm = "Minimum term is 1 day"
    if (apy < 0) newErrors.apy = "APY cannot be negative"
    if (collateralPercentage <= 0) newErrors.collateralPercentage = "Collateral percentage must be greater than 0"
    if (receiverAddress && !receiverAddress.startsWith("0x")) {
      newErrors.receiverAddress = "Invalid wallet address format"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-800">
      <CardHeader className="bg-transparent rounded-t-xl text-center py-1 relative border-b border-gray-200 dark:border-gray-800">
        <CardTitle className="text-lg font-bold text-black dark:text-white text-center">
          CREATE LEND OFFER
        </CardTitle>
        {isSuccess && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-4 py-1 rounded-md animate-fade-out">
            Loan created successfully!
          </div>
        )}
      </CardHeader>
      <CardContent className="py-2 bg-transparent">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <Label htmlFor="loan-amount" className="text-sm font-medium text-foreground">
                    AMOUNT
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <QuestionMarkCircledIcon className="h-4 w-4 text-muted-foreground hover:text-blue-600 transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs bg-transparent dark:bg-blue-950">
                        <p>The amount you want to lend in the selected token.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex">
                  <Input
                    id="loan-amount"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="h-8 text-black dark:text-white rounded-r-none w-1/2 border-r-[0.5px] border-r-black dark:border-r-white bg-transparent dark:bg-transparent"
                  />
                  <Select value={token} onValueChange={setToken}>
                    <SelectTrigger className="w-1/2 h-8 text-black dark:text-white rounded-l-none border-l-[0.5px] border-l-black dark:border-l-white bg-transparent dark:bg-transparent">
                      <div className="flex items-center gap-1">
                        <img 
                          src={`/images/${token === "USDT" ? "tether-usdt-logo.png" : token.toLowerCase() + "-logo.png"}`} 
                          alt={token} 
                          className="w-4 h-4" 
                        />
                        {token}
                      </div>
                    </SelectTrigger>
                    <SelectContent className="text-black dark:text-white bg-white dark:bg-blue-950">
                      <SelectItem value="SOL">
                        <div className="flex items-center gap-1">
                          <img src="/images/sol-logo.png" alt="SOL" className="w-4 h-4" />
                          SOL
                        </div>
                      </SelectItem>
                      <SelectItem value="USDC">
                        <div className="flex items-center gap-1">
                          <img src="/images/usdc-logo.png" alt="USDC" className="w-4 h-4" />
                          USDC
                        </div>
                      </SelectItem>
                      <SelectItem value="USDT">
                        <div className="flex items-center gap-1">
                          <img src="/images/tether-usdt-logo.png" alt="USDT" className="w-4 h-4" />
                          USDT
                        </div>
                      </SelectItem>
                      <SelectItem value="mSOL">
                        <div className="flex items-center gap-1">
                          <img src="/images/msol-logo.png" alt="mSOL" className="w-4 h-4" />
                          mSOL
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <Label htmlFor="collateral-amount" className="text-sm font-medium text-foreground">
                    COLLATERAL
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <QuestionMarkCircledIcon className="h-4 w-4 text-muted-foreground hover:text-blue-600 transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>The token you require as collateral for this loan.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select value={tokenCollateral} onValueChange={setTokenCollateral}>
                  <SelectTrigger className="w-full h-8 text-black dark:text-white bg-transparent dark:bg-transparent">
                    <div className="flex items-center gap-1">
                      <img 
                        src={`/images/${tokenCollateral === "USDT" ? "tether-usdt-logo.png" : tokenCollateral.toLowerCase() + "-logo.png"}`} 
                        alt={tokenCollateral} 
                        className="w-4 h-4" 
                      />
                      {tokenCollateral}
                    </div>
                  </SelectTrigger>
                  <SelectContent className="text-black dark:text-white bg-white dark:bg-blue-950">
                    <SelectItem value="SOL">
                      <div className="flex items-center gap-1">
                        <img src="/images/sol-logo.png" alt="SOL" className="w-4 h-4" />
                        SOL
                      </div>
                    </SelectItem>
                    <SelectItem value="USDC">
                      <div className="flex items-center gap-1">
                        <img src="/images/usdc-logo.png" alt="USDC" className="w-4 h-4" />
                        USDC
                      </div>
                    </SelectItem>
                    <SelectItem value="USDT">
                      <div className="flex items-center gap-1">
                        <img src="/images/tether-usdt-logo.png" alt="USDT" className="w-4 h-4" />
                        USDT
                      </div>
                    </SelectItem>
                    <SelectItem value="mSOL">
                      <div className="flex items-center gap-1">
                        <img src="/images/msol-logo.png" alt="mSOL" className="w-4 h-4" />
                        mSOL
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <Label htmlFor="collateral-percentage" className="text-sm font-medium text-foreground">
                    COLLATERAL PERCENTAGE: {collateralPercentage}%
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <QuestionMarkCircledIcon className="h-4 w-4 text-muted-foreground hover:text-blue-600 transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>The percentage of collateral you require relative to the loan amount. Higher percentages provide more security for your loan.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Slider
                  id="collateral-percentage"
                  min={150}
                  max={300}
                  step={5}
                  value={[collateralPercentage]}
                  onValueChange={([value]) => setCollateralPercentage(value)}
                  className="w-full bg-transparent dark:bg-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <Label htmlFor="loan-term" className="text-sm font-medium text-foreground">
                    TERM: {loanTerm} days
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <QuestionMarkCircledIcon className="h-4 w-4 text-muted-foreground hover:text-blue-600 transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>The duration of the loan in days. At the end of this period, the borrower should repay the loan plus interest.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Slider
                  id="loan-term"
                  min={1}
                  max={365}
                  step={1}
                  value={[loanTerm]}
                  onValueChange={([value]) => setLoanTerm(value)}
                  className="w-full bg-transparent dark:bg-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <Label htmlFor="apy" className="text-sm font-medium text-foreground">
                    APY (%): {apy}%
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <QuestionMarkCircledIcon className="h-4 w-4 text-muted-foreground hover:text-blue-600 transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Annual Percentage Yield - the interest rate you'll earn on this loan, calculated on a yearly basis.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Slider
                  id="apy"
                  min={0}
                  max={100}
                  step={0.1}
                  value={[apy]}
                  onValueChange={([value]) => setApy(value)}
                  className="w-full bg-transparent dark:bg-transparent"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Label htmlFor="wallet" className="text-sm font-medium text-foreground">
                  SET PRIVATE LENDER:
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <QuestionMarkCircledIcon className="h-4 w-4 text-muted-foreground hover:text-blue-600 transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Select a private address to receive the offer or leave blank to send the offer to the public market.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  id="wallet"
                  type="text"
                  value={receiverAddress}
                  readOnly
                  placeholder="CLICK IN WALLET TO SET ADDRESS"
                  className="w-full text-black dark:text-white bg-transparent dark:bg-transparent"
                />
                <Dialog open={isWalletDialogOpen} onOpenChange={setIsWalletDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-8 px-6 bg-blue-600 text-white hover:bg-blue-700">
                      WALLET
                    </Button>
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
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="py-2 flex justify-center items-center gap-4 bg-transparent">
        <Button
          variant="outline"
          onClick={resetForm}
          className="px-6 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-blue-900 bg-transparent dark:bg-transparent h-8"
          disabled={isLoading}
        >
          Reset
        </Button>
        <Button 
          onClick={handleCreateLoan}
          className="bg-[#1358EC] text-white h-8 text-base px-12 hover:bg-[#104BCA]"
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

      <Dialog open={isSummaryDialogOpen} onOpenChange={setIsSummaryDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-center">Loan Summary</DialogTitle>
            <DialogDescription className="text-center">
              Review your loan details before submitting
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 border border-blue-100 dark:border-blue-800 shadow-sm">
            <h3 className="text-sm font-bold mb-3 text-blue-800 dark:text-blue-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              LOAN SUMMARY
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white dark:bg-blue-950 p-2 rounded border border-blue-100 dark:border-blue-800">
                  <p className="text-gray-500 dark:text-gray-300 mb-1">Principal Amount:</p>
                  <p className="font-semibold text-blue-700 dark:text-blue-300">{loanAmount.toLocaleString()} {token}</p>
                </div>
                <div className="bg-white dark:bg-blue-950 p-2 rounded border border-blue-100 dark:border-blue-800">
                  <p className="text-gray-500 dark:text-gray-300 mb-1">Interest Earned:</p>
                  <p className="font-semibold text-green-600 dark:text-green-400">+{(loanAmount * (apy / 100) * (loanTerm / 365)).toFixed(2)} {token}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white dark:bg-blue-950 p-2 rounded border border-blue-100 dark:border-blue-800">
                  <p className="text-gray-500 dark:text-gray-300 mb-1">Total Return:</p>
                  <p className="font-semibold text-blue-700 dark:text-blue-300">{(loanAmount * (1 + (apy / 100) * (loanTerm / 365))).toFixed(2)} {token}</p>
                </div>
                <div className="bg-white dark:bg-blue-950 p-2 rounded border border-blue-100 dark:border-blue-800">
                  <p className="text-gray-500 dark:text-gray-300 mb-1">Collateral Secured:</p>
                  <p className="font-semibold text-red-600 dark:text-red-400">{(loanAmount * (collateralPercentage / 100)).toFixed(2)} {tokenCollateral}</p>
                </div>
              </div>
              <div className="bg-white dark:bg-blue-950 p-2 rounded border border-blue-100 dark:border-blue-800">
                <p className="text-gray-500 dark:text-gray-300 mb-1">Daily Interest Accrual:</p>
                <p className="font-semibold text-blue-700 dark:text-blue-300">{((loanAmount * (apy / 100)) / 365).toFixed(4)} {token} per day</p>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                Note: You will lend {loanAmount} {token} for {loanTerm} days at {apy}% APY. The borrower's collateral will be locked until repayment.
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-center mt-4 gap-4">
            <Button 
              variant="outline" 
              onClick={() => setIsSummaryDialogOpen(false)}
              className="bg-white dark:bg-blue-950 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmLoan}
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Send Offer"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
} 
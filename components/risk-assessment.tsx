"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

export function RiskAssessment() {
  const [loanAmount, setLoanAmount] = React.useState(0)
  const [collateral, setCollateral] = React.useState(0)
  const [term, setTerm] = React.useState(30)
  const [riskScore, setRiskScore] = React.useState(0)

  const calculateRisk = () => {
    // This is a simplified risk calculation. In a real application, this would be much more complex.
    const collateralRatio = collateral / loanAmount
    const termFactor = term / 365
    const rawScore = collateralRatio * 50 + 50 / termFactor
    setRiskScore(Math.min(Math.max(rawScore, 0), 100))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold dark:text-white">Loan Risk Assessment</h2>
      <div className="grid gap-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="loan-amount" className="text-right dark:text-white">
            Loan Amount (SOL)
          </Label>
          <Input
            id="loan-amount"
            type="number"
            className="col-span-3"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="collateral" className="text-right dark:text-white">
            Collateral (SOL)
          </Label>
          <Input
            id="collateral"
            type="number"
            className="col-span-3"
            value={collateral}
            onChange={(e) => setCollateral(Number(e.target.value))}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="term" className="text-right dark:text-white">
            Term (Days)
          </Label>
          <Input
            id="term"
            type="number"
            className="col-span-3"
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
          />
        </div>
      </div>
      <Button onClick={calculateRisk} className="dark:text-white">Calculate Risk</Button>
      {riskScore > 0 && (
        <div className="space-y-2">
          <Label className="dark:text-white">Risk Score</Label>
          <Progress value={riskScore} className="w-full" />
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            {riskScore < 33 ? "High Risk" : riskScore < 66 ? "Medium Risk" : "Low Risk"}
          </p>
        </div>
      )}
    </div>
  )
}


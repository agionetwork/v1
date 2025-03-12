import DashboardHeader from "@/components/dashboard/dashboard-header"
import { RiskAssessment } from "@/components/risk-assessment"

export default function RiskAssessmentPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <DashboardHeader />
      <main className="container mx-auto p-6">
        <RiskAssessment />
      </main>
    </div>
  )
} 
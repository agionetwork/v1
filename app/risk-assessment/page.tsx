import DashboardHeader from "@/components/dashboard/dashboard-header"
import { RiskAssessment } from "@/components/risk-assessment"

export default function RiskAssessmentPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/95">
      <DashboardHeader />
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/50 to-background/95" />
        <main className="container relative mx-auto p-6">
          <div className="rounded-xl border bg-card p-8 shadow-lg backdrop-blur-sm">
            <RiskAssessment />
          </div>
        </main>
      </div>
    </div>
  )
} 
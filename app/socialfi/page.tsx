import DashboardHeader from "@/components/dashboard/dashboard-header"

export default function SocialFiPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/95">
      <DashboardHeader />
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/50 to-background/95" />
        <main className="container relative mx-auto p-6">
          <div className="rounded-xl border bg-card p-8 shadow-lg backdrop-blur-sm">
            <div className="space-y-6">
              <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">SocialFi</h1>
                <p className="text-muted-foreground">
                  Connect with other users, share insights, and build your reputation.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}


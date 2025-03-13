import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function StatsCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="text-center">
      <CardContent className="p-6">
        <h3 className="text-3xl font-bold tracking-tighter">{title}</h3>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  )
}

export default function StatsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Platform Statistics</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-8">
            <h3 className="text-2xl font-bold">$1M+</h3>
            <p className="text-muted-foreground">Total Value Locked</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-8">
            <h3 className="text-2xl font-bold">1K+</h3>
            <p className="text-muted-foreground">Active Users</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-8">
            <h3 className="text-2xl font-bold">97.6%</h3>
            <p className="text-muted-foreground">Successful Loans</p>
          </div>
        </div>
      </div>
    </section>
  )
}


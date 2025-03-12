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
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Platform Statistics</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
              Our growing ecosystem of lenders and borrowers
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-4 lg:gap-12 mt-12">
          <StatsCard title="$120M+" description="Total Value Locked" />
          <StatsCard title="45,000+" description="Active Users" />
          <StatsCard title="12,500+" description="Loans Funded" />
          <StatsCard title="99.8%" description="Repayment Rate" />
        </div>
      </div>
    </section>
  )
}


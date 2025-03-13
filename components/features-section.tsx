import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Coins, Users, Zap, Award, TrendingUp } from "lucide-react"

function FeatureCard({ 
  icon: Icon,
  title, 
  description 
}: { 
  icon: React.ElementType
  title: string
  description: string 
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="w-6 h-6 text-primary" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Platform Features</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to start lending and borrowing on the Solana blockchain
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 mt-12">
          <FeatureCard
            icon={Shield}
            title="Secure Lending"
            description="Smart contracts ensure your funds are safe and transactions are transparent"
          />
          <FeatureCard
            icon={Coins}
            title="Flexible Terms"
            description="Set your own interest rates, loan duration, and collateral requirements"
          />
          <FeatureCard
            icon={Users}
            title="Social Lending"
            description="Connect with friends and trusted borrowers in your network"
          />
          <FeatureCard
            icon={Zap}
            title="Fast Processing"
            description="Lightning-fast transactions and instant loan disbursement"
          />
          <FeatureCard
            icon={Award}
            title="Reputation System"
            description="Build trust through successful loan completions and timely payments"
          />
          <FeatureCard
            icon={TrendingUp}
            title="Earn Interest"
            description="Generate passive income by lending your idle tokens"
          />
        </div>
      </div>
    </section>
  )
} 
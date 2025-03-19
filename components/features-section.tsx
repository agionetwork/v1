import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Coins, Users, Zap, Award, TrendingUp, Clock, BadgePercent, Rocket } from "lucide-react"

function FeatureCard({ 
  icon: Icon,
  title, 
  description,
  gradient = "from-blue-500 to-blue-600" 
}: { 
  icon: React.ElementType
  title: string
  description: string 
  gradient?: string
}) {
  return (
    <Card className="border-none overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm group">
      <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
      <CardHeader className="pt-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Secure Loans",
      description: "Smart contracts guarantee that your funds are safe and transactions are transparent",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Coins,
      title: "Flexible Terms",
      description: "Define your own interest rates, loan duration, and collateral requirements",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Social Finance",
      description: "Make loans with friends, family, and trusted companies in your network",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "Fast Transactions",
      description: "Instant liquidity with transactions confirmed in seconds on the Solana network",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Award,
      title: "Reputation System",
      description: "Build your reputation to access better rates and loan conditions",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Risk Analysis",
      description: "Advanced tools to assess risk and make smart financial decisions",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Clock,
      title: "Customized Terms",
      description: "Choose the loan term that works best for you, from days to months",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: BadgePercent,
      title: "Low Fees",
      description: "Minimize your costs with significantly lower fees than traditional banks",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Rocket,
      title: "Easy to Use",
      description: "Intuitive interface that makes P2P loans accessible to everyone, regardless of crypto experience",
      gradient: "from-blue-500 to-blue-600"
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Removendo os elementos decorativos de fundo pois já estão na homepage */}
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto mb-12 md:mb-20 text-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 text-xs font-medium border border-blue-600/30 dark:border-blue-400/30 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <Shield className="w-3.5 h-3.5 mr-2" />
            Exclusive Features
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Platform Features</h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to start lending and borrowing on the Solana blockchain
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 
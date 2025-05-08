<<<<<<< HEAD
import { motion } from "framer-motion"
import { Shield, Wallet, LineChart, Users, Lock, Zap } from "lucide-react"

interface Feature {
  title: string
  description: string
  icon: React.ElementType
  color: "primary" | "blue" | "green" | "purple" | "orange" | "pink"
}

const features: Feature[] = [
  {
    title: "Enterprise Security",
    description: "Bank-grade encryption and multi-layer security protocols",
    icon: Shield,
    color: "primary",
  },
  {
    title: "Smart Wallet Integration",
    description: "Seamless connection with major Solana wallets",
    icon: Wallet,
    color: "blue",
  },
  {
    title: "Real-Time Analytics",
    description: "Advanced metrics and insights for informed decisions",
    icon: LineChart,
    color: "green",
  },
  {
    title: "Thriving Community",
    description: "Connect and grow with like-minded investors",
    icon: Users,
    color: "purple",
  },
  {
    title: "Privacy First",
    description: "Your data is protected with military-grade encryption",
    icon: Lock,
    color: "orange",
  },
  {
    title: "Lightning Fast",
    description: "Sub-second transaction processing and settlement",
    icon: Zap,
    color: "pink",
  },
]

const colorVariants = {
  primary: "from-primary to-primary/90",
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600",
  purple: "from-purple-500 to-purple-600",
  orange: "from-orange-500 to-orange-600",
  pink: "from-pink-500 to-pink-600",
}

export function FeaturesSection() {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-agio-darkest via-agio-medium to-agio-light dark:from-gray-950 dark:via-agio-darkest dark:to-agio-darker">
            Platform Resources
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the next generation of decentralized lending with our cutting-edge platform
          </p>
        </motion.div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-agio-darkest/10 via-agio-medium/10 to-agio-light/10 dark:from-gray-950/10 dark:via-agio-darkest/10 dark:to-agio-darker/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6 bg-white/90 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${colorVariants[feature.color]} bg-opacity-10`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
=======
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
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
          ))}
        </div>
      </div>
    </section>
  )
} 
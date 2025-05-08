<<<<<<< HEAD
import { motion } from "framer-motion"
import { DollarSign, Users, TrendingUp, Activity, ChartBar, Clock } from "lucide-react"

type ColorVariant = "blue" | "green" | "purple" | "orange" | "pink" | "indigo"

interface Stat {
  title: string
  value: string
  change: string
  description: string
  icon: React.ElementType
  color: ColorVariant
}

const stats: Stat[] = [
  {
    title: "Total Value Locked",
    value: "$10.5M",
    change: "+12.5%",
    description: "Secured assets on platform",
    icon: DollarSign,
    color: "blue",
  },
  {
    title: "Active Users",
    value: "25.3K",
    change: "+8.2%",
    description: "Growing community",
    icon: Users,
    color: "green",
  },
  {
    title: "Total Loans",
    value: "1.2K",
    change: "+15.3%",
    description: "Successful transactions",
    icon: TrendingUp,
    color: "purple",
  },
  {
    title: "Average APY",
    value: "12%",
    change: "+2.3%",
    description: "Competitive returns",
    icon: ChartBar,
    color: "orange",
  },
  {
    title: "Processing Time",
    value: "<1min",
    change: "-25%",
    description: "Lightning fast execution",
    icon: Clock,
    color: "pink",
  },
  {
    title: "Platform Uptime",
    value: "99.99%",
    change: "+0.1%",
    description: "Reliable infrastructure",
    icon: Activity,
    color: "indigo",
  },
]

const colorVariants: Record<ColorVariant, string> = {
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600",
  purple: "from-purple-500 to-purple-600",
  orange: "from-orange-500 to-orange-600",
  pink: "from-pink-500 to-pink-600",
  indigo: "from-indigo-500 to-indigo-600",
}

export function StatsSection() {
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
            Platform Statistics
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time insights showcasing our platform's growth and performance across key metrics
          </p>
        </motion.div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-agio-darkest/10 via-agio-medium/10 to-agio-light/10 dark:from-gray-950/10 dark:via-agio-darkest/10 dark:to-agio-darker/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6 bg-white/90 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${colorVariants[stat.color]} bg-opacity-10`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{stat.title}</h3>
                      <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
=======
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  Shield,
  Activity
} from "lucide-react"

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  }
}

function StatItem({ icon, value, label, description, trend }: StatItemProps) {
  return (
    <Card className="border-none shadow-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px]">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            {icon}
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline space-x-2">
              <h3 className="text-3xl font-bold tracking-tighter">{value}</h3>
              {trend && (
                <span className={`text-xs px-2 py-1 rounded-full flex items-center ${trend.isPositive ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                  {trend.isPositive ? '+' : ''}{trend.value}
                  <TrendingUp className={`h-3 w-3 ml-1 ${!trend.isPositive && 'rotate-180'}`} />
                </span>
              )}
            </div>
            <p className="text-sm font-medium">{label}</p>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function StatsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative">
      {/* Removendo os elementos decorativos de fundo pois já estão na homepage */}
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 mb-4">
            <Activity className="h-4 w-4 mr-2" />
            Platform Metrics
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Platform Statistics
          </h2>
          <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
            Explore our platform's growth and impact in decentralized finance (DeFi)
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <StatItem 
            icon={<CreditCard className="h-5 w-5" />}
            value="$1.5M+"
            label="Accumulated loan volume"
            description="Consistent monthly growth"
            trend={{
              value: "32%",
              isPositive: true
            }}
          />
          <StatItem 
            icon={<Users className="h-5 w-5" />}
            value="1,245+"
            label="Active Users"
            description="Consistent monthly growth"
            trend={{
              value: "18.7%",
              isPositive: true
            }}
          />
          <StatItem 
            icon={<Shield className="h-5 w-5" />}
            value="99.2%"
            label="Successful Loans"
            description="Loan repayment success rate"
            trend={{
              value: "0.5%",
              isPositive: true
            }}
          />
        </div>
        
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center justify-center gap-x-2 rounded-full bg-white/80 dark:bg-gray-800/80 p-1 text-sm text-muted-foreground backdrop-blur-md border border-gray-200 dark:border-gray-700">
            <span className="inline-flex animate-pulse h-2 w-2 rounded-full bg-green-500"></span>
            <span className="pr-2">Data updated in real-time</span>
          </div>
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
        </div>
      </div>
    </section>
  )
}


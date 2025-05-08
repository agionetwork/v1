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
        </div>
      </div>
    </section>
  )
}


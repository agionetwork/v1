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
          ))}
        </div>
      </div>
    </section>
  )
} 
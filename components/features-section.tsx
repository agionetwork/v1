"use client"

import { motion } from "framer-motion"
import { Shield, Wallet, LineChart, Users, Lock, Zap } from "lucide-react"

const features = [
  {
    title: "Secure Lending",
    description: "Advanced security measures to protect your assets and transactions",
    icon: Shield,
  },
  {
    title: "Easy Integration",
    description: "Seamless integration with popular wallets and DeFi protocols",
    icon: Wallet,
  },
  {
    title: "Real-time Analytics",
    description: "Track your portfolio performance with detailed analytics",
    icon: LineChart,
  },
  {
    title: "Social Network",
    description: "Connect with other users and build your lending network",
    icon: Users,
  },
  {
    title: "Smart Contracts",
    description: "Automated and transparent lending agreements",
    icon: Lock,
  },
  {
    title: "Fast Transactions",
    description: "Quick and efficient loan processing",
    icon: Zap,
  },
]

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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Powerful Features
          </h2>
          <p className="mt-4 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Everything you need to manage your DeFi lending portfolio
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 
"use client"

import { motion } from "framer-motion"
import { DollarSign, Users, TrendingUp, Activity, ChartBar, Clock } from "lucide-react"

const stats = [
  {
    title: "Total Value Locked",
    value: "$12.5M",
    description: "Total assets secured in our protocol",
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "25.3K",
    description: "Users actively using our platform",
    icon: Users,
  },
  {
    title: "Average APY",
    value: "12%",
    description: "Average annual percentage yield",
    icon: TrendingUp,
  },
  {
    title: "Transaction Volume",
    value: "$45.2M",
    description: "Total transaction volume",
    icon: Activity,
  },
  {
    title: "Success Rate",
    value: "99.9%",
    description: "Successful loan completions",
    icon: ChartBar,
  },
  {
    title: "Average Time",
    value: "2.5s",
    description: "Average transaction time",
    icon: Clock,
  },
]

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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Platform Statistics
          </h2>
          <p className="mt-4 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Real-time metrics showing our platform's performance
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <stat.icon className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold text-blue-500 mb-2">{stat.value}</p>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


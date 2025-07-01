"use client"

import { motion } from "framer-motion"
import { Users, Coins, BarChart } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

const stats = [
  {
    icon: Users,
    value: "5K+",
    label: "Wallets on Waitlist",
    description: "A growing community of Borrowers & Lenders"
  },
  {
    icon: Coins,
    value: "700+",
    label: "Followers on X",
    description: "Follow us and stay tuned"
  },
  {
    icon: BarChart,
    value: "100+",
    label: "Early Adopters",
    description: "Wallets with Early Access to the platform"
  }
]

export function StatsSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const textMain = theme === 'dark' ? 'text-white' : 'text-black';
  const textSub = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const cardBg = theme === 'dark' ? 'bg-white/5' : 'bg-white';
  const cardBorder = theme === 'dark' ? 'border-gray-200/10' : 'border-gray-200';

  // Se não estiver montado, renderiza sem animações
  if (!mounted) {
    return (
      <section className="w-full py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tighter mb-4 ${textMain}`}>
              Platform Statistics
            </h2>
            <p className={`${textSub} max-w-2xl mx-auto`}>
              Metrics showing our platform's growth and performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`${cardBg} backdrop-blur-sm border ${cardBorder} p-8 rounded-lg shadow-lg text-center`}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-full">
                    <stat.icon className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <h3 className={`text-4xl font-bold mb-2 ${textMain}`}>{stat.value}</h3>
                <p className={`text-lg font-semibold mb-2 ${textMain}`}>{stat.label}</p>
                <p className={textSub}>{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
          <h2 className={`text-3xl md:text-4xl font-bold tracking-tighter mb-4 ${textMain}`}>
            Platform Statistics
          </h2>
          <p className={`${textSub} max-w-2xl mx-auto`}>
            Metrics showing our platform's growth and performance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`${cardBg} backdrop-blur-sm border ${cardBorder} p-8 rounded-lg shadow-lg text-center`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <stat.icon className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <h3 className={`text-4xl font-bold mb-2 ${textMain}`}>{stat.value}</h3>
              <p className={`text-lg font-semibold mb-2 ${textMain}`}>{stat.label}</p>
              <p className={textSub}>{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


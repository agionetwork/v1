"use client"

import { motion } from "framer-motion"
import { Shield, Coins, Sparkles, Users, Lock, Zap } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

const features = [
  {
    icon: Shield,
    title: "Secure Lending",
    description: "Advanced security protocols ensure your assets are always protected"
  },
  {
    icon: Coins,
    title: "Competitive Rates",
    description: "Get the best rates for your loans and investments"
  },
  {
    icon: Sparkles,
    title: "Smart Contracts",
    description: "Automated and transparent lending process"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join Agio DAO, a growing community of borrowers and lenders"
  },
  {
    icon: Lock,
    title: "Asset Protection",
    description: "Your assets are protected by industry-leading security measures"
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Quick and efficient loan processing and approval"
  }
]

export function FeaturesSection() {
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
              Why Choose Agio Network?
            </h2>
            <p className={`${textSub} max-w-2xl mx-auto`}>
              Experience the next generation of DeFi with our innovative features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`${cardBg} backdrop-blur-sm border ${cardBorder} p-6 rounded-lg shadow-lg`}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-500/20 rounded-full">
                    <feature.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${textMain}`}>{feature.title}</h3>
                    <p className={textSub}>{feature.description}</p>
                  </div>
                </div>
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
            Why Choose Agio Network?
          </h2>
          <p className={`${textSub} max-w-2xl mx-auto`}>
            Experience the next generation of DeFi with our innovative features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`${cardBg} backdrop-blur-sm border ${cardBorder} p-6 rounded-lg shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <feature.icon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${textMain}`}>{feature.title}</h3>
                  <p className={textSub}>{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 
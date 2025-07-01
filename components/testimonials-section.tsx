"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "DeFi Investor",
    image: "/images/testimonials/sarah.jpg",
    quote: "Agio Network has revolutionized how I manage my DeFi investments. The platform is intuitive and secure."
  },
  {
    name: "Michael Chen",
    role: "Crypto Trader",
    image: "/images/testimonials/michael.jpg",
    quote: "The lending rates are competitive, and the platform's security gives me peace of mind."
  },
  {
    name: "Emma Rodriguez",
    role: "Blockchain Developer",
    image: "/images/testimonials/emma.jpg",
    quote: "As a developer, I appreciate the transparency and efficiency of Agio's smart contracts."
  }
]

export function TestimonialsSection() {
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
              What Our Users Say
            </h2>
            <p className={`${textSub} max-w-2xl mx-auto`}>
              Join lots of users who trust Agio Network for their DeFi needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`${cardBg} backdrop-blur-sm border ${cardBorder} p-6 rounded-lg shadow-lg`}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${textMain}`}>{testimonial.name}</h3>
                    <p className={`text-sm ${textSub}`}>{testimonial.role}</p>
                  </div>
                </div>
                <p className={textSub}>{testimonial.quote}</p>
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
            What Our Users Say
          </h2>
          <p className={`${textSub} max-w-2xl mx-auto`}>
            Join lots of users who trust Agio Network for their DeFi needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className={`${cardBg} backdrop-blur-sm border ${cardBorder} p-6 rounded-lg shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className={`font-semibold ${textMain}`}>{testimonial.name}</h3>
                  <p className={`text-sm ${textSub}`}>{testimonial.role}</p>
                </div>
              </div>
              <p className={textSub}>{testimonial.quote}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 

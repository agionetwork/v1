"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export function CTASection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const textMain = theme === 'dark' ? 'text-white' : 'text-black';
  const textSub = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  // Se não estiver montado, renderiza sem animações
  if (!mounted) {
    return (
      <section className="w-full py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center">
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tighter mb-4 ${textMain}`}>
              Ready to Start Your DeFi Journey?
            </h2>
            <p className={`${textSub} max-w-2xl mx-auto mb-8`}>
              Join thousands of users who are already benefiting from our innovative lending platform.
              Sign up now and be part of the future of decentralized finance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Launch App
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-blue-600 border-blue-600">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={`text-3xl md:text-4xl font-bold tracking-tighter mb-4 ${textMain}`}>
            Ready to Start Your DeFi Journey?
          </h2>
          <p className={`${textSub} max-w-2xl mx-auto mb-8`}>
            Join thousands of users who are already benefiting from our innovative lending platform.
            Sign up now and be part of the future of decentralized finance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Launch App
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-blue-600 border-blue-600">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
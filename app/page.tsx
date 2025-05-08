"use client"

<<<<<<< HEAD
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
=======
import HeroSection from "@/components/hero-section"
import StatsSection from "@/components/stats-section"
import FeaturesSection from "@/components/features-section"
import Footer from "@/components/footer"
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
import ParticlesBackground from "@/components/particles-background"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
<<<<<<< HEAD
=======
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import SocialIcons from "@/components/social-icons"
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
<<<<<<< HEAD
=======
  const router = useRouter()
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944

  useEffect(() => {
    setMounted(true);
    console.log("Homepage mounted, ParticlesBackground should appear");
<<<<<<< HEAD
  }, []);
=======
    router.push('/waitlist')
  }, [router]);
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944

  const scrollToStats = () => {
    statsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) return null;

  return (
<<<<<<< HEAD
    <main className="flex min-h-screen flex-col items-center justify-between pt-0">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
    </main>
=======
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <main className="flex-1">
        <section className="w-full min-h-screen flex flex-col items-center justify-center py-8 md:py-12 lg:py-16 xl:py-24 relative overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center"
            >
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-6">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-600 dark:text-blue-400"
                  >
                    Decentralized
                    <span className="block mt-1">Social Finance for</span>
                    <span className="block mt-1">Borrowers & Lenders</span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl leading-relaxed"
                  >
                    Lend and borrow directly with other users, using Solana tokens as collateral. Build your reputation, earn interest, and
                    access liquidity with ultra-fast transactions and minimal fees.
                  </motion.p>
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="flex flex-col gap-4 min-[400px]:flex-row"
                >
                  <Link href="/dashboard?tab=overview">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg shadow-blue-600/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/30 hover:translate-y-[-2px] px-8">
                      LAUNCH APP <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/loan-offers/marketplace">
                    <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 bg-white dark:bg-white dark:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-50 transition-all duration-300 hover:translate-y-[-2px] px-8">
                      LOAN OFFERS
                    </Button>
                  </Link>
                </motion.div>
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSdbOWUOW4gG-zQp4Ht69NacWAii7lsYQOV3mrv_6UfFsfPN0g/viewform', '_blank')}
                >
                  <ArrowRight className="w-5 h-5" />
                  FILL THE FORM
                </Button>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative w-full h-[400px] hidden lg:block mx-auto"
              >
                <Image
                  src="/images/blue-hat.png"
                  alt="Blue Hat"
                  width={450}
                  height={450}
                  priority
                  className="object-contain relative z-10 animate-float mx-auto"
                />
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block"
          >
            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 border border-gray-200 dark:border-gray-700">
              <ChevronDown className="h-5 w-5" />
            </Button>
          </motion.div>
        </section>
        
        <StatsSection />
        <FeaturesSection />

        <div className="container px-4 md:px-6 mx-auto py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <Link href="/dashboard?tab=overview">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition-all duration-300 w-full md:w-auto px-8 py-6 text-lg">
                Access all resources and more on our platform
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
      <SocialIcons 
        linkedin="https://linkedin.com/company/agio-network"
        discord="https://discord.com/invite/EmwdzjC2DM"
        x="https://x.com/agio_network"
        telegram="https://t.me/agio_network"
      />
    </div>
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
  )
} 
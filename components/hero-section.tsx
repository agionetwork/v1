import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles, Shield, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function HeroSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true) }, []);
  if (!mounted) return null;

  const textMain = theme === 'dark' ? 'text-white' : 'text-black';
  const textSub = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const cardTitle = theme === 'dark' ? 'text-white' : 'text-black';
  const cardDesc = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const buttonOutline = theme === 'dark' ? 'text-white border-white hover:bg-white/10' : 'text-black border-black hover:bg-black/10';
  const cardBg = theme === 'dark' ? 'bg-white/5' : 'bg-white';
  const cardBorder = theme === 'dark' ? 'border-gray-200/10' : 'border-gray-200';

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-20 md:py-32 text-foreground">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className={`text-4xl md:text-6xl font-bold tracking-tighter ${textMain}`}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Reliable Loans
              </span>{" "}
              <span className={textMain}>
                like a friendly handshake
              </span>
            </h1>
            <p className={`text-xl md:text-2xl ${textSub} max-w-[700px] mx-auto`}>
              Start making money by lending to:<br />
              Friends, Family, and well-known Businesses.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="bg-[#1358EC] hover:bg-blue-700 text-white" asChild>
              <Link href="/borrow-lend">
                TRY BETA
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-blue-600 border-blue-600" asChild>
              <Link href="/borrow-lend">
                LOAN OFFERS
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl"
          >
            <div className={`flex items-center space-x-4 p-4 rounded-lg ${cardBg} backdrop-blur-sm border ${cardBorder}`}>
              <Shield className="h-6 w-6 text-blue-400" />
              <div className="text-left">
                <h3 className={`font-semibold ${cardTitle}`}>P2P Lending</h3>
                <p className={`text-sm ${cardDesc}`}>Loans without middleman</p>
              </div>
            </div>
            <div className={`flex items-center space-x-4 p-4 rounded-lg ${cardBg} backdrop-blur-sm border ${cardBorder}`}>
              <Coins className="h-6 w-6 text-blue-400" />
              <div className="text-left">
                <h3 className={`font-semibold ${cardTitle}`}>Customizable Agreement</h3>
                <p className={`text-sm ${cardDesc}`}>Period, Interest and Collateral</p>
              </div>
            </div>
            <div className={`flex items-center space-x-4 p-4 rounded-lg ${cardBg} backdrop-blur-sm border ${cardBorder}`}>
              <Sparkles className="h-6 w-6 text-blue-400" />
              <div className="text-left">
                <h3 className={`font-semibold ${cardTitle}`}>Score System</h3>
                <p className={`text-sm ${cardDesc}`}>Build your reputation</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


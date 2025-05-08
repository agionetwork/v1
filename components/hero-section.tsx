import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles, Shield, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-20 md:py-32 text-foreground overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-agio-darkest via-agio-darker to-agio-light rounded-full blur-3xl"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-agio-darkest via-agio-darker to-agio-light rounded-full blur-3xl"
        />
      </div>
      
      <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
          <div className="flex flex-col justify-center space-y-8">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Revolutionizing DeFi Lending
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-agio-darkest via-agio-darker to-agio-light dark:from-agio-light dark:via-agio-darker dark:to-agio-darkest">
                  Empower Your Crypto Assets
                </span>
                <br />
                <span className="mt-2 inline-block">
                  with Social Lending
                </span>
              </h1>
              <p className="max-w-[600px] text-xl text-muted-foreground leading-relaxed">
                Borrow and lend directly with other users, using Solana tokens as collateral. Experience lightning-fast transactions with minimal fees.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/dashboard?tab=overview">
                <Button size="lg" className="bg-gradient-to-r from-primary via-blue-600 to-blue-700 hover:from-primary/90 hover:via-blue-600/90 hover:to-blue-700/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-8 rounded-full">
                  LAUNCH APP <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/loan-offers/marketplace">
                <Button size="lg" variant="outline" className="border-2 border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300 h-12 px-8 rounded-full">
                  EXPLORE LOANS
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-6 mt-8 sm:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium">Secure & Safe</h3>
                  <p className="text-sm text-muted-foreground">Solana-powered security</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Coins className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">High Yields</h3>
                  <p className="text-sm text-muted-foreground">Up to 12% APY</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-blue-500/20 to-blue-600/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-800/50">
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                        <Image src="/logo.svg" alt="Logo" width={24} height={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Agio Network</h3>
                        <p className="text-sm text-muted-foreground">Social Lending Platform</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Current APY</span>
                        <span className="text-lg font-bold text-primary">12%</span>
                      </div>
                      <div className="w-full h-2 bg-primary/20 rounded-full">
                        <div className="h-full w-3/4 bg-gradient-to-r from-primary to-blue-600 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                        <p className="text-sm text-muted-foreground mb-1">Total Loans</p>
                        <p className="text-2xl font-bold">1.2K</p>
                      </div>
                      <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                        <p className="text-sm text-muted-foreground mb-1">Active Users</p>
                        <p className="text-2xl font-bold">25.3K</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


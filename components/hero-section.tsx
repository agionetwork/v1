"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles, Shield, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { WalletConnect } from "@/components/wallet-connect"

export default function HeroSection({ onScrollClick }: { onScrollClick: () => void }) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-20 md:py-32 text-foreground overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-agio-100/50 to-white dark:from-agio-600/50 dark:to-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-agio-100 to-agio-300 dark:from-agio-200 dark:to-agio-400">
              The Future of Decentralized Lending
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Join the waitlist for our revolutionary P2P lending platform on Solana. Make money by lending to friends, family, and well-known businesses.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-x-4"
          >
            <Link href="/dashboard?tab=overview">
              <Button size="lg" className="bg-gradient-to-r from-agio-100 to-agio-300 hover:from-agio-200 hover:to-agio-400 text-white">
                Launch App
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/waitlist">
              <Button variant="outline" size="lg" className="border-agio-100 text-agio-100 hover:bg-agio-100/10">
                Join Waitlist
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
          >
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-agio-100" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Secure Smart Contracts</span>
            </div>
            <div className="flex items-center space-x-2">
              <Coins className="h-5 w-5 text-agio-100" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Flexible Loan Terms</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8"
          >
            <WalletConnect />
          </motion.div>
        </div>
      </div>
    </section>
  )
}


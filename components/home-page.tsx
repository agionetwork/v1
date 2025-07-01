"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-gradient-to-b dark:from-blue-950 dark:via-blue-950 dark:to-blue-700">
      <Header />
      <div className="relative z-10">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </div>
    </main>
  )
} 
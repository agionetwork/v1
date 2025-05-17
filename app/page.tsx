"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import Footer from "@/components/footer"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className={`relative min-h-screen ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950' 
        : 'bg-white'
    }`}>
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
  );
} 
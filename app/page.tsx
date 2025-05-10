"use client"

import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import Footer from "@/components/footer"
import ParticlesBackground from "@/components/particles-background"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import SocialIcons from "@/components/social-icons"

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    console.log("Homepage mounted, ParticlesBackground should appear");
  }, []);

  const scrollToStats = () => {
    statsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen">
      <ParticlesBackground />
      <div className="relative z-10">
        <HeroSection onScrollClick={scrollToStats} />
        <div ref={statsRef}>
          <StatsSection />
        </div>
        <FeaturesSection />
        <Footer />
      </div>
    </main>
  );
} 
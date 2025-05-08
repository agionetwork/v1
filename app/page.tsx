"use client"

import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import ParticlesBackground from "@/components/particles-background"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    console.log("Homepage mounted, ParticlesBackground should appear");
  }, []);

  const scrollToStats = () => {
    statsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-0">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
    </main>
  )
} 
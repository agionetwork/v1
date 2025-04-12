"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import SocialIcons from "@/components/social-icons"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function WaitlistPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      baseX: number
      baseY: number
    }> = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000)
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2
        })
      }
    }

    const drawLines = () => {
      const maxDistance = 150
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.2
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = theme === 'dark'
              ? `rgba(255, 255, 255, ${opacity})`
              : `rgba(37, 99, 235, ${opacity})`
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = theme === 'dark'
          ? `rgba(255, 255, 255, ${particle.opacity})`
          : `rgba(37, 99, 235, ${particle.opacity})`
        ctx.fill()
      })

      drawLines()
      requestAnimationFrame(animate)
    }

    resizeCanvas()
    createParticles()
    animate()

    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [theme])

  return (
    <div className="relative h-full flex flex-col items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
      />

      <header className="fixed top-0 left-0 right-0 z-20 bg-transparent flex justify-between p-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SocialIcons 
            linkedin="https://linkedin.com/company/agio-network"
            discord="https://discord.com/invite/EmwdzjC2DM"
            x="https://x.com/agio_network"
            telegram="https://t.me/agio_network"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image 
            src="/images/blue-hat.png" 
            alt="Logo" 
            width={100} 
            height={100} 
            className="object-contain" 
          />
        </motion.div>
      </header>

      <div className="relative z-10 text-center px-4 w-full md:w-1/2 mx-auto flex flex-col items-center justify-center h-screen pt-20 md:pt-0 pl-0 md:pl-96">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-2xl md:text-4xl font-bold mb-6 drop-shadow-lg whitespace-nowrap">
            WELCOME TO <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">AGIO NETWORK</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-6 drop-shadow-lg whitespace-nowrap">
            Start making money by lending to: Friends, Family and well-known Businesses.
          </p>

          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg whitespace-nowrap">
            JOIN THE <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">WAITLIST</span> NOW!
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center"
        >
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSdbOWUOW4gG-zQp4Ht69NacWAii7lsYQOV3mrv_6UfFsfPN0g/viewform', '_blank')}
          >
            <ArrowRight className="w-5 h-5" />
            FILL THE FORM
          </Button>
        </motion.div>
      </div>

      <div className="fixed bottom-0 left-0 z-20 w-full md:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <Image 
            src="/images/mragio.png" 
            alt="Mr Agio" 
            width={800} 
            height={800} 
            className="object-contain w-full" 
          />
        </motion.div>
      </div>
    </div>
  )
} 
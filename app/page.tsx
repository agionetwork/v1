import HeroSection from "@/components/hero-section"
import StatsSection from "@/components/stats-section"
import FeaturesSection from "@/components/features-section"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <section className="w-full min-h-screen flex items-center justify-center py-8 md:py-12 lg:py-16 xl:py-24">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Make money by lending tokens to friends, family and businesses.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Borrow and lend directly with other users, using Solana tokens as collaterals. Build your reputation, earn interest, and
                    access liquidity with lightning-fast transactions and minimal fees.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard?tab=overview">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      LAUNCH APP <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/loan-offers/marketplace">
                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                      LOAN OFFERS
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative w-[350px] h-[350px] hidden lg:block mx-auto">
                <Image
                  src="/images/blue-hat.png"
                  alt="Blue Hat"
                  width={350}
                  height={350}
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>
        <StatsSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
} 
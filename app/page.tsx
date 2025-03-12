import Link from "next/link"
import { ArrowRight, BarChart3, Shield, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import HeroSection from "@/components/hero-section"
import StatsSection from "@/components/stats-section"
import WalletConnect from "@/components/wallet-connect"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-primary text-primary-foreground">
        <Link className="flex items-center justify-center" href="#">
          <Shield className="h-6 w-6 text-agio" />
          <span className="ml-2 text-xl font-bold">AGIO NETWORK</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            FEATURES
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            ABOUT
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            DOCS
          </Link>
        </nav>
        <div className="ml-4">
          <WalletConnect />
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4 text-left">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Empréstimos P2P Seguros na Blockchain
                  </h1>
                  <p className="text-muted-foreground md:text-xl">
                    Faça empréstimos de tokens para amigos, família e empresas. Empreste e tome emprestado diretamente com outros usuários.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/marketplace">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      P2P MARKETPLACE <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button variant="outline">LAUNCH APP</Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto flex w-full items-center justify-center">
                <img
                  alt="Lending Platform"
                  className="aspect-[4/3] overflow-hidden rounded-xl object-contain object-center"
                  src="/images/lending-hero.png"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl mx-auto">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose AGIO NETWORK?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AGIO combines the best of DeFi with Social Media to create a trustworthy lending ecosystem.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              <Card className="text-center">
                <CardHeader className="flex flex-col items-center gap-4 pb-2">
                  <Shield className="h-8 w-8 text-agio" />
                  <CardTitle className="text-xl">Secure Lending</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Smart contracts ensure all lending agreements are secure, transparent, and immutable.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader className="flex flex-col items-center gap-4 pb-2">
                  <Users className="h-8 w-8 text-agio" />
                  <CardTitle className="text-xl">Social Reputation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Build your reputation through successful transactions and community engagement.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader className="flex flex-col items-center gap-4 pb-2">
                  <BarChart3 className="h-8 w-8 text-agio" />
                  <CardTitle className="text-xl">Transparent Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Market-driven interest rates with no hidden fees or complicated terms.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <StatsSection />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Start?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Connect your wallet and join thousands of users already lending and borrowing on our platform.
                </p>
              </div>
              <Link href="/dashboard">
                <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                  Launch App <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-primary text-primary-foreground">
        <p className="text-xs text-white">© 2025 AGIO NETWORK. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Docs
          </Link>
        </nav>
      </footer>
    </div>
  )
}


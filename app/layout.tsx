import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: "Agio Network - Decentralized Social Finance",
  description: "A decentralized Social Finance for Borrowers and Lenders. Make money by lending to Friends, Family, and well-known Businesses.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-gradient-to-b from-background to-background/80 font-sans antialiased",
        "text-foreground selection:bg-primary/20",
        inter.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
} 
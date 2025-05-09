"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ClientProviders } from "@/components/providers/client-providers"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClientProviders>
        {children}
        <Toaster />
      </ClientProviders>
    </ThemeProvider>
  )
} 
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

interface ThemeProviderProps {
  children: React.ReactNode
  [key: string]: any
}

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
<<<<<<< HEAD
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
=======
      defaultTheme="light"
      enableSystem
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
} 
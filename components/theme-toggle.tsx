"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn("relative p-2 rounded-md bg-transparent border-0 outline-none focus:outline-none hover:bg-transparent", className)}
      style={{ boxShadow: 'none' }}
    >
      <Moon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-agio-light dark:hover:text-agio-light" />
      <Sun className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 left-2 top-2 hover:text-agio-light dark:hover:text-agio-light" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}


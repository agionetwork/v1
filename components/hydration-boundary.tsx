"use client"

import { useEffect, useState, ReactNode } from "react"

interface HydrationBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Um componente de fronteira para evitar erros de hidratação
 * Renderiza seu conteúdo apenas no lado do cliente após a hidratação
 * 
 * @param children Conteúdo a ser renderizado após hidratação
 * @param fallback Conteúdo opcional para exibir antes da hidratação (esqueleto)
 */
export function HydrationBoundary({ children, fallback }: HydrationBoundaryProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return fallback ? <>{fallback}</> : null
  }

  return <>{children}</>
} 
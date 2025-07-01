"use client"

import { useEffect } from 'react'

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const logPerformanceMetrics = () => {
      const perfData = window.performance
      const timing = perfData.timing
      const navigation = perfData.navigation

      // Métricas básicas
      const metrics = {
        loadTime: timing.loadEventEnd - timing.navigationStart,
        domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
        firstPaint: timing.responseEnd - timing.navigationStart,
        redirects: navigation.redirectCount,
        navigationType: navigation.type === 0 ? 'navegação normal' : 
                       navigation.type === 1 ? 'recarregamento' : 
                       'navegação com histórico'
      }

      console.log('Métricas de Performance:', metrics)

      // Métricas de recursos
      const resources = perfData.getEntriesByType('resource')
      const resourceMetrics = resources.map(resource => ({
        name: resource.name,
        duration: resource.duration,
        size: (resource as PerformanceResourceTiming).transferSize,
        type: (resource as PerformanceResourceTiming).initiatorType
      }))

      console.log('Métricas de Recursos:', resourceMetrics)
    }

    // Monitora erros
    const errorHandler = (event: ErrorEvent) => {
      console.error('Error:', event.error)
    }

    // Monitora rejeições de promises
    const rejectionHandler = (event: PromiseRejectionEvent) => {
      console.error('Unhandled Promise Rejection:', event.reason)
    }

    // Adiciona listeners
    window.addEventListener('error', errorHandler)
    window.addEventListener('unhandledrejection', rejectionHandler)

    // Executa quando a página estiver carregada
    if (document.readyState === 'complete') {
      logPerformanceMetrics()
    } else {
      window.addEventListener('load', logPerformanceMetrics)
    }

    // Cleanup
    return () => {
      window.removeEventListener('error', errorHandler)
      window.removeEventListener('unhandledrejection', rejectionHandler)
      window.removeEventListener('load', logPerformanceMetrics)
    }
  }, [])

  return null
} 
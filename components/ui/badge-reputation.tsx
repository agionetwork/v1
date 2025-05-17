import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn, getReputationColor } from "@/lib/utils"

/**
 * Componente de Badge para exibir pontuação de reputação com cores baseadas no valor
 * 
 * - Verde (80-100): Excelente reputação
 * - Amarelo (50-79): Boa reputação
 * - Laranja (25-49): Reputação mediana
 * - Vermelho (0-24): Reputação baixa
 */

export interface ReputationBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  score: number
  showValue?: boolean
}

export function ReputationBadge({ score, showValue = true, className, ...props }: ReputationBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        getReputationColor(score),
        className
      )}
      {...props}
    >
      {showValue ? `${score}/100` : null}
    </div>
  )
} 
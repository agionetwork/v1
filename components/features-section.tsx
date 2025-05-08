"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Users, Lock } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">
          Recursos que Fazem a Diferença
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mb-4" />
              <CardTitle>Segurança Avançada</CardTitle>
              <CardDescription>
                Smart contracts auditados e verificados para garantir a segurança dos seus ativos.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-primary mb-4" />
              <CardTitle>Transações Rápidas</CardTitle>
              <CardDescription>
                Aproveite a velocidade da rede Solana para transações instantâneas.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-4" />
              <CardTitle>Comunidade Ativa</CardTitle>
              <CardDescription>
                Conecte-se com outros usuários e participe de uma comunidade vibrante.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Lock className="h-8 w-8 text-primary mb-4" />
              <CardTitle>Controle Total</CardTitle>
              <CardDescription>
                Mantenha o controle total dos seus ativos com nossa plataforma descentralizada.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  )
} 
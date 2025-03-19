import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  Shield,
  Activity
} from "lucide-react"

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  }
}

function StatItem({ icon, value, label, description, trend }: StatItemProps) {
  return (
    <Card className="border-none shadow-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px]">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            {icon}
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline space-x-2">
              <h3 className="text-3xl font-bold tracking-tighter">{value}</h3>
              {trend && (
                <span className={`text-xs px-2 py-1 rounded-full flex items-center ${trend.isPositive ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                  {trend.isPositive ? '+' : ''}{trend.value}
                  <TrendingUp className={`h-3 w-3 ml-1 ${!trend.isPositive && 'rotate-180'}`} />
                </span>
              )}
            </div>
            <p className="text-sm font-medium">{label}</p>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function StatsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative">
      {/* Removendo os elementos decorativos de fundo pois já estão na homepage */}
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 mb-4">
            <Activity className="h-4 w-4 mr-2" />
            Platform Metrics
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Platform Statistics
          </h2>
          <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
            Explore our platform's growth and impact in decentralized finance (DeFi)
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <StatItem 
            icon={<CreditCard className="h-5 w-5" />}
            value="$1.5M+"
            label="Accumulated loan volume"
            description="Consistent monthly growth"
            trend={{
              value: "32%",
              isPositive: true
            }}
          />
          <StatItem 
            icon={<Users className="h-5 w-5" />}
            value="1,245+"
            label="Active Users"
            description="Consistent monthly growth"
            trend={{
              value: "18.7%",
              isPositive: true
            }}
          />
          <StatItem 
            icon={<Shield className="h-5 w-5" />}
            value="99.2%"
            label="Successful Loans"
            description="Loan repayment success rate"
            trend={{
              value: "0.5%",
              isPositive: true
            }}
          />
        </div>
        
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center justify-center gap-x-2 rounded-full bg-white/80 dark:bg-gray-800/80 p-1 text-sm text-muted-foreground backdrop-blur-md border border-gray-200 dark:border-gray-700">
            <span className="inline-flex animate-pulse h-2 w-2 rounded-full bg-green-500"></span>
            <span className="pr-2">Data updated in real-time</span>
          </div>
        </div>
      </div>
    </section>
  )
}


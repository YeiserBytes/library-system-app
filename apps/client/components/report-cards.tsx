import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, TrendingUp, AlertTriangle } from "lucide-react"

const stats = [
  {
    title: "Préstamos del Mes",
    value: "142",
    change: "+12%",
    icon: BookOpen,
    trend: "up",
  },
  {
    title: "Usuarios Activos",
    value: "89",
    change: "+8%",
    icon: Users,
    trend: "up",
  },
  {
    title: "Tasa de Devolución",
    value: "94%",
    change: "+3%",
    icon: TrendingUp,
    trend: "up",
  },
  {
    title: "Préstamos Vencidos",
    value: "7",
    change: "-2",
    icon: AlertTriangle,
    trend: "down",
  },
]

export function ReportCards() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs mt-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {stat.change} respecto al mes anterior
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

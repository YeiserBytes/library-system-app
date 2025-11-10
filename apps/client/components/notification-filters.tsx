"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, AlertCircle, CheckCircle2, Clock, BookOpen } from "lucide-react"

const filters = [
  { id: "all", label: "Todas", icon: Bell, count: 12 },
  { id: "overdue", label: "Vencidos", icon: AlertCircle, count: 5 },
  { id: "due-soon", label: "Por Vencer", icon: Clock, count: 3 },
  { id: "returned", label: "Devueltos", icon: CheckCircle2, count: 2 },
  { id: "reserved", label: "Reservas", icon: BookOpen, count: 2 },
]

export function NotificationFilters() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtrar por Tipo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {filters.map((filter) => {
          const Icon = filter.icon
          return (
            <Button key={filter.id} variant="ghost" className="w-full justify-between">
              <span className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {filter.label}
              </span>
              <Badge variant="secondary">{filter.count}</Badge>
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}

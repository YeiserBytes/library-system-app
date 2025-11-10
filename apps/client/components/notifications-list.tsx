"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Clock, CheckCircle2, BookOpen, X } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "overdue",
    title: "Préstamo Vencido",
    message: "El libro 'El Principito' prestado a Carlos Pérez tiene 3 días de retraso",
    time: "Hace 2 horas",
    read: false,
  },
  {
    id: 2,
    type: "due-soon",
    title: "Préstamo Por Vencer",
    message: "El préstamo de 'Rayuela' a Luis Rodríguez vence mañana",
    time: "Hace 5 horas",
    read: false,
  },
  {
    id: 3,
    type: "reserved",
    title: "Libro Disponible",
    message: "'Don Quijote' ya está disponible para Ana Martínez (reserva)",
    time: "Hace 1 día",
    read: false,
  },
  {
    id: 4,
    type: "returned",
    title: "Devolución Completada",
    message: "María González devolvió 'Cien Años de Soledad' en buen estado",
    time: "Hace 1 día",
    read: true,
  },
  {
    id: 5,
    type: "overdue",
    title: "Préstamo Vencido",
    message: "'La Casa de los Espíritus' de Sofia Torres tiene 1 día de retraso",
    time: "Hace 2 días",
    read: false,
  },
]

function getNotificationIcon(type: string) {
  switch (type) {
    case "overdue":
      return <AlertCircle className="h-5 w-5 text-destructive" />
    case "due-soon":
      return <Clock className="h-5 w-5 text-yellow-600" />
    case "returned":
      return <CheckCircle2 className="h-5 w-5 text-green-600" />
    case "reserved":
      return <BookOpen className="h-5 w-5 text-blue-600" />
    default:
      return <AlertCircle className="h-5 w-5" />
  }
}

function getNotificationBadge(type: string) {
  switch (type) {
    case "overdue":
      return <Badge variant="destructive">Urgente</Badge>
    case "due-soon":
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Próximo</Badge>
    case "returned":
      return <Badge variant="secondary">Completado</Badge>
    case "reserved":
      return <Badge variant="default">Reserva</Badge>
    default:
      return null
  }
}

export function NotificationsList() {
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card key={notification.id} className={notification.read ? "opacity-60" : ""}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-sm">{notification.title}</h3>
                  {getNotificationBadge(notification.type)}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>

              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

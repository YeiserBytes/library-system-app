import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock } from "lucide-react";

const activities = [
  {
    id: 1,
    user: "Juan Pérez",
    action: "Préstamo realizado",
    book: "Cien Años de Soledad",
    time: "Hace 5 minutos",
    status: "active",
    initials: "JP",
  },
  {
    id: 2,
    user: "Ana Martínez",
    action: "Devolución completada",
    book: "El Principito",
    time: "Hace 15 minutos",
    status: "completed",
    initials: "AM",
  },
  {
    id: 3,
    user: "Carlos López",
    action: "Reserva confirmada",
    book: "Don Quijote de la Mancha",
    time: "Hace 1 hora",
    status: "pending",
    initials: "CL",
  },
  {
    id: 4,
    user: "María García",
    action: "Préstamo vencido",
    book: "La Odisea",
    time: "Hace 2 horas",
    status: "overdue",
    initials: "MG",
  },
];

const statusConfig = {
  active: { label: "Activo", color: "bg-primary text-primary-foreground" },
  completed: {
    label: "Completado",
    color: "bg-chart-5 text-primary-foreground",
  },
  pending: {
    label: "Pendiente",
    color: "bg-secondary text-secondary-foreground",
  },
  overdue: {
    label: "Vencido",
    color: "bg-destructive text-destructive-foreground",
  },
};

export function RecentActivity() {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Actividad Reciente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {activity.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-medium text-sm">{activity.user}</p>
                  <Badge
                    variant="secondary"
                    className={`${
                      statusConfig[activity.status as keyof typeof statusConfig]
                        .color
                    } text-xs`}
                  >
                    {
                      statusConfig[activity.status as keyof typeof statusConfig]
                        .label
                    }
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {activity.action}
                </p>
                <p className="text-sm font-medium text-foreground/80">
                  {activity.book}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

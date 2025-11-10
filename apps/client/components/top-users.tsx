import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const topUsers = [
  { name: "María González", type: "Docente", loans: 15, initials: "MG" },
  { name: "Carlos Pérez", type: "Estudiante", loans: 12, initials: "CP" },
  { name: "Ana Martínez", type: "Docente", loans: 11, initials: "AM" },
  { name: "Luis Rodríguez", type: "Estudiante", loans: 9, initials: "LR" },
  { name: "Sofia Torres", type: "Estudiante", loans: 8, initials: "ST" },
]

export function TopUsers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usuarios Más Activos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topUsers.map((user, index) => (
            <div key={user.name} className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                {index + 1}
              </div>
              <Avatar className="h-10 w-10">
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium leading-tight">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.type}</p>
              </div>
              <Badge variant="secondary">{user.loans} préstamos</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

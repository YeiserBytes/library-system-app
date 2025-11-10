"use client"

import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, CheckCircle2, RefreshCw, AlertCircle } from "lucide-react"

const loans = [
  {
    id: 1,
    user: "María González",
    userType: "Docente",
    book: "Cien Años de Soledad",
    loanDate: "2025-01-15",
    dueDate: "2025-01-29",
    status: "active",
    daysLeft: 5,
  },
  {
    id: 2,
    user: "Carlos Pérez",
    userType: "Estudiante",
    book: "El Principito",
    loanDate: "2025-01-18",
    dueDate: "2025-01-21",
    status: "overdue",
    daysLeft: -3,
  },
  {
    id: 3,
    user: "Ana Martínez",
    userType: "Docente",
    book: "Don Quijote de la Mancha",
    loanDate: "2025-01-10",
    dueDate: "2025-01-24",
    status: "returned",
    daysLeft: 0,
  },
  {
    id: 4,
    user: "Luis Rodríguez",
    userType: "Estudiante",
    book: "Rayuela",
    loanDate: "2025-01-19",
    dueDate: "2025-01-22",
    status: "active",
    daysLeft: 1,
  },
  {
    id: 5,
    user: "Sofia Torres",
    userType: "Estudiante",
    book: "La Casa de los Espíritus",
    loanDate: "2025-01-17",
    dueDate: "2025-01-20",
    status: "overdue",
    daysLeft: -1,
  },
]

function getStatusBadge(status: string, daysLeft: number) {
  if (status === "returned") {
    return (
      <Badge variant="secondary" className="gap-1">
        <CheckCircle2 className="h-3 w-3" />
        Devuelto
      </Badge>
    )
  }
  if (status === "overdue" || daysLeft < 0) {
    return (
      <Badge variant="destructive" className="gap-1">
        <AlertCircle className="h-3 w-3" />
        Vencido
      </Badge>
    )
  }
  if (daysLeft <= 1) {
    return (
      <Badge className="gap-1 bg-yellow-500 hover:bg-yellow-600">
        <AlertCircle className="h-3 w-3" />
        Por vencer
      </Badge>
    )
  }
  return (
    <Badge variant="default" className="gap-1">
      Activo
    </Badge>
  )
}

export function LoansTable() {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Libro</TableHead>
            <TableHead>Fecha Préstamo</TableHead>
            <TableHead>Fecha Límite</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Días Restantes</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.id}>
              <TableCell className="font-medium">{loan.user}</TableCell>
              <TableCell>
                <Badge variant="outline">{loan.userType}</Badge>
              </TableCell>
              <TableCell>{loan.book}</TableCell>
              <TableCell className="text-muted-foreground">{loan.loanDate}</TableCell>
              <TableCell className="text-muted-foreground">{loan.dueDate}</TableCell>
              <TableCell>{getStatusBadge(loan.status, loan.daysLeft)}</TableCell>
              <TableCell>
                {loan.status === "returned" ? (
                  <span className="text-muted-foreground">-</span>
                ) : (
                  <span className={loan.daysLeft < 0 ? "text-destructive font-medium" : "text-foreground"}>
                    {loan.daysLeft < 0 ? `${Math.abs(loan.daysLeft)} días de retraso` : `${loan.daysLeft} días`}
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {loan.status !== "returned" && (
                      <>
                        <DropdownMenuItem className="gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Registrar Devolución
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <RefreshCw className="h-4 w-4" />
                          Renovar Préstamo
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

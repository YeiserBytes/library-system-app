"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export function LoanFilters() {
  return (
    <Card className="p-4 mb-6">
      <div className="grid md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por usuario o libro..." className="pl-10" />
          </div>
        </div>

        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="active">Activos</SelectItem>
            <SelectItem value="overdue">Vencidos</SelectItem>
            <SelectItem value="returned">Devueltos</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Usuario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="student">Estudiantes</SelectItem>
            <SelectItem value="teacher">Docentes</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  )
}

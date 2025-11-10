import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const topBooks = [
  { title: "Cien Años de Soledad", author: "Gabriel García Márquez", loans: 28 },
  { title: "Don Quijote de la Mancha", author: "Miguel de Cervantes", loans: 24 },
  { title: "El Principito", author: "Antoine de Saint-Exupéry", loans: 22 },
  { title: "1984", author: "George Orwell", loans: 19 },
  { title: "Rayuela", author: "Julio Cortázar", loans: 17 },
]

export function TopBooks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Libros Más Prestados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topBooks.map((book, index) => (
            <div key={book.title} className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="font-medium leading-tight">{book.title}</p>
                <p className="text-sm text-muted-foreground">{book.author}</p>
              </div>
              <Badge variant="secondary">{book.loans} préstamos</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

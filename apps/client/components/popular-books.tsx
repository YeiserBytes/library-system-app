import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

const books = [
  {
    title: "Cien Años de Soledad",
    author: "Gabriel García Márquez",
    loans: 45,
    available: 2,
  },
  {
    title: "El Principito",
    author: "Antoine de Saint-Exupéry",
    loans: 38,
    available: 5,
  },
  {
    title: "Don Quijote",
    author: "Miguel de Cervantes",
    loans: 32,
    available: 1,
  },
  {
    title: "1984",
    author: "George Orwell",
    loans: 28,
    available: 3,
  },
];

export function PopularBooks() {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Libros Populares
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {books.map((book, index) => (
            <div
              key={book.title}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">
                  #{index + 1}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm mb-1 leading-tight">
                  {book.title}
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  {book.author}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {book.loans} préstamos
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      book.available > 0
                        ? "border-chart-5 text-chart-5"
                        : "border-destructive text-destructive"
                    }`}
                  >
                    {book.available} disponibles
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

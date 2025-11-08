import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, BookPlus, UserPlus, FileText } from "lucide-react";

const actions = [
  {
    title: "Nuevo Préstamo",
    icon: Plus,
    color: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  {
    title: "Registrar Libro",
    icon: BookPlus,
    color: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  },
  {
    title: "Nuevo Usuario",
    icon: UserPlus,
    color: "bg-accent text-accent-foreground hover:bg-accent/90",
  },
  {
    title: "Generar Reporte",
    icon: FileText,
    color: "bg-muted text-foreground hover:bg-muted/80",
  },
];

export function QuickActions() {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.title}
              variant="outline"
              className={`h-auto flex-col gap-2 p-4 ${action.color} border-0`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium text-center leading-tight">
                {action.title}
              </span>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}

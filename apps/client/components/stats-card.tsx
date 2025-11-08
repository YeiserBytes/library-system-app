import { getStats } from "@/actions/books";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Clock, TrendingUp } from "lucide-react";
import { cookies } from "next/headers";

export async function StatsCards() {
  const token = (await cookies()).get("token")?.value || "";
  const {
    totalBooks,
    totalLoans,
    currentBooksChange,
    currentReturns,
    currentReturnsChange,
    currentLoansChange,
    totalActiveBooks,
    currentActiveBooksChange,
  } = await getStats({ token });

  const stats = [
    {
      title: "Total Libros",
      value: totalBooks.toString(),
      change: `+${currentBooksChange.toFixed(1)}%`,
      icon: BookOpen,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      title: "Préstamos Activos",
      value: totalLoans.toString(),
      change: `+${currentLoansChange.toFixed(1)}%`,
      icon: Users,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    },
    {
      title: "Devoluciones Hoy",
      value: currentReturns.toString(),
      change: `-${currentReturnsChange.toFixed(1)}%`,
      icon: Clock,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
    },
    {
      title: "Disponibles",
      value: totalActiveBooks.toString(),
      change: `+${currentActiveBooksChange.toFixed(1)}%`,
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span
                  className={`text-sm font-medium ${
                    stat.change.startsWith("+")
                      ? "text-green-500"
                      : "text-red-500 "
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

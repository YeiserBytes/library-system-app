import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAllBooks } from "@/actions/books";
import { StatsCards } from "@/components/stats-card";
import { RecentActivity } from "@/components/recent-activity";
import { QuickActions } from "@/components/quick-actions";
import { PopularBooks } from "@/components/popular-books";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/signin");
  }

  const books = await getAllBooks({ token });
  console.log(books.length);

  return (
    <section className="container mx-auto px-4 py-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">Panel de Control</h1>
        <p className="text-muted-foreground">
          Bienvenido de vuelta, aquí está el resumen de tu biblioteca
        </p>
      </header>

      <StatsCards />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RecentActivity />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <PopularBooks />
        </div>
      </div>
    </section>
  );
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAllBooks } from "@/actions/books";

import HeaderPage from "@/components/header-page";
import { RecentActivity } from "@/components/recent-activity";
import { PopularBooks } from "@/components/popular-books";
import { QuickActions } from "@/components/quick-actions";
import { StatsCards } from "@/components/stats-card";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/signin");
  }

  const books = await getAllBooks({ token });
  console.log(books.length);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-8 py-4 space-y-8">
        <HeaderPage title="Panel de Control" description="Bienvenido de vuelta, aquí está el resumen de tu biblioteca" />

        {/* <StatsCards /> */}

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <RecentActivity />
          </div>
          <div className="space-y-6">
            <QuickActions />
            <PopularBooks />
          </div>
        </div>
      </main>
    </div>
  );
}

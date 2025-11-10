import { Plus } from "lucide-react";
import HeaderPage from "@/components/header-page";
import { LoanFilters } from "@/components/loan-filters";
import { LoansTable } from "@/components/loans-table";
import { Button } from "@/components/ui/button";

export default function LoansPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <HeaderPage
            title="Gestión de Préstamos"
            description="Administra préstamos, devoluciones y renovaciones"
          />
          <Button size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Nuevo Préstamo
          </Button>
        </div>

        <LoanFilters />
        <LoansTable />
      </main>
    </div>
  );
}

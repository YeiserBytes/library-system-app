import { DashboardHeader } from "@/components/dashboard-header"
import HeaderPage from "@/components/header-page"
import { ReportCards } from "@/components/report-cards"
import { ReportCharts } from "@/components/report-charts"
import { TopBooks } from "@/components/top-books"
import { TopUsers } from "@/components/top-users"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <HeaderPage title="Reportes y Estadísticas" description="Análisis detallado del uso de la biblioteca" />
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <FileText className="h-4 w-4" />
              Exportar PDF
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Exportar Excel
            </Button>
          </div>
        </div>

        <ReportCards />
        <ReportCharts />

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <TopBooks />
          <TopUsers />
        </div>
      </main>
    </div>
  )
}

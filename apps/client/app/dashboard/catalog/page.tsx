import { BookGrid } from "@/components/book-grid"

import { CatalogFilters } from "@/components/catalog-filters"
import HeaderPage from "@/components/header-page"

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-8 py-8">
        <HeaderPage title="Catálogo de Libros" description="Explora y gestiona toda la colección de la biblioteca" />

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <BookGrid />
          </div>
          <aside className="lg:col-span-1">
            <CatalogFilters />
          </aside>
        </div>
      </main>
    </div>
  )
}

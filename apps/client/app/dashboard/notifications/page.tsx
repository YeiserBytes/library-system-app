import { NotificationsList } from "@/components/notifications-list"
import { NotificationFilters } from "@/components/notification-filters"
import HeaderPage from "@/components/header-page"

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <HeaderPage title="Notificaciones" description="Centro de alertas y avisos del sistema" />

        <div className="grid lg:grid-cols-3 gap-6">
          <aside className="lg:col-span-1">
            <NotificationFilters />
          </aside>
          <div className="lg:col-span-2">
            <NotificationsList />
          </div>
        </div>
      </main>
    </div>
  )
}

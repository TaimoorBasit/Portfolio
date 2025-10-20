import { Metadata } from 'next'
import { AdminSidebar } from '@/components/AdminSidebar'

export const metadata: Metadata = {
  title: 'Admin Panel - Portfolio',
  description: 'Admin panel for managing portfolio content',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-obsidian text-white">
      <div className="flex h-screen">
        <div className="w-64 flex-shrink-0">
          <AdminSidebar />
        </div>
        <div className="flex-1 overflow-auto">
          <main className="p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
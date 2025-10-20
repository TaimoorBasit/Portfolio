import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Sign In - Portfolio',
  description: 'Admin sign in page',
}

export default function AdminSignInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-obsidian text-white">
      {children}
    </div>
  )
}

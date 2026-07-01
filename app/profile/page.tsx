import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'

export const metadata: Metadata = {
  title: 'Profile',
}

export default function ProfilePage() {
  return (
    <AppShell
      title="Profile"
      description="Your health story, preferences, and Mauri settings will live here."
    >
      <div className="rounded-xl border border-border bg-white/75 p-6 shadow-sm">
        <h2 className="font-playfair text-3xl font-normal text-teal-dark">
          Profile coming soon
        </h2>
        <p className="mt-4 leading-7 text-ink">
          This area will help Mauri remember your story, goals, and preferences
          as the app grows.
        </p>
      </div>
    </AppShell>
  )
}

import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import TodaysLessonWidget from '@/components/TodaysLessonWidget'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your Mauri dashboard for daily guidance and recovery support.',
}

export default function DashboardPage() {
  return (
    <AppShell
      title="Dashboard"
      description="A calm place to continue your recovery journey one small step at a time."
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <TodaysLessonWidget />
        <section className="rounded-xl border border-border bg-white/75 p-5 shadow-sm sm:p-6">
          <h2 className="font-playfair text-3xl font-normal leading-tight text-teal-dark">
            Today’s focus
          </h2>
          <p className="mt-4 leading-7 text-ink">
            Keep your next step simple: learn one thing, track one signal, and
            notice one small change without judging your body.
          </p>
        </section>
      </div>
    </AppShell>
  )
}

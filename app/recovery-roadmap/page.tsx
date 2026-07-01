import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'

export const metadata: Metadata = {
  title: 'Recovery Roadmap',
}

export default function RecoveryRoadmapPage() {
  return (
    <AppShell
      title="Recovery Roadmap"
      description="Your personalized recovery roadmap will live here as Mauri grows."
    >
      <div className="rounded-xl border border-border bg-white/75 p-6 shadow-sm">
        <h2 className="font-playfair text-3xl font-normal text-teal-dark">
          Roadmap coming soon
        </h2>
        <p className="mt-4 leading-7 text-ink">
          This space will organize education, habits, tracking, and review
          prompts into a gentle sequence.
        </p>
      </div>
    </AppShell>
  )
}

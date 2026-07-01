import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'

export const metadata: Metadata = {
  title: 'Tracking',
}

export default function TrackingPage() {
  return (
    <AppShell
      title="Tracking"
      description="Track the signals that help you understand your body over time."
    >
      <div className="rounded-xl border border-border bg-white/75 p-6 shadow-sm">
        <h2 className="font-playfair text-3xl font-normal text-teal-dark">
          Tracking coming soon
        </h2>
        <p className="mt-4 leading-7 text-ink">
          Periods, pain, energy, mood, sleep, cravings, acne, hair fall, and
          other meaningful changes will be tracked here.
        </p>
      </div>
    </AppShell>
  )
}

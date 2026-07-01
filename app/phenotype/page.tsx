import type { Metadata } from 'next'
import Header from '@/components/Header'
import PhenotypeQuiz from '@/components/PhenotypeQuiz'

export const metadata: Metadata = {
  title: 'Mauri Discovery Assessment | Mauri',
  description:
    'Answer a few simple questions to understand your likely hormonal pathway and begin your Mauri recovery journey.',
}

export default function PhenotypePage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <Header />
      <PhenotypeQuiz />
    </main>
  )
}

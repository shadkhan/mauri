import type { Metadata } from 'next'
import Header from '@/components/Header'
import PhenotypeQuiz from '@/components/PhenotypeQuiz'
import { absoluteUrl, siteConfig } from '@/lib/site'

const title = 'Mauri Discovery Assessment | PCOS and Hormonal Pattern Quiz'
const description =
  'Take the Mauri Discovery Assessment to organize your PCOS, PCOD, cycle, pain, and hormonal symptoms before a qualified healthcare conversation.'

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: '/phenotype',
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl('/phenotype'),
    siteName: siteConfig.name,
    type: 'website',
    images: [{ url: siteConfig.ogImage, alt: 'Mauri Discovery Assessment' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [siteConfig.ogImage],
  },
}

export default function PhenotypePage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <Header />
      <PhenotypeQuiz />
    </main>
  )
}

import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutMauriPageContent from '@/components/AboutMauriPageContent'
import { absoluteUrl, siteConfig } from '@/lib/site'

const title = 'About Mauri | Meaning, Mission and Hormonal Health Support'
const description =
  'Learn why Mauri exists, what the name means, and how our educational wellness approach supports women with PCOS, PCOD, painful periods, and hormonal confusion.'

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl('/about'),
    siteName: siteConfig.name,
    type: 'website',
    images: [{ url: siteConfig.ogImage, alt: 'About Mauri' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [siteConfig.ogImage],
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <Header />
      <AboutMauriPageContent />
      <Footer />
    </main>
  )
}

import type { Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import MauriJourneySection from '@/components/MauriJourneySection'
import MauriMethodSection from '@/components/MauriMethodSection'
import WaitlistForm from '@/components/WaitlistForm'
import Footer from '@/components/Footer'
import WhyTrustMauriSection from '@/components/WhyTrustMauriSection'
import { absoluteUrl, siteConfig } from '@/lib/site'

const title = 'Mauri | PCOS, PCOD and Hormonal Health Support'
const description =
  'Understand your hormonal story with Mauri, a warm educational wellness platform for PCOS, PCOD, painful periods, cycle patterns, and supportive recovery guidance.'

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl('/'),
    siteName: siteConfig.name,
    type: 'website',
    images: [{ url: siteConfig.ogImage, alt: 'Mauri hormonal health support' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [siteConfig.ogImage],
  },
}

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <MauriMethodSection />
      <WhyTrustMauriSection />
      <MauriJourneySection />
      <WaitlistForm />
      <Footer />
    </main>
  )
}

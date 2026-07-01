import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutMauriPageContent from '@/components/AboutMauriPageContent'

export const metadata: Metadata = {
  title: 'About Mauri | Integrative PCOS and PCOD Care',
  description:
    'Learn why Mauri was created and how the Mauri Recovery Method supports women with hormonal health challenges.',
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

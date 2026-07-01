import Header from '@/components/Header'
import Hero from '@/components/Hero'
import MauriJourneySection from '@/components/MauriJourneySection'
import MauriMethodSection from '@/components/MauriMethodSection'
import WaitlistForm from '@/components/WaitlistForm'
import Footer from '@/components/Footer'
import WhyTrustMauriSection from '@/components/WhyTrustMauriSection'

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

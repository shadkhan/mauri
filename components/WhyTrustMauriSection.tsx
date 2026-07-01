'use client'

import { motion } from 'framer-motion'
import { HeartHandshake, RefreshCw, UserRoundCheck } from 'lucide-react'
import { PageContainer } from '@/components/PageLayout'

const trustCards = [
  {
    title: 'Built From Real Experience',
    body: 'The Mauri Method has evolved through supporting more than 90 women with hormonal health challenges. Every experience helped refine how we approach care.',
    icon: HeartHandshake,
    colorClass: 'text-teal',
    bgClass: 'bg-teal-light',
  },
  {
    title: 'We Learn From Every Journey',
    body: 'We celebrate progress, but we also study setbacks and relapses. Those lessons help us improve the guidance we provide to future women.',
    icon: RefreshCw,
    colorClass: 'text-purple',
    bgClass: 'bg-purple-light',
  },
  {
    title: 'Personalized, Not Generic',
    body: 'No single diet, supplement, or routine works for everyone. Mauri focuses on understanding your unique story before suggesting a personalized path.',
    icon: UserRoundCheck,
    colorClass: 'text-rose',
    bgClass: 'bg-rose-light',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function WhyTrustMauriSection() {
  return (
    <section
      id="trust"
      className="bg-amber-light/35 px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <PageContainer>
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-teal">
            Why trust Mauri
          </p>
          <h2 className="mt-3 font-playfair text-4xl font-normal leading-tight text-teal-dark sm:text-5xl">
            Why Women Trust The Mauri Method
          </h2>
          <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Mauri was shaped through years of supporting women with hormonal
            health challenges, learning from successes, setbacks, relapses, and
            continual refinement.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-3">
          {trustCards.map((card, index) => {
            const Icon = card.icon

            return (
              <motion.article
                key={card.title}
                className="rounded-xl border border-border bg-warm-white/95 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-md sm:p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
              >
                <div
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${card.bgClass}`}
                >
                  <Icon
                    className={`h-5 w-5 ${card.colorClass}`}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-5 font-playfair text-2xl font-normal leading-tight text-teal-dark">
                  {card.title}
                </h3>
                <p className="mt-3 leading-7 text-ink">{card.body}</p>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          className="mx-auto mt-10 max-w-4xl rounded-xl border border-border bg-warm-white p-6 text-center shadow-sm sm:p-8 lg:mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="font-playfair text-2xl font-normal leading-snug text-teal-dark sm:text-3xl">
            “Experience taught us that lasting improvement rarely comes from
            chasing the latest trend. It comes from understanding your body,
            building sustainable habits, and adjusting the journey as you
            learn.”
          </p>
        </motion.div>
      </PageContainer>
    </section>
  )
}

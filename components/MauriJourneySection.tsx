'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BadgeCheck,
  ClipboardList,
  Compass,
  GraduationCap,
  HeartPulse,
  LineChart,
  Sparkles,
} from 'lucide-react'
import { PageContainer } from '@/components/PageLayout'

const journeySteps = [
  {
    title: 'Begin With Clarity',
    description:
      'Start with a free phenotype quiz so you can stop guessing and begin understanding your likely hormonal pattern.',
    icon: Compass,
    colorClass: 'text-teal',
    bgClass: 'bg-teal-light',
  },
  {
    title: 'Understand Your Story',
    description:
      'See how insulin resistance, androgen excess, estrogen dominance, stress, inflammation, or structural patterns may be shaping your symptoms.',
    icon: HeartPulse,
    colorClass: 'text-rose',
    bgClass: 'bg-rose-light',
  },
  {
    title: 'Walk Into Appointments Prepared',
    description:
      'Know what to discuss with the Mauri care team, which questions to ask, and how to make sense of your reports with more confidence.',
    icon: ClipboardList,
    colorClass: 'text-purple',
    bgClass: 'bg-purple-light',
  },
  {
    title: 'Follow A Gentle Roadmap',
    description:
      'Receive education, diet direction, lifestyle habits, symptom awareness, and supportive guidance that fits your real life.',
    icon: LineChart,
    colorClass: 'text-green',
    bgClass: 'bg-green-light',
  },
  {
    title: 'Track What Truly Matters',
    description:
      'Follow your periods, pain, acne, hair fall, mood, sleep, energy, weight, cravings, and the small signals your body gives you.',
    icon: BadgeCheck,
    colorClass: 'text-teal',
    bgClass: 'bg-teal-light',
  },
  {
    title: 'Celebrate Small Wins',
    description:
      'Notice better energy, improved cycles, reduced pain, calmer mood, healthier habits, and the confidence that returns step by step.',
    icon: Sparkles,
    colorClass: 'text-amber',
    bgClass: 'bg-amber-light',
  },
  {
    title: 'Graduate With Confidence',
    description:
      'Mauri is not built to keep you dependent forever. The goal is to help you understand your body, build confidence, and continue independently.',
    icon: GraduationCap,
    colorClass: 'text-teal-dark',
    bgClass: 'bg-teal-light',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function MauriJourneySection() {
  return (
    <section
      id="journey"
      className="bg-teal-light/45 px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
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
            How your healing journey works
          </p>
          <h2 className="mt-3 font-playfair text-4xl font-normal leading-tight text-teal-dark sm:text-5xl">
            From confusion to clarity, one gentle step at a time
          </h2>
          <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Mauri helps you understand your symptoms, prepare for better care
            conversations with our team, build supportive habits, track
            meaningful changes, and move toward a day when you no longer need
            the app every day.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-10 max-w-5xl lg:mt-14">
          <div
            className="absolute left-5 top-0 hidden h-full w-px bg-border sm:block lg:left-1/2 lg:-translate-x-1/2"
            aria-hidden="true"
          />

          <div className="space-y-4 sm:space-y-6 lg:space-y-0">
            {journeySteps.map((step, index) => {
              const Icon = step.icon
              const desktopSide =
                index % 2 === 0 ? 'lg:pr-[calc(50%+2rem)]' : 'lg:pl-[calc(50%+2rem)]'
              const desktopAlign = index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'

              return (
                <motion.article
                  key={step.title}
                  className={`relative sm:pl-14 lg:min-h-40 lg:pl-0 ${desktopSide}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  transition={{ duration: 0.5, delay: index * 0.04, ease: 'easeOut' }}
                >
                  <div className="absolute left-0 top-5 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-warm-white text-sm font-medium text-teal-dark shadow-sm sm:flex lg:left-1/2 lg:-translate-x-1/2">
                    {index + 1}
                  </div>

                  <div
                    className={`group rounded-xl border border-border bg-warm-white/95 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-md sm:p-6 ${desktopAlign}`}
                  >
                    <div
                      className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${step.bgClass}`}
                    >
                      <Icon
                        className={`h-5 w-5 ${step.colorClass}`}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-sm font-medium text-muted">
                      Step {index + 1}
                    </p>
                    <h3 className="mt-2 font-playfair text-2xl font-normal leading-tight text-teal-dark">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-7 text-ink">
                      {step.description}
                    </p>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>

        <motion.div
          className="mx-auto mt-10 max-w-3xl text-center lg:mt-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="mx-auto mb-6 max-w-2xl font-playfair text-2xl font-normal leading-snug text-teal-dark sm:text-3xl">
            Your symptoms are not random. They may be telling a story your body
            has been waiting for you to understand.
          </p>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href="/phenotype"
              className="inline-flex justify-center rounded-full bg-teal px-7 py-4 text-base font-medium text-white transition hover:bg-teal-dark"
            >
              Start Free Phenotype Assessment
            </Link>
            <Link
              href="/#waitlist"
              className="inline-flex justify-center rounded-full border border-teal px-7 py-4 text-base font-medium text-teal-dark transition hover:bg-teal-light"
            >
              Join the Waitlist
            </Link>
          </div>
        </motion.div>
      </PageContainer>
    </section>
  )
}

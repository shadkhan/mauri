'use client'

import { motion } from 'framer-motion'
import {
  Activity,
  Ear,
  GraduationCap,
  HeartHandshake,
  Search,
  Settings2,
  Sparkles,
} from 'lucide-react'
import { PageContainer } from '@/components/PageLayout'

const methodSteps = [
  {
    title: 'Listen',
    description: 'Understand your symptoms, history, goals, and concerns.',
    icon: Ear,
    colorClass: 'text-teal',
    bgClass: 'bg-teal-light',
  },
  {
    title: 'Discover',
    description:
      'Identify likely hormonal patterns and possible underlying drivers using questionnaires, Mauri care team discussion, and recommended investigations where appropriate.',
    icon: Search,
    colorClass: 'text-purple',
    bgClass: 'bg-purple-light',
  },
  {
    title: 'Personalize',
    description:
      'Build an individualized plan that may include nutrition guidance, movement, education, supplements, and other appropriate supportive approaches based on your needs.',
    icon: Settings2,
    colorClass: 'text-rose',
    bgClass: 'bg-rose-light',
  },
  {
    title: 'Support',
    description:
      'Provide ongoing education, motivation, and regular reviews to help you stay consistent.',
    icon: HeartHandshake,
    colorClass: 'text-teal',
    bgClass: 'bg-teal-light',
  },
  {
    title: 'Track',
    description:
      'Monitor meaningful changes including periods, energy, pain, mood, sleep, weight, acne, hair, and other relevant symptoms.',
    icon: Activity,
    colorClass: 'text-green',
    bgClass: 'bg-green-light',
  },
  {
    title: 'Celebrate',
    description:
      'Recognize progress through meaningful milestones and reinforce healthy habits.',
    icon: Sparkles,
    colorClass: 'text-amber',
    bgClass: 'bg-amber-light',
  },
  {
    title: 'Graduate',
    description:
      'Explain that Mauri aims to help users become confident and independent rather than remaining subscribed indefinitely.',
    icon: GraduationCap,
    colorClass: 'text-teal-dark',
    bgClass: 'bg-teal-light',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function MauriMethodSection() {
  return (
    <section
      id="method"
      className="bg-warm-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
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
            The method behind Mauri
          </p>
          <h2 className="mt-3 font-playfair text-4xl font-normal leading-tight text-teal-dark sm:text-5xl">
            The Mauri Recovery Method
          </h2>
          <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
            A structured, personalized journey designed to help you understand
            your body, address possible underlying drivers, build sustainable
            habits, and work confidently alongside the Mauri care team.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-10 max-w-5xl lg:mt-14">
          <div
            className="absolute left-5 top-0 h-full w-px bg-border lg:left-1/2 lg:-translate-x-1/2"
            aria-hidden="true"
          />

          <div className="grid gap-4 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-6">
            {methodSteps.map((step, index) => {
              const Icon = step.icon
              const isRight = index % 2 === 1

              return (
                <motion.article
                  key={step.title}
                  className={`relative pl-14 ${
                    isRight ? 'lg:col-start-2 lg:pl-0' : 'lg:pr-0'
                  }`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  transition={{ duration: 0.5, delay: index * 0.04, ease: 'easeOut' }}
                >
                  <div className="absolute left-0 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-warm-white text-sm font-medium text-teal-dark shadow-sm lg:hidden">
                    {index + 1}
                  </div>

                  <div
                    className={`group rounded-xl border border-border bg-white/80 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-md sm:p-6 ${
                      isRight ? 'lg:mt-12' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${step.bgClass}`}
                      >
                        <Icon
                          className={`h-5 w-5 ${step.colorClass}`}
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted">
                          Method {index + 1}
                        </p>
                        <h3 className="mt-1 font-playfair text-2xl font-normal leading-tight text-teal-dark">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-4 leading-7 text-ink">
                      {step.description}
                    </p>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>

        <motion.div
          className="mx-auto mt-10 max-w-3xl rounded-xl bg-teal-dark p-6 text-center shadow-sm sm:p-8 lg:mt-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="font-playfair text-2xl font-normal leading-snug text-teal-light sm:text-3xl">
            Our goal isn't to keep you using Mauri forever.
          </p>
          <p className="mt-4 text-base leading-7 text-teal-mid sm:text-lg">
            Our goal is to help you understand your body, build lasting healthy
            habits, and confidently continue your journey.
          </p>
        </motion.div>
      </PageContainer>
    </section>
  )
}

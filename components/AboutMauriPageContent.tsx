'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Leaf,
  MessageCircleHeart,
  Sparkles,
} from 'lucide-react'
import { PageContainer } from '@/components/PageLayout'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const lessons = [
  {
    title: 'Symptoms Have Stories',
    description:
      'Pain, irregular cycles, acne, hair fall, fatigue, and weight changes deserve careful listening, not quick judgment.',
  },
  {
    title: 'One Plan Rarely Fits All',
    description:
      'Women with similar diagnoses may need very different support depending on stress, insulin resistance, inflammation, sleep, nutrition, and medical history.',
  },
  {
    title: 'Education Creates Confidence',
    description:
      'When women understand why a step matters, they are more likely to make steady, compassionate changes.',
  },
]

export default function AboutMauriPageContent() {
  return (
    <div className="bg-warm-white">
      <section className="px-4 pb-14 pt-28 sm:px-6 lg:pb-20">
        <PageContainer>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-auto max-w-4xl text-center"
          >
            <p className="text-sm font-medium uppercase tracking-[0.08em] text-teal">
              About Mauri
            </p>
            <h1 className="mt-3 font-playfair text-4xl font-normal leading-tight text-teal-dark sm:text-5xl">
              Mauri exists to help women feel understood in their own bodies.
            </h1>
            <div className="mx-auto mt-6 max-w-3xl space-y-4 text-lg leading-8 text-ink">
              <p>
                We created Mauri for women who have been told their pain is
                normal, their reports are fine, or their only option is to keep
                trying harder.
              </p>
              <p>
                PCOS, PCOD, painful periods, and hormonal changes can feel
                confusing and lonely. Mauri brings education, supportive
                guidance, and body literacy into one calm place, so women can
                understand their patterns and make informed next steps.
              </p>
            </div>
            <div className="mx-auto mt-8 max-w-3xl rounded-xl bg-teal-light p-6">
              <p className="font-playfair text-2xl font-normal leading-snug text-teal-dark sm:text-3xl">
                Your body is not the enemy. It may be asking to be heard.
              </p>
            </div>
          </motion.div>
        </PageContainer>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16">
        <PageContainer>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-stretch"
          >
            <div className="flex h-full flex-col justify-center rounded-xl bg-teal-dark p-6 text-teal-light sm:p-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-light text-teal">
                <Leaf className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="mt-6 text-sm font-medium uppercase tracking-[0.08em] text-teal-mid">
                Meaning behind the name
              </p>
              <h2 className="mt-3 font-playfair text-4xl font-normal leading-tight text-teal-light sm:text-5xl">
                Why We Chose the Name Mauri
              </h2>
              <p className="mt-5 max-w-md leading-7 text-teal-mid">
                A name chosen for life force, inner vitality, balance, and the
                quiet strength women rebuild through understanding.
              </p>
            </div>

            <div className="flex h-full flex-col justify-center rounded-xl border border-border bg-white/80 p-6 shadow-sm sm:p-8">
              <p className="text-base leading-8 text-ink sm:text-lg">
                We chose the name Mauri because it carries the feeling we wanted
                this platform to create: life, vitality, balance, and inner
                strength. For us, Mauri is not just about managing symptoms. It
                is about helping women reconnect with their body, understand
                their story, and move toward healthier cycles, renewed energy,
                and confidence.
              </p>
              <p className="mt-5 rounded-lg bg-amber-light p-5 text-sm leading-6 text-ink">
                We use Mauri as a brand expression of healing and vitality, with
                respect for its deeper cultural meanings.
              </p>
            </div>
          </motion.div>
        </PageContainer>
      </section>

      <section className="bg-teal-light/45 px-4 py-16 sm:px-6 lg:py-20">
        <PageContainer>
          <div className="grid items-stretch gap-5 lg:grid-cols-2">
            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="flex h-full flex-col rounded-xl border border-border bg-warm-white/95 p-6 shadow-sm sm:p-8"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-purple-light text-purple">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-4 font-playfair text-3xl font-normal leading-tight text-teal-dark">
                Founder Philosophy and Clinical Learning
              </h2>
              <div className="mt-5 space-y-4 leading-8 text-ink">
                <p>
                  Mauri grew from years of listening to women living with
                  hormonal health challenges and learning from their real
                  journeys.
                </p>
                <p>
                  Some improved quickly. Some needed deeper investigation. Some
                  relapsed when life became stressful. Each story shaped a more
                  careful philosophy: support should be personal, educational,
                  steady, and medically responsible.
                </p>
              </div>
            </motion.article>

            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="flex h-full flex-col rounded-xl border border-border bg-warm-white/95 p-6 shadow-sm sm:p-8"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-rose-light text-rose">
                <MessageCircleHeart className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-4 font-playfair text-3xl font-normal leading-tight text-teal-dark">
                Why Mauri Exists
              </h2>
              <div className="mt-5 space-y-4 leading-8 text-ink">
                <p>
                  Too many women are left to connect the dots alone between
                  symptoms, labs, lifestyle, stress, food, movement, and
                  treatment decisions.
                </p>
                <p>
                  Mauri exists to make that process gentler. We help women ask
                  better questions, notice meaningful patterns, and feel less
                  alone while working with qualified healthcare professionals.
                </p>
              </div>
            </motion.article>
          </div>
        </PageContainer>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:py-20">
        <PageContainer>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-light text-teal">
              <BookOpen className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="font-playfair text-4xl font-normal leading-tight text-teal-dark sm:text-5xl">
              Lessons From Real Journeys
            </h2>
            <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Mauri is shaped by lived experiences, clinical curiosity, and the
              humility to keep learning.
            </p>
          </motion.div>

          <div className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
            {lessons.map((lesson, index) => (
              <motion.article
                key={lesson.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex h-full flex-col rounded-xl border border-border bg-white/80 p-6 shadow-sm"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-light text-sm font-medium text-teal-dark">
                  {index + 1}
                </div>
                <h3 className="mt-5 font-playfair text-2xl font-normal leading-tight text-teal-dark">
                  {lesson.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink">
                  {lesson.description}
                </p>
              </motion.article>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:pb-20">
        <PageContainer size="narrow">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-border bg-white/80 p-6 shadow-sm sm:p-8">
              <div className="grid gap-4 sm:grid-cols-[2.75rem_1fr]">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-light text-purple">
                  <HeartHandshake className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-playfair text-3xl font-normal leading-tight text-teal-dark">
                    Our Promise
                  </h2>
                  <div className="mt-4 space-y-4 leading-8 text-ink">
                    <p>
                      We will not promise instant results, perfect cycles, or a
                      single plan that works for everyone.
                    </p>
                    <p>
                      We promise to explain with care, personalize where
                      possible, honor your lived experience, and help you move
                      from confusion toward clarity and confidence.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-teal-dark p-6 text-center shadow-sm sm:p-8">
              <Sparkles className="mx-auto h-9 w-9 text-teal-mid" aria-hidden="true" />
              <h2 className="mt-4 font-playfair text-3xl font-normal leading-tight text-teal-light">
                Welcome to Mauri
              </h2>
              <p className="mx-auto mt-5 max-w-xl leading-7 text-teal-mid">
                A gentle place to learn your body, understand your patterns, and
                take the next step with care.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/phenotype"
                  className="inline-flex justify-center rounded-full bg-amber px-7 py-4 text-base font-medium text-teal-dark transition hover:bg-amber-light"
                >
                  Start Free Phenotype Assessment
                </Link>
                <Link
                  href="/#waitlist"
                  className="inline-flex justify-center rounded-full border border-teal-mid px-7 py-4 text-base font-medium text-teal-light transition hover:bg-teal-mid/10"
                >
                  Join the Waitlist
                </Link>
              </div>
            </div>
          </motion.div>
        </PageContainer>
      </section>
    </div>
  )
}

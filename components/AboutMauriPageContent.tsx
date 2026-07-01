'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BadgeCheck,
  BookOpen,
  Compass,
  GraduationCap,
  HeartHandshake,
  Leaf,
  MessageCircleHeart,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { PageContainer } from '@/components/PageLayout'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const majorSections = [
  {
    title: 'Why Mauri Exists',
    icon: MessageCircleHeart,
    paragraphs: [
      "Mauri wasn't built from a business plan. It was built from years of listening.",
      'Listening to women who felt unheard. Listening to women who were told everything was normal. Listening to women who had almost given up.',
      'Over the years, we supported more than 90 women with PCOS and hormonal health challenges. Some improved quickly. Some struggled. Some relapsed. Some returned months later.',
      "Every journey taught us something. Those lessons became the foundation of Mauri. Not just the successes. The failures too.",
    ],
    quote:
      "Sometimes the greatest learning comes from understanding why something didn't work.",
  },
  {
    title: 'The Mauri Recovery Method',
    icon: Leaf,
    paragraphs: [
      'Mauri is not another symptom tracker. It is a structured healing journey.',
      'Our method combines understanding your unique hormonal story, personalized guidance, nutrition, lifestyle, research-informed movement, education, progress tracking, and ongoing support.',
      'Every recommendation is designed to answer not only what should I do, but also why am I doing this.',
    ],
    quote: 'Because understanding creates confidence. And confidence creates consistency.',
  },
  {
    title: 'What Makes Mauri Different',
    icon: Sparkles,
    paragraphs: [
      'Many platforms help you manage PCOS. Mauri helps you understand it.',
      'Many apps tell you what to eat. We explain why.',
      'Many apps track symptoms. We help you discover what those symptoms may be trying to tell you.',
      'Many apps focus on keeping you engaged. We focus on helping you graduate.',
    ],
  },
  {
    title: 'We Believe Every Woman Has Her Own Story',
    icon: BookOpen,
    paragraphs: [
      'Two women can both have PCOS. One struggles with insulin resistance. Another with chronic stress. Another with inflammation. Another with hormonal imbalance despite normal weight.',
      'Giving all of them the same advice rarely works.',
      'That is why Mauri begins by understanding your story before suggesting your path.',
    ],
    quote: 'Personalized care begins with personalized understanding.',
  },
]

const journeySteps = [
  {
    title: 'Understand',
    description: 'Learn your likely hormonal pattern and begin seeing the bigger picture.',
  },
  {
    title: 'Discover',
    description:
      'Identify possible underlying drivers through questionnaires, Mauri care team discussion, and appropriate investigations when needed.',
  },
  {
    title: 'Personalize',
    description:
      'Build a plan that may include nutrition guidance, supportive lifestyle changes, education, supplements, and other appropriate approaches based on your needs.',
  },
  {
    title: 'Track',
    description:
      'Follow meaningful progress including periods, energy, pain, sleep, mood, weight, acne, hair health, and the small changes that matter.',
  },
  {
    title: 'Celebrate',
    description: 'Recognize every step forward. Small improvements become lasting habits.',
  },
  {
    title: 'Graduate',
    description:
      'Our goal is not to keep you subscribed forever. Our goal is to help you understand your body well enough that one day you no longer need Mauri every day.',
  },
]

export default function AboutMauriPageContent() {
  return (
    <div className="bg-warm-white">
      <section className="px-4 pb-16 pt-28 sm:px-6 lg:pb-20">
        <PageContainer size="narrow">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.08em] text-teal">
              About Mauri
            </p>
            <h1 className="mt-3 font-playfair text-4xl font-normal leading-tight text-teal-dark sm:text-5xl">
              We believe your body is not working against you.
            </h1>
            <div className="mt-6 space-y-4 text-lg leading-8 text-ink">
              <p>Sometimes it whispers before it screams.</p>
              <p>
                A missed period. Persistent acne. Hair falling into your hands.
                Weight that refuses to change. Pain that everyone tells you is
                normal.
              </p>
              <p>These are not random events.</p>
            </div>
            <div className="mt-8 rounded-xl bg-teal-light p-6">
              <p className="font-playfair text-2xl font-normal leading-snug text-teal-dark sm:text-3xl">
                They are your body's way of asking to be understood.
              </p>
            </div>
            <p className="mt-8 leading-8 text-muted">
              Mauri was created because too many women spend years searching for
              answers, trying one diet after another, following conflicting
              advice, changing supplements, switching medicines, and still
              wondering: why isn't anything working?
            </p>
            <p className="mt-4 font-playfair text-2xl font-normal leading-snug text-teal-dark">
              We believe healing begins with understanding. Not guessing. Not
              fear. Not chasing the latest trend.
            </p>
          </motion.div>
        </PageContainer>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16">
        <PageContainer>
          <div className="grid gap-5 lg:grid-cols-2">
            {majorSections.map((section, index) => {
              const Icon = section.icon

              return (
                <motion.article
                  key={section.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                  transition={{ duration: 0.55, delay: index * 0.05 }}
                  className="rounded-xl border border-border bg-white/75 p-5 shadow-sm sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-light text-teal">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h2 className="font-playfair text-3xl font-normal leading-tight text-teal-dark">
                      {section.title}
                    </h2>
                  </div>
                  <div className="mt-5 space-y-4 leading-8 text-ink">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.quote ? (
                    <div className="mt-6 rounded-lg bg-amber-light p-5">
                      <p className="font-playfair text-2xl font-normal leading-snug text-teal-dark">
                        {section.quote}
                      </p>
                    </div>
                  ) : null}
                </motion.article>
              )
            })}
          </div>
        </PageContainer>
      </section>

      <section className="bg-teal-light/45 px-4 py-16 sm:px-6 lg:py-20">
        <PageContainer>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-warm-white text-teal shadow-sm">
              <Compass className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="font-playfair text-4xl font-normal leading-tight text-teal-dark sm:text-5xl">
              Our Journey Together
            </h2>
            <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Your journey with Mauri is designed to feel simple.
            </p>
          </motion.div>

          <div className="relative mx-auto mt-10 max-w-6xl lg:mt-14">
            <div
              className="absolute left-5 top-0 h-full w-px bg-border lg:left-0 lg:top-5 lg:h-px lg:w-full"
              aria-hidden="true"
            />

            <div className="grid gap-4 lg:grid-cols-6">
              {journeySteps.map((step, index) => (
                <motion.article
                  key={step.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative pl-14 lg:pl-0 lg:pt-14"
                >
                  <div className="absolute left-0 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-warm-white text-sm font-medium text-teal-dark shadow-sm lg:left-1/2 lg:top-0 lg:-translate-x-1/2">
                    {index + 1}
                  </div>
                  <div className="rounded-xl border border-border bg-warm-white/95 p-5 shadow-sm">
                    <h3 className="font-playfair text-2xl font-normal leading-tight text-teal-dark">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-ink">
                      {step.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:py-20">
        <PageContainer size="narrow">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="space-y-8"
          >
            <div className="rounded-xl border border-border bg-white/75 p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-light text-purple">
                  <HeartHandshake className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-playfair text-3xl font-normal leading-tight text-teal-dark">
                    Working Alongside Your Healthcare Team
                  </h2>
                  <div className="mt-4 space-y-4 leading-8 text-ink">
                    <p>
                      Mauri is designed to support, not replace, your healthcare
                      professionals.
                    </p>
                    <p>
                      We help you prepare for appointments, understand your
                      reports, track meaningful changes, and become a more
                      informed partner in your own care.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-white/75 p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-light text-rose">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-playfair text-3xl font-normal leading-tight text-teal-dark">
                    Our Promise
                  </h2>
                  <div className="mt-4 space-y-4 leading-8 text-ink">
                    <p>
                      We will never promise miracles. We will never promise
                      instant results. We will never tell you there is one diet
                      or one supplement that works for everyone.
                    </p>
                    <p>
                      What we promise is something different: to walk beside
                      you, keep learning, explain the science in simple
                      language, personalize wherever possible, and help you move
                      from confusion to confidence.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-teal-dark p-6 text-center shadow-sm sm:p-8">
              <GraduationCap
                className="mx-auto h-9 w-9 text-teal-mid"
                aria-hidden="true"
              />
              <h2 className="mt-4 font-playfair text-3xl font-normal leading-tight text-teal-light">
                Because Healing Is More Than Treatment
              </h2>
              <div className="mt-5 space-y-3 leading-7 text-teal-mid">
                <p>Healing is understanding. Healing is consistency.</p>
                <p>Healing is hope.</p>
                <p>Healing is believing that your story deserves to be heard.</p>
              </div>
              <p className="mt-6 font-playfair text-2xl font-normal leading-snug text-teal-light">
                Welcome to Mauri. Let's begin your journey.
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

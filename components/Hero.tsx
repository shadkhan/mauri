'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ListChecks, Sparkles, Notebook, Soup } from 'lucide-react'

const valueProps = [
  {
    icon: ListChecks,
    label: 'Know your likely PCOS pattern',
    iconClass: 'text-teal',
    bgClass: 'bg-teal-light',
  },
  {
    icon: Sparkles,
    label: 'Science with gentle support',
    iconClass: 'text-purple',
    bgClass: 'bg-purple-light',
  },
  {
    icon: Notebook,
    label: 'Real case-based learning',
    iconClass: 'text-rose',
    bgClass: 'bg-rose-light',
  },
  {
    icon: Soup,
    label: 'Indian kitchen-friendly guidance',
    iconClass: 'text-green',
    bgClass: 'bg-green-light',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

export default function Hero() {
  return (
    <section className="relative pt-28 pb-24 px-4 sm:px-6 bg-warm-white overflow-hidden">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.08 },
          },
        }}
      >
        {/* Eyebrow badge */}
        <motion.div
          className="mb-8 inline-flex max-w-full items-center rounded-full bg-teal-light px-4 py-2 text-base font-medium tracking-wide text-teal sm:text-lg"
          variants={fadeUp}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <span className="hero-typewriter">
            For PCOS, PCOD, Endometriosis &amp; hormonal confusion
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-playfair text-5xl sm:text-6xl lg:text-7xl text-ink leading-tight tracking-tight mb-6"
          variants={fadeUp}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          Finally understand what your body is trying to tell you.
        </motion.h1>

        {/* Subhead */}
        <motion.p
          className="text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed mb-10"
          variants={fadeUp}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          A structured healing journey built from years of supporting women with
          PCOS and hormonal health challenges—learning from successes, setbacks,
          and relapses to create a personalized path toward healthier cycles,
          renewed energy, and lasting confidence.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center mb-4"
          variants={fadeUp}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Link
            href="/phenotype"
            className="bg-teal text-white px-8 py-4 rounded-full text-base font-medium hover:bg-teal-dark transition-colors"
          >
            Check my PCOS phenotype — free
          </Link>
          <a
            href="/#waitlist"
            className="border-2 border-teal text-teal px-8 py-4 rounded-full text-base font-medium hover:bg-teal-light transition-colors"
          >
            Join the waitlist
          </a>
        </motion.div>

        {/* Microcopy */}
        <motion.p
          className="text-sm text-muted mb-16"
          variants={fadeUp}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          Free · 2 minutes · Educational support only
        </motion.p>

        {/* Value strip */}
        <motion.p
          className="mb-8 font-playfair text-2xl font-normal leading-snug text-teal-dark sm:text-3xl"
          variants={fadeUp}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Start with clarity. Continue with support. Graduate with confidence.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {valueProps.map(({ icon: Icon, label, iconClass, bgClass }) => (
            <motion.div
              key={label}
              className="flex flex-col items-center gap-3 text-center"
              variants={fadeUp}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgClass}`}
              >
                <Icon className={`w-6 h-6 ${iconClass}`} />
              </div>
              <span className="text-sm font-medium text-ink leading-snug">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

'use client'

import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export default function WaitlistForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [state, setState] = useState<SubmitState>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          source: 'hero_cta',
        }),
      })

      const data = (await response.json()) as { error?: string }

      if (!response.ok) {
        throw new Error(data.error ?? 'Something went wrong. Please try again.')
      }

      setState('success')
      setMessage("You're on the list - check your inbox soon.")
      setName('')
      setEmail('')
    } catch (error) {
      setState('error')
      setMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      )
    }
  }

  return (
    <section id="waitlist" className="bg-warm-white px-4 pb-20 sm:px-6">
      <motion.div
        className="mx-auto max-w-4xl rounded-xl bg-teal-dark px-5 py-10 text-center shadow-sm sm:px-8 lg:px-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <h2 className="font-playfair text-3xl font-normal leading-tight text-teal-light sm:text-4xl">
          Be among the first 250 women on the Mauri protocol
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-teal-mid">
          Founding members get a personally reviewed integrative protocol - free
          during early access.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-[1fr_1fr_auto]"
        >
          <div className="text-left">
            <label htmlFor="waitlist-name" className="sr-only">
              Name
            </label>
            <input
              id="waitlist-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              className="h-12 w-full rounded-lg border border-transparent bg-white px-4 text-sm text-ink outline-none transition focus:border-amber focus:ring-2 focus:ring-amber/40"
            />
          </div>

          <div className="text-left">
            <label htmlFor="waitlist-email" className="sr-only">
              Email address
            </label>
            <input
              id="waitlist-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="h-12 w-full rounded-lg border border-transparent bg-white px-4 text-sm text-ink outline-none transition focus:border-amber focus:ring-2 focus:ring-amber/40"
            />
          </div>

          <button
            type="submit"
            disabled={state === 'submitting'}
            className="h-12 rounded-lg bg-amber px-6 text-sm font-medium text-teal-dark transition hover:bg-amber-light disabled:cursor-not-allowed disabled:opacity-70"
          >
            {state === 'submitting' ? 'Joining...' : 'Get early access'}
          </button>
        </form>

        <p className="mt-3 text-xs text-teal-mid">
          No spam. One email when we're ready for you.
        </p>

        {message ? (
          <p
            className={`mx-auto mt-4 max-w-xl rounded-lg px-4 py-3 text-sm ${
              state === 'success'
                ? 'bg-teal-light text-teal-dark'
                : 'bg-rose-light text-rose'
            }`}
            role={state === 'error' ? 'alert' : 'status'}
          >
            {message}
          </p>
        ) : null}
      </motion.div>
    </section>
  )
}

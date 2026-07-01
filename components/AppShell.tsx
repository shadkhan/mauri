'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  BookOpen,
  ClipboardList,
  LayoutDashboard,
  Menu,
  UserRound,
  X,
} from 'lucide-react'

const appNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/recovery-roadmap', label: 'Recovery Roadmap', icon: ClipboardList },
  { href: '/tracking', label: 'Tracking', icon: BarChart3 },
  { href: '/learning-library', label: 'Learning Library', icon: BookOpen },
  { href: '/profile', label: 'Profile', icon: UserRound },
]

type AppShellProps = {
  children: ReactNode
  title: string
  description?: string
}

export default function AppShell({ children, title, description }: AppShellProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <main className="min-h-screen bg-warm-white">
      <header className="sticky top-0 z-40 border-b border-border bg-warm-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <img
              src="/brand/mauri-mark.svg"
              alt="Mauri"
              className="h-10 w-10"
            />
            <span className="font-playfair text-3xl tracking-[0.12em] text-teal">
              mauri
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-teal-dark lg:hidden"
            aria-label={open ? 'Close app menu' : 'Open app menu'}
            aria-expanded={open}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl lg:grid-cols-[280px_1fr]">
        <aside
          className={`border-b border-border bg-warm-white px-4 py-4 sm:px-6 lg:block lg:min-h-[calc(100vh-4rem)] lg:border-b-0 lg:border-r lg:py-6 ${
            open ? 'block' : 'hidden'
          }`}
        >
          <nav aria-label="Authenticated app navigation" className="space-y-2">
            {appNavItems.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? 'bg-teal-light text-teal-dark'
                      : 'text-ink hover:bg-teal-light/70 hover:text-teal-dark'
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        <section className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.08em] text-teal">
              Mauri app
            </p>
            <h1 className="mt-2 font-playfair text-4xl font-normal leading-tight text-teal-dark sm:text-5xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
                {description}
              </p>
            ) : null}
          </div>
          {children}
        </section>
      </div>
    </main>
  )
}

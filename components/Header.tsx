'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#journey', label: 'How it works' },
  { href: '/#method', label: 'Mauri Method' },
  { href: '/#trust', label: 'Why trust' },
  { href: '/phenotype', label: 'Phenotype quiz' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const solidHeader = pathname !== '/' || scrolled || menuOpen

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solidHeader
          ? 'bg-warm-white/95 backdrop-blur-sm border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/brand/mauri-mark.svg"
              alt="Mauri"
              className="h-11 w-11 sm:h-12 sm:w-12"
            />
            <span className="font-playfair text-3xl leading-none tracking-[0.12em] text-teal sm:text-4xl">
              mauri
            </span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-7 md:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink transition-colors hover:text-teal"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/#waitlist"
              className="bg-teal text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-teal-dark transition-colors whitespace-nowrap"
            >
              Join waitlist
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-warm-white text-teal-dark md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-border bg-warm-white px-4 py-4 shadow-sm md:hidden">
          <nav aria-label="Mobile navigation" className="mx-auto max-w-6xl">
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-ink transition hover:bg-teal-light hover:text-teal-dark"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#waitlist"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-lg bg-teal px-3 py-3 text-center text-sm font-medium text-white transition hover:bg-teal-dark"
              >
                Join waitlist
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

import Link from 'next/link'

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/phenotype', label: 'Phenotype quiz' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/#waitlist', label: 'Waitlist' },
]

export default function Footer() {
  return (
    <footer className="bg-teal-dark px-4 py-10 text-teal-mid sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <img
              src="/brand/mauri-logo-reversed.svg"
              alt="Mauri"
              className="h-12 w-auto sm:h-14"
            />
            <p className="mt-4 max-w-xl text-sm leading-6">
              Mauri provides educational and supportive wellness guidance. It is
              not a diagnosis, emergency service, or replacement for medical
              care. Always consult a qualified healthcare professional for
              medical decisions.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-teal-light transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

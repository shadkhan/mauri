import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { PageContainer, PageIntro, PageSection } from '@/components/PageLayout'
import { articles } from '@/lib/articles'
import { absoluteUrl, siteConfig } from '@/lib/site'

const title = 'Mauri Blog | PCOS, PCOD, Period Pain and Hormonal Health'
const description =
  'Read Mauri guides on PCOS, PCOD, hormonal phenotypes, period pain, endometriosis differences, and body literacy for more informed care conversations.'

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl('/blog'),
    siteName: siteConfig.name,
    type: 'website',
    images: [{ url: siteConfig.ogImage, alt: 'Mauri blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [siteConfig.ogImage],
  },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <Header />
      <PageSection>
        <PageContainer>
          <PageIntro
            eyebrow="Mauri library"
            title="Calm, research-linked guides for hormonal health"
            description="Start with the language behind your symptoms: phenotype patterns, pain signals, and the difference between common conditions."
          />

          <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="flex flex-col rounded-xl border border-border bg-white/70 p-5 shadow-sm sm:p-6"
              >
                <p className="text-sm font-medium text-teal">
                  {article.eyebrow} - {article.readTime}
                </p>
                <h2 className="mt-3 font-playfair text-2xl font-normal leading-tight text-teal-dark sm:text-3xl">
                  {article.title}
                </h2>
                <p className="mt-4 flex-1 leading-7 text-muted">
                  {article.description}
                </p>
                <Link
                  href={`/blog/${article.slug}`}
                  className="mt-6 inline-flex w-fit rounded-lg bg-teal px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-dark"
                >
                  Read article
                </Link>
              </article>
            ))}
          </div>
        </PageContainer>
      </PageSection>
      <Footer />
    </main>
  )
}

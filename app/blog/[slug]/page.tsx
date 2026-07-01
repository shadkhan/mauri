import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { PageContainer, PageIntro, PageSection } from '@/components/PageLayout'
import { articles, getArticle } from '@/lib/articles'

type BlogArticlePageProps = {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export function generateMetadata({
  params,
}: BlogArticlePageProps): Metadata {
  const article = getArticle(params.slug)

  if (!article) {
    return {
      title: 'Article not found | Mauri',
    }
  }

  return {
    title: `${article.title} | Mauri`,
    description: article.description,
  }
}

export default function BlogArticlePage({ params }: BlogArticlePageProps) {
  const article = getArticle(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-warm-white">
      <Header />
      <PageSection as="article">
        <PageContainer size="narrow">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal-dark transition hover:text-teal"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to blog
          </Link>

          <div className="mt-8">
            <PageIntro
              eyebrow={`${article.eyebrow} - ${article.readTime}`}
              title={article.title}
              description={article.description}
            />
          </div>

          <div className="mt-10 space-y-9 sm:space-y-10">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-playfair text-2xl font-normal text-teal-dark sm:text-3xl">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="leading-8 text-ink">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-12 rounded-xl border border-border bg-white/70 p-5 sm:p-6">
            <h2 className="font-playfair text-2xl font-normal text-teal-dark sm:text-3xl">
              Research links
            </h2>
            <ul className="mt-5 space-y-4">
              {article.researchLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-start gap-3 text-teal-dark transition hover:text-teal"
                  >
                    <ExternalLink
                      className="mt-1 h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="font-medium underline underline-offset-4">
                        {link.label}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-muted">
                        {link.note}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </PageContainer>
      </PageSection>
      <Footer />
    </main>
  )
}

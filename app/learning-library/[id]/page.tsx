import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import AppShell from '@/components/AppShell'
import { learningArticles } from '@/lib/learningLibrary'

type LearningArticlePageProps = {
  params: {
    id: string
  }
}

export function generateStaticParams() {
  return learningArticles.map((article) => ({
    id: article.id,
  }))
}

export function generateMetadata({
  params,
}: LearningArticlePageProps): Metadata {
  const article = learningArticles.find((item) => item.id === params.id)

  if (!article) {
    return {
      title: 'Lesson not found',
    }
  }

  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default function LearningArticlePage({ params }: LearningArticlePageProps) {
  const article = learningArticles.find((item) => item.id === params.id)

  if (!article) {
    notFound()
  }

  return (
    <AppShell title={article.title} description={article.excerpt}>
      <article className="max-w-3xl rounded-xl border border-border bg-white/75 p-5 shadow-sm sm:p-6">
        <Link
          href="/learning-library"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-teal-dark transition hover:text-teal"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Learning Library
        </Link>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-teal-light px-3 py-1 text-xs font-medium text-teal-dark">
            {article.category}
          </span>
          <span className="rounded-full bg-purple-light px-3 py-1 text-xs font-medium text-purple">
            {article.difficulty}
          </span>
          <span className="rounded-full bg-amber-light px-3 py-1 text-xs font-medium text-teal-dark">
            {article.readingTime}
          </span>
        </div>
        <div className="mt-8 space-y-4 leading-8 text-ink">
          <p>
            This lesson is prepared as a calm learning placeholder. Later, this
            page can load the complete article body from a CMS or database using
            the same article id.
          </p>
          <p>{article.excerpt}</p>
          {article.dailyInsight ? <p>{article.dailyInsight}</p> : null}
        </div>
      </article>
    </AppShell>
  )
}

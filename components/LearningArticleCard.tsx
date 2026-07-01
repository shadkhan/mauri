'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import type { LearningArticle } from '@/lib/learningLibrary'

type LearningArticleCardProps = {
  article: LearningArticle
}

export default function LearningArticleCard({ article }: LearningArticleCardProps) {
  const [saved, setSaved] = useState(false)

  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-white/75 p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal/40 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full bg-teal-light px-3 py-1 text-xs font-medium text-teal-dark">
          {article.category}
        </span>
        <span className="rounded-full bg-purple-light px-3 py-1 text-xs font-medium text-purple">
          {article.difficulty}
        </span>
      </div>
      <h2 className="mt-4 font-playfair text-2xl font-normal leading-tight text-teal-dark">
        {article.title}
      </h2>
      <p className="mt-2 text-sm font-medium text-muted">
        {article.readingTime}
      </p>
      <p className="mt-4 flex-1 leading-7 text-ink">{article.excerpt}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={article.href}
          className="inline-flex justify-center rounded-lg bg-teal px-4 py-3 text-sm font-medium text-white transition hover:bg-teal-dark"
        >
          Read lesson
        </Link>
        <button
          type="button"
          onClick={() => setSaved((value) => !value)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-medium text-teal-dark transition hover:bg-teal-light"
          aria-pressed={saved}
        >
          {saved ? (
            <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Bookmark className="h-4 w-4" aria-hidden="true" />
          )}
          {saved ? 'Saved' : 'Save for later'}
        </button>
      </div>
    </article>
  )
}

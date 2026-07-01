import Link from 'next/link'
import { BookOpen, Sparkles } from 'lucide-react'
import { getTodaysLesson } from '@/lib/learningLibrary'

export default function TodaysLessonWidget() {
  const lesson = getTodaysLesson()

  return (
    <section className="rounded-xl border border-border bg-teal-dark p-5 text-white shadow-sm sm:p-6">
      <div className="flex items-start gap-4">
        <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-mid/20 text-teal-mid">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-teal-mid">
            Today's Lesson
          </p>
          <h2 className="mt-2 font-playfair text-3xl font-normal leading-tight text-teal-light">
            {lesson.title}
          </h2>
        </div>
      </div>
      <p className="mt-5 leading-7 text-teal-mid">{lesson.dailyInsight}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <span className="inline-flex items-center gap-2 text-sm text-teal-mid">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          1-2 minutes of gentle learning
        </span>
        <Link
          href={lesson.href}
          className="inline-flex justify-center rounded-lg bg-amber px-4 py-3 text-sm font-medium text-teal-dark transition hover:bg-amber-light sm:ml-auto"
        >
          Read full article
        </Link>
      </div>
    </section>
  )
}

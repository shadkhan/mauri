import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import LearningArticleCard from '@/components/LearningArticleCard'
import { learningArticles, learningCategories } from '@/lib/learningLibrary'

export const metadata: Metadata = {
  title: 'Learning Library',
  description:
    'Educational lessons for PCOS, PCOD, endometriosis, hormones, nutrition, supplements, lifestyle, and recovery support.',
}

export default function LearningLibraryPage() {
  return (
    <AppShell
      title="Learning Library"
      description="Small, steady lessons for each stage of your recovery journey. Learn what you need, when you are ready."
    >
      <div className="space-y-10">
        {learningCategories.map((category) => {
          const categoryArticles = learningArticles.filter(
            (article) => article.category === category,
          )

          return (
            <section key={category}>
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="font-playfair text-3xl font-normal leading-tight text-teal-dark">
                    {category}
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    {categoryArticles.length} lesson
                    {categoryArticles.length === 1 ? '' : 's'}
                  </p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {categoryArticles.map((article) => (
                  <LearningArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </AppShell>
  )
}

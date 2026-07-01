export type LearningCategory =
  | 'Lessons From Real Journeys'
  | 'Understanding Hormones'
  | 'Nutrition'
  | 'Supplements'
  | 'Lifestyle & Habits'
  | 'Fertility & Pregnancy'
  | 'Pain & Endometriosis'
  | 'Myths & Misconceptions'

export type LearningDifficulty = 'Beginner' | 'Intermediate'

export type LearningArticle = {
  id: string
  title: string
  readingTime: string
  category: LearningCategory
  difficulty: LearningDifficulty
  excerpt: string
  href: string
  dailyInsight?: string
}

export const learningCategories: LearningCategory[] = [
  'Lessons From Real Journeys',
  'Understanding Hormones',
  'Nutrition',
  'Supplements',
  'Lifestyle & Habits',
  'Fertility & Pregnancy',
  'Pain & Endometriosis',
  'Myths & Misconceptions',
]

export const learningArticles: LearningArticle[] = [
  {
    id: 'cycle-story',
    title: 'What your cycle pattern can tell you',
    readingTime: '4 min read',
    category: 'Understanding Hormones',
    difficulty: 'Beginner',
    excerpt:
      'A gentle way to understand cycle length, missed periods, and what to track before your next Mauri care team review.',
    href: '/learning-library/cycle-story',
    dailyInsight:
      'Your cycle is not just a date on a calendar. Its rhythm can offer clues about stress, ovulation, hormones, and recovery.',
  },
  {
    id: 'insulin-resistance-basics',
    title: 'Insulin resistance, cravings, and afternoon crashes',
    readingTime: '5 min read',
    category: 'Understanding Hormones',
    difficulty: 'Beginner',
    excerpt:
      'Learn why cravings and energy crashes may matter in PCOS and what questions to discuss with the Mauri care team.',
    href: '/learning-library/insulin-resistance-basics',
  },
  {
    id: 'real-journey-relapse',
    title: 'What a relapse can teach us',
    readingTime: '3 min read',
    category: 'Lessons From Real Journeys',
    difficulty: 'Beginner',
    excerpt:
      'A compassionate look at setbacks and why they can become useful data rather than personal failure.',
    href: '/learning-library/real-journey-relapse',
  },
  {
    id: 'plate-building',
    title: 'Building a hormone-supportive plate',
    readingTime: '6 min read',
    category: 'Nutrition',
    difficulty: 'Beginner',
    excerpt:
      'A practical Indian-kitchen-friendly framework for protein, fiber, fats, and steady energy.',
    href: '/learning-library/plate-building',
  },
  {
    id: 'supplement-conversation',
    title: 'How to discuss supplements safely',
    readingTime: '4 min read',
    category: 'Supplements',
    difficulty: 'Beginner',
    excerpt:
      'What to note before starting supplements and how to bring them into your Mauri care team conversation.',
    href: '/learning-library/supplement-conversation',
  },
  {
    id: 'sleep-and-symptoms',
    title: 'Sleep as a hormonal signal',
    readingTime: '4 min read',
    category: 'Lifestyle & Habits',
    difficulty: 'Beginner',
    excerpt:
      'Why sleep quality can influence cravings, mood, pain, energy, and cycle consistency.',
    href: '/learning-library/sleep-and-symptoms',
  },
  {
    id: 'fertility-prep',
    title: 'Preparing for a fertility conversation',
    readingTime: '7 min read',
    category: 'Fertility & Pregnancy',
    difficulty: 'Intermediate',
    excerpt:
      'A calm checklist for cycle history, reports, symptoms, and questions to carry into appointments.',
    href: '/learning-library/fertility-prep',
  },
  {
    id: 'pain-red-flags',
    title: 'When period pain deserves more attention',
    readingTime: '5 min read',
    category: 'Pain & Endometriosis',
    difficulty: 'Beginner',
    excerpt:
      'How to describe pain patterns clearly and prepare for a more useful Mauri care team discussion.',
    href: '/learning-library/pain-red-flags',
  },
  {
    id: 'pcos-myths',
    title: 'Myth: everyone with PCOS needs the same diet',
    readingTime: '3 min read',
    category: 'Myths & Misconceptions',
    difficulty: 'Beginner',
    excerpt:
      'Why personalized context matters more than copying a generic chart from the internet.',
    href: '/learning-library/pcos-myths',
  },
  {
    id: 'androgen-signs',
    title: 'Acne, hair fall, and androgen signs',
    readingTime: '5 min read',
    category: 'Understanding Hormones',
    difficulty: 'Intermediate',
    excerpt:
      'Understand how visible symptoms may connect with hormones and why labs can add context.',
    href: '/learning-library/androgen-signs',
  },
]

export function getTodaysLesson() {
  return learningArticles[0]
}

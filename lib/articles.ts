export type ResearchLink = {
  label: string
  href: string
  note: string
}

export type Article = {
  slug: string
  title: string
  description: string
  eyebrow: string
  readTime: string
  sections: {
    heading: string
    body: string[]
  }[]
  researchLinks: ResearchLink[]
}

export const articles: Article[] = [
  {
    slug: 'pcos-pcod-phenotypes',
    eyebrow: 'Phenotypes',
    title: 'PCOS and PCOD phenotypes: why one label is not enough',
    description:
      'A plain-language guide to PCOS and PCOD phenotype patterns, including classic, hyperandrogenic, ovulatory, and stress-linked presentations.',
    readTime: '6 min read',
    sections: [
      {
        heading: 'Why phenotypes matter',
        body: [
          'PCOS and PCOD are often spoken about as one single condition, but people can arrive with very different patterns. One person may have missed cycles, acne, hair growth, and weight changes. Another may have regular cycles but persistent jawline acne or hair fall. A third may have cycle disruption that begins after stress, stopping birth control, or a period of poor sleep.',
          'A phenotype is a pattern. It does not replace diagnosis, but it helps organize symptoms so the next conversation with the Mauri care team becomes clearer.',
        ],
      },
      {
        heading: 'The classic pattern',
        body: [
          'The classic PCOS/PCOD pattern usually combines irregular or missed cycles with visible androgen-linked signs such as acne, excess hair growth, or hair thinning. This is the pattern most people imagine when they hear PCOS.',
          'For Mauri, this pattern is important because it asks for coordinated review: menstrual rhythm, androgen signs, insulin resistance clues, inflammation, nutrition, and supplement timing should not be handled as separate silos.',
        ],
      },
      {
        heading: 'The hyperandrogenic pattern',
        body: [
          'Some people have irregular cycles plus one or two androgen-linked symptoms, but the picture is less intense than the classic pattern. Acne, hair fall, or facial hair may be the first symptoms that make the hormonal pattern visible.',
          'This group can be overlooked when symptoms are treated cosmetically without asking why they are happening.',
        ],
      },
      {
        heading: 'The ovulatory pattern',
        body: [
          'Regular cycles can still sit alongside androgen-linked symptoms. That is why cycle regularity alone is not always enough to rule out a hormonal pattern.',
          'If periods are predictable but acne, hair growth, or hair fall persists, the next step is usually a deeper look at symptoms, labs, and metabolic markers rather than assuming everything is normal.',
        ],
      },
      {
        heading: 'The stress-linked or non-androgenic pattern',
        body: [
          'Some people have irregular cycles without strong acne, hair growth, or hair fall. Their story may include stress, disrupted sleep, post-pill changes, illness, under-eating, overtraining, or nervous-system strain.',
          'This pattern still deserves care. It simply asks different questions from the classic androgen-heavy picture.',
        ],
      },
      {
        heading: 'A note on the name PCOS',
        body: [
          'In May 2026, a global consensus process introduced the name PMOS, polyendocrine metabolic ovarian syndrome, for the condition long known as PCOS. Many people and clinics will continue using PCOS during the transition, so Mauri uses familiar language while recognizing that the condition is broader than ovarian cysts.',
        ],
      },
    ],
    researchLinks: [
      {
        label: '2023 International Evidence-based Guideline for PCOS/PMOS',
        href: 'https://www.monash.edu/medicine/mchri/pcos/guideline',
        note: 'Current international guideline hub from Monash University.',
      },
      {
        label: 'Recommendations from the 2023 International Guideline',
        href: 'https://pubmed.ncbi.nlm.nih.gov/37580314/',
        note: 'PubMed record for the 2023 evidence-based recommendations.',
      },
      {
        label: 'PCOS renamed PMOS',
        href: 'https://www.endocrine.org/news-and-advocacy/news-room/2026/pcos-name-change',
        note: 'Endocrine Society announcement on the 2026 name change.',
      },
    ],
  },
  {
    slug: 'pcos-pcod-endometriosis-difference',
    eyebrow: 'Differences',
    title: 'PCOS, PCOD, and endometriosis: what is the difference?',
    description:
      'A calm comparison of PCOS, PCOD, and endometriosis symptoms, overlap, and when pain deserves deeper Mauri care team review.',
    readTime: '7 min read',
    sections: [
      {
        heading: 'The short version',
        body: [
          'PCOS and PCOD are commonly used to describe hormone, ovulation, androgen, and metabolic patterns. Endometriosis is different: it is a condition where tissue similar to the uterine lining grows outside the uterus and can cause significant pain, inflammation, and fertility challenges.',
          'The confusing part is that real people can have overlapping symptoms. Irregular cycles can sit beside severe period pain. Acne can sit beside pelvic pain. That is why symptom patterning is helpful, and the Mauri doctors and care team can review the story in more detail.',
        ],
      },
      {
        heading: 'PCOS and PCOD patterns',
        body: [
          'PCOS is diagnosed using criteria that look at ovulation, androgen signs or labs, and ovarian appearance after other causes are excluded. PCOD is often used in South Asian settings to describe a related ovarian and hormonal pattern, though the terminology varies across care settings.',
          'Common clues include irregular or missed periods, acne, excess facial or body hair, hair thinning, weight changes, cravings, insulin resistance, and fertility concerns.',
        ],
      },
      {
        heading: 'Endometriosis patterns',
        body: [
          'Endometriosis is more pain-forward for many people. Clues can include severe period pain, pelvic pain outside periods, pain during sex, pain with bowel movements or urination around the period, heavy bleeding, bloating, and fertility concerns.',
          'Pain that makes someone miss school, work, or normal life should not be dismissed as normal period pain.',
        ],
      },
      {
        heading: 'Where they overlap',
        body: [
          'Both PCOS/PCOD and endometriosis can affect cycles, fertility, energy, mood, and quality of life. Some people may have more than one condition, and some symptoms can be amplified by inflammation, stress, sleep disruption, and metabolic health.',
          'This is why Mauri separates phenotype assessment from diagnosis. A quiz can help you organize the story, but it cannot confirm what is happening inside the body.',
        ],
      },
      {
        heading: 'When to speak to the Mauri care team',
        body: [
          'Speak to the Mauri doctors and care team if periods are very irregular, bleeding is heavy, pain is severe, symptoms are worsening, you are trying to conceive, or symptoms are affecting daily life.',
          'If symptoms feel urgent, local emergency care is important for sudden severe pelvic pain, fainting, fever, heavy bleeding with weakness, or possible pregnancy with pain.',
        ],
      },
      {
        heading: 'How Mauri uses this distinction',
        body: [
          'Mauri starts by asking about cycle rhythm, visible androgen signs, energy, history, and pain. PCOS/PCOD phenotype patterns guide the protocol preview. Severe pain is treated as a separate Mauri care team review flag, not as a diagnosis.',
        ],
      },
    ],
    researchLinks: [
      {
        label: 'Office on Women’s Health: Endometriosis',
        href: 'https://womenshealth.gov/a-z-topics/endometriosis',
        note: 'Patient-friendly overview of symptoms and care pathways.',
      },
      {
        label: 'NICHD: Endometriosis factsheet',
        href: 'https://www.nichd.nih.gov/health/topics/factsheets/endometriosis',
        note: 'NIH source on common symptoms including pain and infertility.',
      },
      {
        label: 'ACOG: Painful periods',
        href: 'https://www.acog.org/womens-health/faqs/painful-periods',
        note: 'Guidance on period pain and when evaluation matters.',
      },
      {
        label: '2023 International Evidence-based Guideline for PCOS/PMOS',
        href: 'https://www.monash.edu/medicine/mchri/pcos/guideline',
        note: 'Current guideline hub for PCOS/PMOS assessment and management.',
      },
    ],
  },
]

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug)
}

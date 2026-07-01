'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  HeartPulse,
  Mail,
  RotateCcw,
} from 'lucide-react'
import { PageContainer, PageSection } from '@/components/PageLayout'

type SingleAnswer = string
type MultiAnswer = string[]

type Answers = {
  cyclePattern: SingleAnswer
  visibleSymptoms: MultiAnswer
  ovarianFinding: SingleAnswer
  energyPattern: SingleAnswer
  cycleHistory: SingleAnswer
  painPattern: SingleAnswer
  painSeverity: SingleAnswer
  painBeforePeriods: SingleAnswer
  painDuringPeriods: SingleAnswer
  painDuringIntercourse: SingleAnswer
  painDuringBowelMovements: SingleAnswer
  heavyBleeding: SingleAnswer
  endometriosisFamilyHistory: SingleAnswer
  painLifeImpact: SingleAnswer
}

type Question =
  | {
      id: keyof Answers
      type: 'single'
      eyebrow: string
      question: string
      options: { value: string; label: string }[]
    }
  | {
      id: keyof Answers
      type: 'multi'
      eyebrow: string
      question: string
      options: { value: string; label: string }[]
    }

type Result = {
  id: string
  label: string
  shortLabel: string
  tone: string
  description: string
  nextStep: string
  matchedSignals: string[]
  regularCycleFlag?: string
  painFlag: boolean
  painMessage?: string
}

type DiscoveryPathwayId =
  | 'mirror_pcos'
  | 'invisible_pcos'
  | 'silent_pcos'
  | 'survival_pcos'
  | 'possible_endometriosis'
  | 'functional_stress_cycle_disruption'
  | 'possible_post_pill_cycle_recovery'
  | 'mixed_hormonal_pattern'
  | 'needs_clinical_review'

type PatternRecognition = {
  primaryPattern: DiscoveryPathwayId
  secondaryConsiderations: DiscoveryPathwayId[]
  noticed: string[]
  clinicalMessage?: string
}

type RecoveryPathway = {
  id: DiscoveryPathwayId
  title: string
  subtitle: string
  description: string
  journeyStart: string[]
  seekCare: string[]
}

type DiscoveryOutcome = {
  patternRecognition: PatternRecognition
  recoveryPathway: RecoveryPathway
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const emptyAnswers: Answers = {
  cyclePattern: '',
  visibleSymptoms: [],
  ovarianFinding: '',
  energyPattern: '',
  cycleHistory: '',
  painPattern: '',
  painSeverity: '',
  painBeforePeriods: '',
  painDuringPeriods: '',
  painDuringIntercourse: '',
  painDuringBowelMovements: '',
  heavyBleeding: '',
  endometriosisFamilyHistory: '',
  painLifeImpact: '',
}

const questions: Question[] = [
  {
    id: 'cyclePattern',
    type: 'single',
    eyebrow: 'Your Cycle Story',
    question: 'How would you describe your periods over the last 6 months?',
    options: [
      { value: 'regular', label: 'Regular (24-35 days)' },
      { value: 'irregular', label: 'Irregular or unpredictable' },
      { value: 'missed', label: 'Often missed (35+ days or skipped months)' },
      { value: 'unsure', label: "I'm not sure / tracking just started" },
    ],
  },
  {
    id: 'visibleSymptoms',
    type: 'multi',
    eyebrow: 'What has your body been trying to tell you?',
    question: 'Which of these have you noticed? (select all that apply)',
    options: [
      { value: 'acne', label: 'Acne along jawline or chin' },
      { value: 'hair_growth', label: 'Excess hair growth (face, chin, body)' },
      { value: 'hair_fall', label: 'Hair thinning or hair fall' },
      {
        value: 'weight_gain',
        label: 'Sudden weight gain, especially around the abdomen',
      },
      { value: 'none', label: 'None of these' },
    ],
  },
  {
    id: 'ovarianFinding',
    type: 'single',
    eyebrow: 'What have your reports shown so far?',
    question:
      'Has a doctor or ultrasound report ever mentioned polycystic ovaries, PCOD, or PCOM?',
    options: [
      {
        value: 'pcod_ultrasound',
        label: 'Yes, ultrasound/report mentioned polycystic ovaries or PCOD',
      },
      {
        value: 'no_finding',
        label: 'No, scans or reports have not mentioned this',
      },
      {
        value: 'not_checked',
        label: 'I have not had a scan or I am not sure',
      },
    ],
  },
  {
    id: 'energyPattern',
    type: 'single',
    eyebrow: 'How do you usually feel during the day?',
    question: 'How is your energy through the day?',
    options: [
      { value: 'stable', label: 'Stable most of the day' },
      { value: 'crash', label: 'Big afternoon crash / sugar cravings' },
      {
        value: 'tired',
        label: 'Tired most of the day regardless of sleep',
      },
      { value: 'wired', label: 'Anxious or wired, hard to relax' },
    ],
  },
  {
    id: 'cycleHistory',
    type: 'single',
    eyebrow: 'When did things begin to change?',
    question: 'Were your cycles regular before, and did something change it?',
    options: [
      {
        value: 'always_irregular',
        label: 'Always been irregular since my first period',
      },
      {
        value: 'post_pill',
        label: 'Was regular, became irregular after stopping birth control',
      },
      {
        value: 'stress',
        label: 'Was regular, became irregular after a stressful period/life event',
      },
      { value: 'unsure', label: 'Not sure' },
    ],
  },
  {
    id: 'painPattern',
    type: 'single',
    eyebrow: 'How much does pain affect your life?',
    question:
      'Do you experience period pain that affects daily activities (missing work/school, needing to lie down)?',
    options: [
      {
        value: 'manageable',
        label: 'No, manageable with rest or mild medication',
      },
      { value: 'sometimes', label: 'Yes, sometimes' },
      { value: 'severe', label: 'Yes, severely - most cycles' },
    ],
  },
  {
    id: 'painSeverity',
    type: 'single',
    eyebrow: 'Pelvic pain screening',
    question: 'On your worst pain day, how intense is the pain?',
    options: Array.from({ length: 11 }, (_, value) => ({
      value: String(value),
      label: `${value} / 10`,
    })),
  },
  {
    id: 'painBeforePeriods',
    type: 'single',
    eyebrow: 'Pelvic pain screening',
    question: 'Do you get pelvic pain before your period starts?',
    options: [
      { value: 'no', label: 'No' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'yes', label: 'Yes, often' },
    ],
  },
  {
    id: 'painDuringPeriods',
    type: 'single',
    eyebrow: 'Pelvic pain screening',
    question: 'Do you get pelvic pain during your period?',
    options: [
      { value: 'no', label: 'No' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'yes', label: 'Yes, often' },
    ],
  },
  {
    id: 'painDuringIntercourse',
    type: 'single',
    eyebrow: 'Pelvic pain screening',
    question: 'Do you experience pain during intercourse?',
    options: [
      { value: 'no', label: 'No' },
      { value: 'yes', label: 'Yes' },
      { value: 'not_applicable', label: 'Not applicable / prefer not to say' },
    ],
  },
  {
    id: 'painDuringBowelMovements',
    type: 'single',
    eyebrow: 'Pelvic pain screening',
    question: 'Do you get pain during bowel movements, especially around periods?',
    options: [
      { value: 'no', label: 'No' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'yes', label: 'Yes' },
    ],
  },
  {
    id: 'heavyBleeding',
    type: 'single',
    eyebrow: 'Pelvic pain screening',
    question: 'Do you experience heavy bleeding?',
    options: [
      { value: 'no', label: 'No' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'yes', label: 'Yes' },
    ],
  },
  {
    id: 'endometriosisFamilyHistory',
    type: 'single',
    eyebrow: 'Pelvic pain screening',
    question: 'Has anyone in your close family been diagnosed with endometriosis?',
    options: [
      { value: 'no', label: 'No' },
      { value: 'yes', label: 'Yes' },
      { value: 'unsure', label: 'I am not sure' },
    ],
  },
  {
    id: 'painLifeImpact',
    type: 'single',
    eyebrow: 'Pelvic pain screening',
    question: 'Has pain affected work, school, relationships, or daily life?',
    options: [
      { value: 'no', label: 'No' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'yes', label: 'Yes, it affects my life' },
    ],
  },
]

const androgenSymptoms = ['acne', 'hair_growth', 'hair_fall']

function scoreAnswers(answers: Answers): Result {
  const selectedAndrogenSymptoms = answers.visibleSymptoms.filter((symptom) =>
    androgenSymptoms.includes(symptom),
  )
  const hasHyperandrogenism = selectedAndrogenSymptoms.length > 0
  const hasOvulatoryDysfunction =
    answers.cyclePattern === 'irregular' || answers.cyclePattern === 'missed'
  const hasOvarianFinding = answers.ovarianFinding === 'pcod_ultrasound'
  const hasNoVisibleSymptoms = answers.visibleSymptoms.includes('none')
  const hasStressOrPostPillTrigger =
    answers.cycleHistory === 'post_pill' || answers.cycleHistory === 'stress'
  const hasStressEnergy = answers.energyPattern === 'wired'
  const painFlag = answers.painPattern === 'severe'
  const painMessage =
    'Your pain pattern may also be worth discussing with the Mauri care team. Some causes of severe period pain need timely medical review.'
  const matchedSignals = [
    hasOvulatoryDysfunction
      ? 'Cycle pattern suggests ovulatory dysfunction'
      : 'Cycle pattern does not strongly suggest ovulatory dysfunction',
    hasHyperandrogenism
      ? 'Visible symptoms suggest androgen-linked signs'
      : 'No strong androgen-linked signs selected',
    hasOvarianFinding
      ? 'Ultrasound/report history suggests polycystic ovarian morphology'
      : 'No confirmed polycystic ovarian morphology selected',
  ]

  if (painFlag && !hasHyperandrogenism && !hasOvulatoryDysfunction) {
    return {
      id: 'pain_first',
      label: 'Pain-forward pattern',
      shortLabel: 'Doctor conversation flag',
      tone: 'Your answers suggest pain deserves focused attention before forcing the result into a PCOS or PCOD bucket.',
      description:
        'Severe period pain that disrupts work, school, or daily life is not something to simply push through. It may overlap with PCOS or PCOD for some people, but it also deserves a separate medical conversation.',
      nextStep:
        'Track pain timing, bleeding, digestion changes, and what helps or worsens symptoms, then share the pattern with the Mauri care team.',
      matchedSignals: [...matchedSignals, 'Severe period pain selected'],
      painFlag,
      painMessage,
    }
  }

  if (hasOvarianFinding && !hasOvulatoryDysfunction && !hasHyperandrogenism) {
    return {
      id: 'pcod_only',
      label: 'Plain PCOD / PCOM-only pattern',
      shortLabel: 'PCOD-only pattern',
      tone: 'Your answers point more toward a plain PCOD or polycystic-ovary finding than a full PCOS pattern.',
      description:
        'This means a scan or report may have mentioned polycystic ovaries, but your current answers do not show the stronger cycle-and-androgen combination usually used to describe PCOS. In everyday language this is often called PCOD, especially when symptoms are mild or mainly scan-based.',
      nextStep:
        'A protocol preview would focus on tracking cycles, energy, nutrition, and whether symptoms are stable or changing, rather than assuming a full PCOS picture.',
      matchedSignals,
      painFlag,
      painMessage: painFlag ? painMessage : undefined,
    }
  }

  if (
    hasOvulatoryDysfunction &&
    hasHyperandrogenism &&
    hasOvarianFinding
  ) {
    return {
      id: 'phenotype_a',
      label: 'Phenotype A - classic PCOS pattern',
      shortLabel: 'Classic pattern',
      tone: 'Your answers align with the classic A pattern: cycle disruption, androgen-linked signs, and a polycystic ovarian finding.',
      description:
        'Phenotype A is the most complete Rotterdam-style pattern. It usually has ovulatory dysfunction, visible or lab-based androgen features, and polycystic ovarian morphology together.',
      nextStep:
        'A full protocol preview would usually look at cycle regularity, androgen signs, insulin resistance clues, nutrition, supplements, and constitutional care together.',
      matchedSignals,
      painFlag,
      painMessage: painFlag ? painMessage : undefined,
    }
  }

  if (hasOvulatoryDysfunction && hasHyperandrogenism && !hasOvarianFinding) {
    return {
      id: 'phenotype_b',
      label: 'Phenotype B - hyperandrogenic PCOS pattern',
      shortLabel: 'Hyperandrogenic pattern',
      tone: 'Your answers align with the B pattern: cycle disruption plus androgen-linked signs, without a confirmed ovarian scan finding.',
      description:
        'Phenotype B can still be a meaningful PCOS pattern even when a scan is normal, unavailable, or not yet checked. The key pairing is ovulatory dysfunction plus androgen features.',
      nextStep:
        'A full protocol preview would connect your cycle story with energy, cravings, visible symptoms, and care options across nutrition and integrative support.',
      matchedSignals,
      painFlag,
      painMessage: painFlag ? painMessage : undefined,
    }
  }

  if (!hasOvulatoryDysfunction && hasHyperandrogenism && hasOvarianFinding) {
    return {
      id: 'phenotype_c',
      label: 'Phenotype C - ovulatory PCOS pattern',
      shortLabel: 'Ovulatory pattern',
      tone: 'Your answers align with the C pattern: regular cycles, androgen-linked signs, and a polycystic ovarian finding.',
      description:
        'Phenotype C can be easier to miss because periods may look regular. The pattern comes from androgen-linked signs appearing alongside a polycystic ovarian finding.',
      nextStep:
        'A full protocol preview would focus on the hidden drivers behind symptoms, including labs, skin or hair changes, energy, and inflammatory clues.',
      matchedSignals,
      regularCycleFlag:
        'Regular cycles can still mask hormonal imbalance, especially when androgen-linked symptoms are present.',
      painFlag,
      painMessage: painFlag ? painMessage : undefined,
    }
  }

  if (hasOvulatoryDysfunction && !hasHyperandrogenism && hasOvarianFinding) {
    return {
      id: 'phenotype_d',
      label: 'Phenotype D - non-androgenic PCOS pattern',
      shortLabel: 'Non-androgenic pattern',
      tone: 'Your answers align with the D pattern: cycle disruption plus a polycystic ovarian finding, without strong androgen-linked signs.',
      description:
        'Phenotype D is a non-androgenic PCOS pattern. It may not look like the acne-and-hair-growth version, but irregular cycles plus a polycystic ovarian finding can still deserve structured care.',
      nextStep:
        'A full protocol preview would look at cycle history, energy regulation, stress load, nutrition, and gentle clinical review.',
      matchedSignals,
      painFlag,
      painMessage: painFlag ? painMessage : undefined,
    }
  }

  if (
    hasOvulatoryDysfunction &&
    !hasHyperandrogenism &&
    !hasOvarianFinding &&
    (hasNoVisibleSymptoms || hasStressOrPostPillTrigger || hasStressEnergy)
  ) {
    return {
      id: 'functional_cycle_disruption',
      label: 'Cycle-disruption pattern',
      shortLabel: 'Cycle disruption',
      tone: 'Your answers show irregular cycles, but not enough PCOS-specific signals to call it a phenotype A-D pattern.',
      description:
        'This may be closer to stress-linked, post-pill, lifestyle, thyroid, prolactin, nutrition, or other cycle-disruption patterns. If a future scan shows polycystic ovarian morphology, this could move closer to Phenotype D or a PCOD-only picture.',
      nextStep:
        'A protocol preview would begin with cycle history, sleep, stress, nutrition, and basic lab context before assuming PCOS.',
      matchedSignals,
      painFlag,
      painMessage: painFlag ? painMessage : undefined,
    }
  }

  return {
    id: 'mixed_pattern',
    label: 'Mixed or unclear hormone pattern',
    shortLabel: 'Mixed pattern',
    tone: 'Your answers do not fit one clean bucket, which is common in real life.',
    description:
      'The result does not line up cleanly with Phenotype A, B, C, D, or a plain PCOD-only pattern. That can happen when symptoms are early, mixed, changing, or missing scan/lab context.',
    nextStep:
      'A full protocol preview would start with your cycle pattern, visible symptoms, energy, and pain history, then guide what the Mauri care team should review with you.',
    matchedSignals,
    painFlag,
    painMessage: painFlag ? painMessage : undefined,
  }
}

const pathwayByLegacyResult: Record<string, DiscoveryPathwayId> = {
  phenotype_a: 'mirror_pcos',
  phenotype_b: 'invisible_pcos',
  phenotype_c: 'silent_pcos',
  phenotype_d: 'survival_pcos',
  functional_cycle_disruption: 'functional_stress_cycle_disruption',
  mixed_pattern: 'mixed_hormonal_pattern',
  pain_first: 'needs_clinical_review',
  pcod_only: 'needs_clinical_review',
}

const recoveryPathways: Record<DiscoveryPathwayId, RecoveryPathway> = {
  mirror_pcos: {
    id: 'mirror_pcos',
    title: 'Mirror PCOS Pattern',
    subtitle: 'Most closely maps to the classic Rotterdam Phenotype A teaching pattern.',
    description:
      'Your answers show cycle disruption, androgen-linked signs, and a report history that may fit a PCOS learning pathway. This does not diagnose PCOS, but it gives you a clearer way to organize the conversation.',
    journeyStart: [
      'Understand androgen-linked signs such as acne, hair growth, or hair fall.',
      'Track cycle length, bleeding pattern, energy, cravings, and skin changes.',
      'Prepare questions about insulin resistance, androgen labs, and ultrasound context.',
    ],
    seekCare: [
      'Book a Mauri care team review if cycles are repeatedly longer than 35 days or missing.',
      'Discuss sudden worsening of hair growth, acne, or rapid weight change.',
      'Contact the Mauri care team promptly for severe pelvic pain, heavy bleeding, fainting, or pregnancy concerns. If symptoms feel urgent, seek local emergency care.',
    ],
  },
  invisible_pcos: {
    id: 'invisible_pcos',
    title: 'Invisible PCOS Pattern',
    subtitle: 'Most closely maps to Rotterdam Phenotype B without a confirmed ovarian finding.',
    description:
      'Your answers show cycle disruption with androgen-linked signs, even without a confirmed scan finding. This pathway helps you understand symptoms that may not always appear clearly on ultrasound.',
    journeyStart: [
      'Track cycles alongside acne, hair changes, cravings, energy, and mood.',
      'Gather previous reports and note whether scans were normal, unavailable, or not done.',
      'Prepare for a Mauri care team conversation about labs and symptom history.',
    ],
    seekCare: [
      'Discuss irregular or missing periods with the Mauri doctors and care team.',
      'Ask for review if symptoms are progressing even when scans look normal.',
      'Contact the Mauri care team for severe pain, very heavy bleeding, or new concerning symptoms. If symptoms feel urgent, seek local emergency care.',
    ],
  },
  silent_pcos: {
    id: 'silent_pcos',
    title: 'Silent PCOS Pattern',
    subtitle: 'Most closely maps to Rotterdam Phenotype C with regular cycles.',
    description:
      'Your answers suggest that periods may look regular while androgen-linked signs and ovarian findings still deserve attention. This pathway is about looking beyond cycle regularity.',
    journeyStart: [
      'Track skin, hair, energy, weight changes, and cravings alongside your cycle.',
      'Review ultrasound history and any hormone or metabolic reports.',
      'Prepare questions about why symptoms may appear despite regular periods.',
    ],
    seekCare: [
      'Discuss persistent acne, hair fall, hair growth, or unexplained body changes.',
      'Review any ultrasound finding with the Mauri care team instead of relying on the scan alone.',
      'Contact the Mauri care team if pain, bleeding, or symptoms suddenly worsen. If symptoms feel urgent, seek local emergency care.',
    ],
  },
  survival_pcos: {
    id: 'survival_pcos',
    title: 'Survival PCOS Pattern',
    subtitle: 'Most closely maps to Rotterdam Phenotype D without strong androgen signs.',
    description:
      'Your answers show cycle disruption and a polycystic ovarian finding without strong visible androgen signs. This pathway focuses on cycles, stress load, recovery, and clinical context.',
    journeyStart: [
      'Track cycle rhythm, sleep, stress, energy, and recovery patterns.',
      'Gather scan history and basic lab context for a Mauri care team discussion.',
      'Build gentle habits that support consistency without overwhelm.',
    ],
    seekCare: [
      'Discuss missing or very delayed periods with the Mauri care team.',
      'Review whether thyroid, prolactin, nutrition, stress, or other drivers should be checked.',
      'Contact the Mauri care team promptly for severe pelvic pain or heavy bleeding. If symptoms feel urgent, seek local emergency care.',
    ],
  },
  possible_endometriosis: {
    id: 'possible_endometriosis',
    title: 'Possible Endometriosis Pattern',
    subtitle: 'A pelvic-pain-first pathway for deeper discussion with the Mauri care team.',
    description:
      'Your answers suggest a pattern that may be consistent with endometriosis or another pelvic pain condition. We need to discuss with you more in detail.',
    journeyStart: [
      'Track pain timing before, during, and outside periods.',
      'Note bowel, bladder, intercourse pain, bleeding, and daily-life impact.',
      'Prepare a focused symptom timeline for the Mauri doctors and care team.',
    ],
    seekCare: [
      'Discuss severe, recurring, or life-disrupting pelvic pain with the Mauri doctors and care team.',
      'Contact the Mauri care team promptly for sudden severe pain, fever, fainting, pregnancy concern, or very heavy bleeding. If symptoms feel urgent, seek local emergency care.',
      'Ask the Mauri team for review when pain affects work, school, relationships, or daily functioning.',
    ],
  },
  functional_stress_cycle_disruption: {
    id: 'functional_stress_cycle_disruption',
    title: 'Functional / Stress-Related Cycle Disruption',
    subtitle: 'A recovery and regulation pathway when PCOS signals are not strong.',
    description:
      'Your answers suggest irregular cycles without enough PCOS-specific signals. Stress, sleep, nutrition, thyroid, prolactin, weight change, or lifestyle load can all shape cycle rhythm.',
    journeyStart: [
      'Track sleep, stress, meals, movement, energy, and cycle changes.',
      'Build a simple timeline of when the change began.',
      'Prepare questions about basic labs and non-PCOS cycle drivers.',
    ],
    seekCare: [
      'Discuss cycles that stay irregular, missing, or unpredictable.',
      'Ask the Mauri care team to review your pattern before assuming stress is the only cause.',
      'Contact the Mauri care team for heavy bleeding, severe pain, fainting, or pregnancy concerns. If symptoms feel urgent, seek local emergency care.',
    ],
  },
  possible_post_pill_cycle_recovery: {
    id: 'possible_post_pill_cycle_recovery',
    title: 'Possible Post-Pill Cycle Recovery',
    subtitle: 'A transition pathway after stopping hormonal birth control.',
    description:
      'Your answers suggest symptoms or cycle changes began after stopping birth control. This can need time, tracking, and clinical context, especially if irregularity persists.',
    journeyStart: [
      'Track cycle return, bleeding pattern, acne, hair changes, mood, and energy.',
      'Note when birth control was stopped and what changed afterward.',
      'Prepare questions about when to investigate persistent irregular cycles.',
    ],
    seekCare: [
      'Discuss absent or highly irregular cycles that continue after stopping birth control.',
      'Ask for review if androgen-linked signs or pain become prominent.',
      'Contact the Mauri care team promptly for severe pain, very heavy bleeding, or pregnancy concerns. If symptoms feel urgent, seek local emergency care.',
    ],
  },
  mixed_hormonal_pattern: {
    id: 'mixed_hormonal_pattern',
    title: 'Mixed Hormonal Pattern',
    subtitle: 'A broader discovery pathway when symptoms do not fit one clean bucket.',
    description:
      'Your answers do not fit a single clear teaching pattern yet. This is common when symptoms are early, mixed, changing, or missing report context.',
    journeyStart: [
      'Track the symptoms that change first and the symptoms that repeat.',
      'Gather ultrasound, hormone, thyroid, prolactin, vitamin, and metabolic reports if available.',
      'Prepare a simple timeline for discussion with the Mauri care team.',
    ],
    seekCare: [
      'Discuss persistent symptoms with the Mauri doctors and care team rather than self-labeling.',
      'Ask the Mauri team for review if symptoms are worsening or affecting daily life.',
      'Contact the Mauri care team promptly for severe pain, heavy bleeding, fainting, or sudden changes. If symptoms feel urgent, seek local emergency care.',
    ],
  },
  needs_clinical_review: {
    id: 'needs_clinical_review',
    title: 'Needs Further Clinical Review',
    subtitle: 'A careful review pathway when the pattern needs more context.',
    description:
      'Your answers need more clinical context before a clear educational pathway can be chosen. This may happen with scan-only PCOD/PCOM findings, uncertain answers, or symptoms that deserve direct review.',
    journeyStart: [
      'Collect scan reports, lab reports, cycle history, pain history, and medication history.',
      'Track cycles, pain, bleeding, energy, mood, skin, hair, and weight changes.',
      'Prepare questions for the Mauri care team before choosing a long-term roadmap.',
    ],
    seekCare: [
      'Book a Mauri care team review when reports and symptoms do not match clearly.',
      'Discuss scan-only PCOD/PCOM findings instead of assuming full PCOS.',
      'Contact the Mauri care team promptly for severe pain, heavy bleeding, fainting, fever, or pregnancy concerns. If symptoms feel urgent, seek local emergency care.',
    ],
  },
}

function isAnswered(question: Question, answers: Answers) {
  const value = answers[question.id]

  if (question.type === 'multi') {
    return Array.isArray(value) && value.length > 0
  }

  return typeof value === 'string' && value.length > 0
}

function addUnique(
  values: DiscoveryPathwayId[],
  value: DiscoveryPathwayId,
  primary: DiscoveryPathwayId,
) {
  if (value !== primary && !values.includes(value)) {
    values.push(value)
  }
}

function hasCyclicPainSignal(answers: Answers) {
  return (
    answers.painBeforePeriods === 'yes' ||
    answers.painBeforePeriods === 'sometimes' ||
    answers.painDuringPeriods === 'yes' ||
    answers.painDuringPeriods === 'sometimes'
  )
}

function assessEndometriosisPattern(answers: Answers) {
  const painSeverity = Number(answers.painSeverity)
  const highPain = Number.isFinite(painSeverity) && painSeverity >= 7
  const moderatePain = Number.isFinite(painSeverity) && painSeverity >= 5
  const signals = [
    answers.painBeforePeriods === 'yes' || answers.painBeforePeriods === 'sometimes'
      ? 'Pain appears before periods'
      : '',
    answers.painDuringPeriods === 'yes' || answers.painDuringPeriods === 'sometimes'
      ? 'Pain appears during periods'
      : '',
    answers.painDuringIntercourse === 'yes'
      ? 'Pain during intercourse selected'
      : '',
    answers.painDuringBowelMovements === 'yes' ||
    answers.painDuringBowelMovements === 'sometimes'
      ? 'Pain with bowel movements selected'
      : '',
    answers.heavyBleeding === 'yes' || answers.heavyBleeding === 'sometimes'
      ? 'Heavy bleeding selected'
      : '',
    answers.endometriosisFamilyHistory === 'yes'
      ? 'Family history of endometriosis selected'
      : '',
    answers.painLifeImpact === 'yes' || answers.painPattern === 'severe'
      ? 'Pain affects daily life'
      : '',
  ].filter(Boolean)

  const meetsCriteria =
    (highPain && (answers.painLifeImpact === 'yes' || signals.length >= 3)) ||
    (hasCyclicPainSignal(answers) &&
      (answers.painDuringIntercourse === 'yes' ||
        answers.painDuringBowelMovements === 'yes') &&
      (moderatePain || answers.painLifeImpact !== 'no'))

  return {
    meetsCriteria,
    needsReview: highPain || answers.painLifeImpact === 'yes',
    signals,
  }
}

function recognizePattern(answers: Answers, legacyResult: Result): PatternRecognition {
  const endometriosis = assessEndometriosisPattern(answers)
  let primaryPattern =
    pathwayByLegacyResult[legacyResult.id] ?? 'mixed_hormonal_pattern'
  const secondaryConsiderations: DiscoveryPathwayId[] = []
  const noticed = [...legacyResult.matchedSignals]

  if (answers.painSeverity) {
    noticed.push(`Worst pain intensity selected: ${answers.painSeverity} / 10`)
  }

  if (endometriosis.signals.length > 0) {
    noticed.push(...endometriosis.signals)
  }

  if (answers.cycleHistory === 'post_pill') {
    noticed.push('Cycles changed after stopping birth control')
  }

  if (answers.cycleHistory === 'stress' || answers.energyPattern === 'wired') {
    noticed.push('Stress or nervous-system load may be part of the cycle story')
  }

  if (endometriosis.meetsCriteria) {
    if (
      primaryPattern === 'mixed_hormonal_pattern' ||
      primaryPattern === 'functional_stress_cycle_disruption' ||
      primaryPattern === 'possible_post_pill_cycle_recovery' ||
      primaryPattern === 'needs_clinical_review'
    ) {
      primaryPattern = 'possible_endometriosis'
    } else {
      addUnique(secondaryConsiderations, 'possible_endometriosis', primaryPattern)
    }
  }

  if (answers.cycleHistory === 'post_pill') {
    if (
      primaryPattern === 'mixed_hormonal_pattern' ||
      primaryPattern === 'needs_clinical_review'
    ) {
      primaryPattern = 'possible_post_pill_cycle_recovery'
    } else {
      addUnique(
        secondaryConsiderations,
        'possible_post_pill_cycle_recovery',
        primaryPattern,
      )
    }
  }

  if (answers.cycleHistory === 'stress' || answers.energyPattern === 'wired') {
    if (primaryPattern === 'mixed_hormonal_pattern') {
      primaryPattern = 'functional_stress_cycle_disruption'
    } else {
      addUnique(
        secondaryConsiderations,
        'functional_stress_cycle_disruption',
        primaryPattern,
      )
    }
  }

  if (endometriosis.needsReview && !endometriosis.meetsCriteria) {
    addUnique(secondaryConsiderations, 'needs_clinical_review', primaryPattern)
  }

  return {
    primaryPattern,
    secondaryConsiderations,
    noticed,
    clinicalMessage: endometriosis.meetsCriteria
      ? recoveryPathways.possible_endometriosis.description
      : undefined,
  }
}

function buildDiscoveryOutcome(
  answers: Answers,
  legacyResult: Result,
): DiscoveryOutcome {
  const patternRecognition = recognizePattern(answers, legacyResult)

  return {
    patternRecognition,
    recoveryPathway: recoveryPathways[patternRecognition.primaryPattern],
  }
}

export default function PhenotypeQuiz() {
  const [answers, setAnswers] = useState<Answers>(emptyAnswers)
  const [step, setStep] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [message, setMessage] = useState('')

  const currentQuestion = questions[step]
  const progress = Math.round(((step + 1) / questions.length) * 100)
  const legacyResult = useMemo(() => scoreAnswers(answers), [answers])
  const discoveryOutcome = useMemo(
    () => buildDiscoveryOutcome(answers, legacyResult),
    [answers, legacyResult],
  )

  function selectSingle(questionId: keyof Answers, value: string) {
    setAnswers((current) => ({
      ...current,
      [questionId]: value,
    }))
  }

  function toggleMulti(questionId: keyof Answers, value: string) {
    setAnswers((current) => {
      const existing = current[questionId]
      const selected = Array.isArray(existing) ? existing : []

      if (value === 'none') {
        return {
          ...current,
          [questionId]: selected.includes('none') ? [] : ['none'],
        }
      }

      const withoutNone = selected.filter((item) => item !== 'none')
      const next = withoutNone.includes(value)
        ? withoutNone.filter((item) => item !== value)
        : [...withoutNone, value]

      return {
        ...current,
        [questionId]: next,
      }
    })
  }

  function goNext() {
    if (step === questions.length - 1) {
      setShowResult(true)
      return
    }

    setStep((current) => current + 1)
  }

  function goBack() {
    setStep((current) => Math.max(0, current - 1))
  }

  function resetQuiz() {
    setAnswers(emptyAnswers)
    setStep(0)
    setShowResult(false)
    setName('')
    setEmail('')
    setSubmitState('idle')
    setMessage('')
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitState('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          source: 'phenotype_quiz',
          quiz_result: legacyResult.id,
          quiz_answers: {
            answers,
            legacyResult: legacyResult.id,
            discoveryOutcome,
          },
          endometriosis_flag:
            discoveryOutcome.patternRecognition.primaryPattern ===
              'possible_endometriosis' ||
            discoveryOutcome.patternRecognition.secondaryConsiderations.includes(
              'possible_endometriosis',
            ),
        }),
      })

      const data = (await response.json()) as { error?: string }

      if (!response.ok) {
        throw new Error(data.error ?? 'Please try again.')
      }

      setSubmitState('success')
      setMessage(
        'Thanks. Your Mauri Discovery Assessment has been saved and your roadmap preview will arrive in your inbox soon.',
      )
      setName('')
      setEmail('')
    } catch (error) {
      setSubmitState('error')
      setMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      )
    }
  }

  if (showResult) {
    const { patternRecognition, recoveryPathway } = discoveryOutcome
    const secondaryPathways = patternRecognition.secondaryConsiderations.map(
      (pathwayId) => recoveryPathways[pathwayId],
    )

    return (
      <PageSection className="pb-20">
        <PageContainer className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-8">
          <div className="rounded-xl border border-border bg-white/70 p-5 shadow-sm sm:p-6 lg:p-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-teal-light px-4 py-2 text-sm font-medium text-teal-dark">
              <HeartPulse className="h-4 w-4" aria-hidden="true" />
              Your Hormonal Story
            </div>

            <p className="text-sm font-medium uppercase tracking-[0.08em] text-teal">
              Primary Pattern
            </p>
            <h1 className="mt-3 font-playfair text-4xl font-normal leading-tight text-teal-dark sm:text-5xl">
              {recoveryPathway.title}
            </h1>
            <p className="mt-3 text-sm font-medium text-muted">
              {recoveryPathway.subtitle}
            </p>

            {secondaryPathways.length > 0 ? (
              <div className="mt-6 rounded-lg border border-border bg-warm-white p-4 sm:p-5">
                <h2 className="text-base font-medium text-teal-dark">
                  Secondary Considerations
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {secondaryPathways.map((pathway) => (
                    <span
                      key={pathway.id}
                      className="rounded-full bg-teal-light px-3 py-1 text-sm font-medium text-teal-dark"
                    >
                      {pathway.title}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-6 rounded-lg border border-border bg-warm-white p-4 sm:p-5">
              <h2 className="text-base font-medium text-teal-dark">
                What We Noticed
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-ink">
                {patternRecognition.noticed.map((signal) => (
                  <li key={signal} className="flex gap-2">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-teal"
                      aria-hidden="true"
                    />
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 rounded-lg bg-teal-light p-4 sm:p-5">
              <h2 className="text-base font-medium text-teal-dark">
                What This May Mean
              </h2>
              <p className="mt-2 leading-7 text-ink">
                {patternRecognition.clinicalMessage ?? recoveryPathway.description}
              </p>
            </div>

            <div className="mt-4 rounded-lg bg-rose-light p-4 sm:p-5">
              <h2 className="text-base font-medium text-teal-dark">
                Where Your Journey May Begin
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-ink">
                {recoveryPathway.journeyStart.map((focus) => (
                  <li key={focus} className="flex gap-2">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-rose"
                      aria-hidden="true"
                    />
                    <span>{focus}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 rounded-lg bg-amber-light p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <AlertCircle
                  className="mt-1 h-5 w-5 shrink-0 text-amber"
                  aria-hidden="true"
                />
                <div>
                  <h2 className="text-base font-medium text-teal-dark">
                    When To Seek Medical Care
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-ink">
                    {recoveryPathway.seekCare.map((careNote) => (
                      <li key={careNote} className="flex gap-2">
                        <Check
                          className="mt-1 h-4 w-4 shrink-0 text-amber"
                          aria-hidden="true"
                        />
                        <span>{careNote}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={resetQuiz}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-medium text-teal-dark transition hover:bg-teal-light"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Retake assessment
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-medium text-teal-dark transition hover:bg-teal-light"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to home
              </Link>
            </div>
          </div>

          <aside className="rounded-xl bg-teal-dark p-5 text-white shadow-sm sm:p-6 lg:p-8">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-teal-mid/20">
              <Mail className="h-5 w-5 text-teal-mid" aria-hidden="true" />
            </div>
            <h2 className="mt-5 font-playfair text-3xl font-normal leading-tight text-teal-light">
              Get my full roadmap preview by email
            </h2>
            <p className="mt-3 leading-7 text-teal-mid">
              Share your name and email to save this assessment and join the
              early access review queue.
            </p>
            <div className="mt-5 rounded-lg bg-teal-mid/10 p-4">
              <p className="leading-7 text-teal-mid">
                This assessment is only the beginning.
              </p>
              <p className="mt-2 leading-7 text-teal-mid">
                Your full Mauri Recovery Roadmap combines your story, clinical
                discussion, and ongoing guidance to build a personalized healing
                journey.
              </p>
            </div>

            <form onSubmit={submitLead} className="mt-6 space-y-3">
              <div>
                <label htmlFor="quiz-name" className="sr-only">
                  Name
                </label>
                <input
                  id="quiz-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  minLength={2}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="h-12 w-full rounded-lg border border-transparent bg-white px-4 text-sm text-ink outline-none transition focus:border-amber focus:ring-2 focus:ring-amber/40"
                />
              </div>
              <div>
                <label htmlFor="quiz-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="quiz-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-lg border border-transparent bg-white px-4 text-sm text-ink outline-none transition focus:border-amber focus:ring-2 focus:ring-amber/40"
                />
              </div>
              <button
                type="submit"
                disabled={submitState === 'submitting'}
                className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-amber px-5 text-sm font-medium text-teal-dark transition hover:bg-amber-light disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitState === 'submitting'
                  ? 'Sending...'
                  : 'Send my preview'}
              </button>
            </form>

            {message ? (
              <p
                role={submitState === 'error' ? 'alert' : 'status'}
                className={`mt-4 rounded-lg px-4 py-3 text-sm leading-6 ${
                  submitState === 'success'
                    ? 'bg-teal-light text-teal-dark'
                    : 'bg-rose-light text-rose'
                }`}
              >
                {message}
              </p>
            ) : null}
          </aside>
        </PageContainer>
      </PageSection>
    )
  }

  const selectedValue = answers[currentQuestion.id]

  return (
    <PageSection className="pb-20">
      <PageContainer size="narrow">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-teal-dark transition hover:text-teal"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>

        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-teal">
            Mauri Discovery Assessment
          </p>
          <h1 className="mt-3 font-playfair text-4xl font-normal leading-tight text-teal-dark sm:text-5xl">
            Discover Your Hormonal Story
          </h1>
          <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
            A few simple questions to help us understand your unique hormonal
            pattern and guide your recovery journey.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-white/70 p-5 shadow-sm sm:p-6 lg:p-8">
          <div className="mb-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-light px-4 py-2 text-sm font-medium text-teal-dark">
                <Activity className="h-4 w-4" aria-hidden="true" />
                Step {step + 1} of {questions.length}
              </div>
              <span className="text-sm font-medium text-muted">
                {progress}% complete
              </span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-teal-light">
              <div
                className="h-full rounded-full bg-teal transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <p className="text-sm font-medium uppercase tracking-[0.08em] text-teal">
            {currentQuestion.eyebrow}
          </p>
          <h2 className="mt-3 font-playfair text-3xl font-normal leading-tight text-teal-dark sm:text-4xl">
            {currentQuestion.question}
          </h2>

          <div
            className={`mt-8 grid gap-3 ${
              currentQuestion.id === 'painSeverity'
                ? 'grid-cols-2 sm:grid-cols-4'
                : ''
            }`}
          >
            {currentQuestion.options.map((option) => {
              const checked =
                currentQuestion.type === 'multi'
                  ? Array.isArray(selectedValue) &&
                    selectedValue.includes(option.value)
                  : selectedValue === option.value

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    currentQuestion.type === 'multi'
                      ? toggleMulti(currentQuestion.id, option.value)
                      : selectSingle(currentQuestion.id, option.value)
                  }
                  className={`flex min-h-14 items-center justify-between gap-4 rounded-lg border px-4 py-4 text-left text-base leading-6 transition ${
                    checked
                      ? 'border-teal bg-teal-light text-teal-dark'
                      : 'border-border bg-warm-white text-ink hover:border-teal'
                  }`}
                >
                  <span>{option.label}</span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                      checked
                        ? 'border-teal bg-teal text-white'
                        : 'border-border bg-white'
                    }`}
                  >
                    {checked ? (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    ) : null}
                  </span>
                </button>
              )
            })}
          </div>

          {currentQuestion.type === 'multi' ? (
            <p className="mt-4 text-sm leading-6 text-muted">
              Choose every option that fits. Selecting "None of these" clears
              other symptom choices.
            </p>
          ) : null}

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-medium text-teal-dark transition hover:bg-teal-light disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={!isAnswered(currentQuestion, answers)}
              className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {step === questions.length - 1 ? 'See my story' : 'Continue'}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </PageContainer>
    </PageSection>
  )
}

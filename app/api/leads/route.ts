import { mkdir, stat, writeFile } from 'fs/promises'
import path from 'path'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const csvHeaders = [
  'created_at',
  'name',
  'email',
  'source',
  'quiz_result',
  'endometriosis_flag',
  'quiz_answers_json',
]

type LeadPayload = {
  name?: unknown
  email?: unknown
  source?: unknown
  quiz_result?: unknown
  quiz_answers?: unknown
  endometriosis_flag?: unknown
}

type Lead = {
  created_at: string
  name: string
  email: string
  source: string
  quiz_result: string
  quiz_answers: unknown
  endometriosis_flag: boolean
}

function csvEscape(value: unknown) {
  const text =
    typeof value === 'string' ? value : JSON.stringify(value ?? '') ?? ''

  return `"${text.replace(/"/g, '""')}"`
}

function leadToCsvRow(lead: Lead) {
  return [
    lead.created_at,
    lead.name,
    lead.email,
    lead.source,
    lead.quiz_result,
    lead.endometriosis_flag,
    lead.quiz_answers,
  ]
    .map(csvEscape)
    .join(',')
}

function formatAnswers(answers: unknown) {
  if (!answers || typeof answers !== 'object') {
    return 'No quiz answers submitted.'
  }

  return Object.entries(answers)
    .map(([key, value]) => {
      const answer = Array.isArray(value) ? value.join(', ') : String(value)
      return `${key}: ${answer || 'not answered'}`
    })
    .join('\n')
}

async function appendLeadToCsv(lead: Lead) {
  const storageDir = path.join(process.cwd(), 'storage')
  const csvPath = path.join(storageDir, 'leads.csv')
  const row = `${leadToCsvRow(lead)}\n`

  await mkdir(storageDir, { recursive: true })

  try {
    await stat(csvPath)
    await writeFile(csvPath, row, { flag: 'a' })
  } catch {
    await writeFile(csvPath, `${csvHeaders.join(',')}\n${row}`, {
      flag: 'wx',
    })
  }
}

async function sendLeadEmail(lead: Lead) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEAD_NOTIFICATION_TO
  const from = process.env.LEAD_NOTIFICATION_FROM ?? 'Mauri <onboarding@resend.dev>'

  if (!apiKey || !to) {
    console.info('Lead email skipped because Resend env vars are missing.')
    return { skipped: true }
  }

  const resend = new Resend(apiKey)
  const subject =
    lead.source === 'phenotype_quiz'
      ? `New Mauri phenotype lead - ${lead.quiz_result || 'result pending'}`
      : 'New Mauri waitlist lead'

  const text = [
    'New Mauri lead',
    '',
    `Created at: ${lead.created_at}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Source: ${lead.source}`,
    `Phenotype result: ${lead.quiz_result || 'Not submitted'}`,
    `Pain flag: ${lead.endometriosis_flag ? 'Yes' : 'No'}`,
    '',
    'Quiz/profile answers:',
    formatAnswers(lead.quiz_answers),
  ].join('\n')

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: lead.email,
    subject,
    text,
  })

  if (error) {
    throw new Error(error.message)
  }

  return { skipped: false }
}

export async function POST(request: Request) {
  let payload: LeadPayload

  try {
    payload = (await request.json()) as LeadPayload
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : ''
  const email = typeof payload.email === 'string' ? payload.email.trim() : ''
  const source = typeof payload.source === 'string' ? payload.source : 'hero_cta'

  if (name.length < 2) {
    return NextResponse.json(
      { error: 'Please enter your name.' },
      { status: 400 },
    )
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 },
    )
  }

  const lead: Lead = {
    created_at: new Date().toISOString(),
    name,
    email,
    source,
    quiz_result:
      typeof payload.quiz_result === 'string' ? payload.quiz_result : '',
    quiz_answers: payload.quiz_answers ?? null,
    endometriosis_flag:
      typeof payload.endometriosis_flag === 'boolean'
        ? payload.endometriosis_flag
        : false,
  }

  try {
    await appendLeadToCsv(lead)
  } catch (error) {
    console.error('Failed to write lead CSV:', error)
    return NextResponse.json(
      { error: 'Could not save your details. Please try again.' },
      { status: 500 },
    )
  }

  try {
    const emailResult = await sendLeadEmail(lead)
    return NextResponse.json({ ok: true, email_skipped: emailResult.skipped })
  } catch (error) {
    console.error('Lead saved, but email notification failed:', error)
    return NextResponse.json({
      ok: true,
      email_error: 'Lead saved, but email notification failed.',
    })
  }
}

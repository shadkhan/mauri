import { Resend } from 'resend'
import { type ResultSetHeader } from 'mysql2'
import { NextResponse } from 'next/server'
import { getDbPool } from '@/lib/db'

export const runtime = 'nodejs'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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

async function ensureLeadTable() {
  await getDbPool().execute(`
    CREATE TABLE IF NOT EXISTS leads (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      created_at DATETIME(3) NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(320) NOT NULL,
      source VARCHAR(120) NOT NULL,
      quiz_result VARCHAR(255) NOT NULL DEFAULT '',
      endometriosis_flag BOOLEAN NOT NULL DEFAULT FALSE,
      quiz_answers JSON NULL,
      PRIMARY KEY (id),
      INDEX idx_leads_created_at (created_at),
      INDEX idx_leads_email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)
}

async function saveLead(lead: Lead) {
  await ensureLeadTable()

  const [result] = await getDbPool().execute<ResultSetHeader>(
    `INSERT INTO leads (
      created_at,
      name,
      email,
      source,
      quiz_result,
      endometriosis_flag,
      quiz_answers
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      new Date(lead.created_at),
      lead.name,
      lead.email,
      lead.source,
      lead.quiz_result,
      lead.endometriosis_flag,
      JSON.stringify(lead.quiz_answers),
    ],
  )

  return result.insertId
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
    await saveLead(lead)
  } catch (error) {
    console.error('Failed to save lead:', error)
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

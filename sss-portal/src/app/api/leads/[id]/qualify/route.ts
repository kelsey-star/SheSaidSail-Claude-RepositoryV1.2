import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { leads } from '@/lib/airtable'

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!['Owner', 'Concierge'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const actor = session.user.name ?? session.user.email

  try {
    const record = await leads.qualify(params.id, actor)
    return NextResponse.json({ ok: true, id: record.id })
  } catch (err) {
    console.error('POST /api/leads/[id]/qualify', err)
    return NextResponse.json({ error: 'Qualify failed' }, { status: 500 })
  }
}

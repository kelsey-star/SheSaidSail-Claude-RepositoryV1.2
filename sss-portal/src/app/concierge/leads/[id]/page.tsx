import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { leads } from '@/lib/airtable'
import { SLABadge, StatusBadge } from '@/components/ui/badge'
import { fmtDate, fmt$ } from '@/lib/utils'
import { LeadActions } from './lead-actions'
import type { SLAStatus } from '@/types'

export const metadata: Metadata = { title: 'Lead Detail' }

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  let record
  try {
    record = await leads.getById(params.id)
  } catch {
    notFound()
  }

  const f = record.fields
  const sla = (f.SLA_Status as SLAStatus) ?? 'GREEN'

  return (
    <div className="p-8 max-w-[900px]">
      {/* Back */}
      <Link
        href="/concierge/leads"
        className="inline-flex items-center gap-1.5 text-sm text-[#505050] hover:text-[#f0ede8] transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Lead Board
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-[#f0ede8] tracking-tight">
            {(f.Name as string) ?? 'Unknown Lead'}
          </h1>
          <p className="text-sm text-[#505050] mt-1">{(f.Email as string) ?? ''}</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={(f.Status as string) ?? 'NEW'} />
          <SLABadge status={sla} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead details */}
        <div className="lg:col-span-2 space-y-5">
          {/* Charter details */}
          <div className="bg-[#141414] border border-[#252525] rounded-xl p-5">
            <h2 className="text-xs font-medium uppercase tracking-widest text-[#505050] mb-4">
              Charter Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Detail label="Destination" value={(f.Destination as string) ?? '—'} />
              <Detail label="Charter Date" value={fmtDate(f.Charter_Date as string)} />
              <Detail
                label="Group Size"
                value={(f.Group_Size as number)?.toString() ?? '—'}
              />
              <Detail label="Budget Range" value={(f.Budget_Range as string) ?? '—'} />
              <Detail label="Source" value={(f.Source as string) ?? '—'} />
              <Detail label="Probability" value={f.Probability ? `${f.Probability}%` : '—'} />
            </div>
          </div>

          {/* Contact */}
          <div className="bg-[#141414] border border-[#252525] rounded-xl p-5">
            <h2 className="text-xs font-medium uppercase tracking-widest text-[#505050] mb-4">
              Contact
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Detail label="Email" value={(f.Email as string) ?? '—'} />
              <Detail label="Phone" value={(f.Phone as string) ?? '—'} />
              <Detail label="Last Contact" value={fmtDate(f.Last_Contact as string)} />
              <Detail label="Follow Up" value={fmtDate(f.Follow_Up_Date as string)} />
            </div>
          </div>

          {/* Notes */}
          {f.Notes && (
            <div className="bg-[#141414] border border-[#252525] rounded-xl p-5">
              <h2 className="text-xs font-medium uppercase tracking-widest text-[#505050] mb-3">
                Notes
              </h2>
              <p className="text-sm text-[#a09a90] whitespace-pre-wrap leading-relaxed">
                {f.Notes as string}
              </p>
            </div>
          )}
        </div>

        {/* Actions sidebar */}
        <div>
          <LeadActions
            leadId={record.id}
            currentStatus={(f.Status as string) ?? 'NEW'}
            currentNotes={(f.Notes as string) ?? ''}
            currentProbability={(f.Probability as number) ?? 0}
          />
        </div>
      </div>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-[#505050] mb-0.5">{label}</div>
      <div className="text-sm text-[#f0ede8]">{value}</div>
    </div>
  )
}

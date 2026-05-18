import type { Metadata } from 'next'
import { Anchor, AlertTriangle } from 'lucide-react'
import { bookings } from '@/lib/airtable'
import { SLABadge, StatusBadge, Badge } from '@/components/ui/badge'
import { fmtDate, fmt$ } from '@/lib/utils'
import { FlagBookingButton } from './flag-booking-button'
import type { SLAStatus } from '@/types'

export const metadata: Metadata = { title: 'Charter Board' }

export default async function CharterBoardPage() {
  const activeBookings = await bookings.getActive()

  const sorted = activeBookings.sort((a, b) => {
    const slaOrder: Record<string, number> = { BREACHED: 0, WARNING: 1, GREEN: 2 }
    const aSLA = slaOrder[(a.fields.SLA_Status as string) ?? 'GREEN'] ?? 2
    const bSLA = slaOrder[(b.fields.SLA_Status as string) ?? 'GREEN'] ?? 2
    return aSLA - bSLA
  })

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Anchor className="h-5 w-5 text-[#c9a96e]" />
            <h1 className="text-2xl font-light text-[#f0ede8] tracking-tight">Charter Board</h1>
          </div>
          <p className="text-sm text-[#505050]">
            {activeBookings.length} active booking{activeBookings.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {activeBookings.length === 0 ? (
        <div className="bg-[#141414] border border-[#252525] rounded-xl px-8 py-16 text-center">
          <p className="text-sm text-[#505050]">No active bookings.</p>
        </div>
      ) : (
        <div className="bg-[#141414] border border-[#252525] rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto_auto] gap-4 px-5 py-3 border-b border-[#1e1e1e] text-xs font-medium uppercase tracking-widest text-[#404040]">
            <span>Booking</span>
            <span className="text-right">Charter Date</span>
            <span className="text-right">Value</span>
            <span className="text-right">Status</span>
            <span className="text-right">SLA</span>
            <span />
          </div>

          {sorted.map((record) => {
            const f = record.fields
            const sla = (f.SLA_Status as SLAStatus) ?? 'GREEN'
            const flagged = f.Flagged as boolean | undefined

            return (
              <div
                key={record.id}
                className="grid grid-cols-[1fr_auto_auto_auto_auto_auto] gap-4 items-center px-5 py-3.5 border-b border-[#1a1a1a] last:border-0"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {flagged && (
                      <AlertTriangle className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />
                    )}
                    <span className="text-sm font-medium text-[#f0ede8]">
                      {(f.Booking_Reference as string) ?? record.id.slice(-6).toUpperCase()}
                    </span>
                    {flagged && (
                      <Badge variant="red" className="text-xs">
                        FLAGGED
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-[#505050] mt-0.5">
                    {(f.Client_Name as string) ?? '—'} · {(f.Vessel as string) ?? '—'} ·{' '}
                    {(f.Destination as string) ?? '—'}
                  </div>
                  {f.Flag_Reason && (
                    <div className="text-xs text-red-400 mt-0.5">{f.Flag_Reason as string}</div>
                  )}
                </div>
                <span className="text-sm text-[#808080] text-right">
                  {fmtDate(f.Charter_Date as string)}
                </span>
                <span className="text-sm text-[#808080] text-right">
                  {fmt$(f.Total_Value as number)}
                </span>
                <div className="flex justify-end">
                  <StatusBadge status={(f.Status as string) ?? 'CONFIRMED'} />
                </div>
                <div className="flex justify-end">
                  <SLABadge status={sla} />
                </div>
                <FlagBookingButton bookingId={record.id} alreadyFlagged={!!flagged} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

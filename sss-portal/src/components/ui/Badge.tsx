import type { SLAStatus } from '@/types'
import { cn } from '@/lib/utils'

const SLA_STYLES: Record<SLAStatus, string> = {
  GREEN: 'bg-emerald-950 text-emerald-400 border-emerald-900',
  WARNING: 'bg-amber-950 text-amber-400 border-amber-900',
  BREACHED: 'bg-red-950 text-red-400 border-red-900',
}

const SLA_LABELS: Record<SLAStatus, string> = {
  GREEN: 'On Track',
  WARNING: 'Warning',
  BREACHED: 'Breached',
}

export function SLABadge({ status }: { status: SLAStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border',
        SLA_STYLES[status]
      )}
    >
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full',
          status === 'GREEN' && 'bg-emerald-400',
          status === 'WARNING' && 'bg-amber-400',
          status === 'BREACHED' && 'bg-red-400'
        )}
      />
      {SLA_LABELS[status]}
    </span>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toUpperCase()
  const isPositive = ['CLOSED_WON', 'COMPLETED', 'APPROVED', 'QUALIFIED'].includes(normalized)
  const isNegative = ['CLOSED_LOST', 'CANCELLED', 'REJECTED', 'BREACHED'].includes(normalized)
  const isWarning = ['WARNING', 'FLAGGED', 'PENDING', 'NURTURE'].includes(normalized)

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
        isPositive && 'bg-emerald-950 text-emerald-400 border-emerald-900',
        isNegative && 'bg-red-950 text-red-400 border-red-900',
        isWarning && 'bg-amber-950 text-amber-400 border-amber-900',
        !isPositive &&
          !isNegative &&
          !isWarning &&
          'bg-[#1c1c1c] text-[#808080] border-[#252525]'
      )}
    >
      {status.replace(/_/g, ' ')}
    </span>
  )
}

export function Chip({
  label,
  color = 'default',
}: {
  label: string
  color?: 'default' | 'gold' | 'red' | 'green'
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs border',
        color === 'gold' && 'bg-[#1a1408] text-[#c9a96e] border-[#3d2e12]',
        color === 'red' && 'bg-red-950 text-red-400 border-red-900',
        color === 'green' && 'bg-emerald-950 text-emerald-400 border-emerald-900',
        color === 'default' && 'bg-[#1c1c1c] text-[#808080] border-[#252525]'
      )}
    >
      {label}
    </span>
  )
}

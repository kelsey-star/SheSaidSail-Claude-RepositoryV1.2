import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { SLAStatus } from '@/types'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded border px-2 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[#1c1c1c] text-[#808080] border-[#252525]',
        gold: 'bg-[#1a1408] text-[#c9a96e] border-[#3d2e12]',
        green: 'bg-emerald-950 text-emerald-400 border-emerald-900',
        yellow: 'bg-amber-950 text-amber-400 border-amber-900',
        red: 'bg-red-950 text-red-400 border-red-900',
        blue: 'bg-blue-950 text-blue-400 border-blue-900',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

const SLA_CONFIG: Record<SLAStatus, { variant: BadgeProps['variant']; label: string }> = {
  GREEN: { variant: 'green', label: 'On Track' },
  WARNING: { variant: 'yellow', label: 'Warning' },
  BREACHED: { variant: 'red', label: 'Breached' },
}

function SLABadge({ status }: { status: SLAStatus }) {
  const { variant, label } = SLA_CONFIG[status]
  return (
    <Badge variant={variant}>
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          status === 'GREEN' && 'bg-emerald-400',
          status === 'WARNING' && 'bg-amber-400',
          status === 'BREACHED' && 'bg-red-400'
        )}
      />
      {label}
    </Badge>
  )
}

function StatusBadge({ status }: { status: string }) {
  const s = status.toUpperCase()
  const variant: BadgeProps['variant'] =
    ['CLOSED_WON', 'COMPLETED', 'APPROVED', 'QUALIFIED', 'AVAILABILITY_CONFIRMED'].includes(s)
      ? 'green'
      : ['CLOSED_LOST', 'CANCELLED', 'REJECTED', 'BREACHED'].includes(s)
        ? 'red'
        : ['WARNING', 'FLAGGED', 'PENDING', 'NURTURE', 'NEGOTIATING'].includes(s)
          ? 'yellow'
          : 'default'

  return <Badge variant={variant}>{status.replace(/_/g, ' ')}</Badge>
}

export { Badge, SLABadge, StatusBadge, badgeVariants }

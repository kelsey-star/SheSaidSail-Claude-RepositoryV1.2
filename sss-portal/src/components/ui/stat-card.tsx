import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  accent?: 'gold' | 'green' | 'red' | 'yellow' | 'default'
  className?: string
}

const ACCENT_DOT: Record<NonNullable<StatCardProps['accent']>, string> = {
  gold: 'bg-[#c9a96e]',
  green: 'bg-emerald-400',
  red: 'bg-red-400',
  yellow: 'bg-amber-400',
  default: 'bg-[#505050]',
}

const ACCENT_VALUE: Record<NonNullable<StatCardProps['accent']>, string> = {
  gold: 'text-[#c9a96e]',
  green: 'text-emerald-400',
  red: 'text-red-400',
  yellow: 'text-amber-400',
  default: 'text-[#f0ede8]',
}

export function StatCard({ label, value, sub, accent = 'default', className }: StatCardProps) {
  return (
    <div className={cn('bg-[#141414] border border-[#252525] rounded-xl p-5', className)}>
      <div className="flex items-center gap-2 mb-3">
        <div className={cn('h-1.5 w-1.5 rounded-full', ACCENT_DOT[accent])} />
        <span className="text-xs font-medium uppercase tracking-widest text-[#606060]">
          {label}
        </span>
      </div>
      <div className={cn('text-2xl font-light tracking-tight', ACCENT_VALUE[accent])}>{value}</div>
      {sub && <div className="mt-1 text-xs text-[#505050]">{sub}</div>}
    </div>
  )
}

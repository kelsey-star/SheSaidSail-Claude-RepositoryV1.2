import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SLABadge, Badge } from './badge'
import type { ActionItem, SLAStatus } from '@/types'

const SOURCE_LABELS: Record<ActionItem['source'], string> = {
  lead: 'Lead',
  booking: 'Booking',
  approval: 'Approval',
  issue: 'Issue',
  audit: 'Audit',
}

export function ActionItemRow({ item }: { item: ActionItem }) {
  return (
    <Link
      href={item.href}
      className="flex items-center gap-4 px-5 py-3.5 border-b border-[#1e1e1e] last:border-0 hover:bg-[#161616] transition-colors group"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-medium text-[#f0ede8] truncate">{item.title}</span>
          {item.badge && (
            <Badge variant="yellow" className="flex-shrink-0 text-xs">
              {item.badge}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-[#606060]">
          <Badge variant="default" className="text-xs">{SOURCE_LABELS[item.source]}</Badge>
          <span className="truncate">{item.subtitle}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <SLABadge status={item.sla as SLAStatus} />
        <ChevronRight className="h-4 w-4 text-[#303030] group-hover:text-[#606060] transition-colors" />
      </div>
    </Link>
  )
}

import type { Metadata } from 'next'
import { TrendingUp } from 'lucide-react'

export const metadata: Metadata = { title: 'Marketing' }

export default function MarketingPage() {
  return (
    <div className="p-8 max-w-[700px]">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="h-5 w-5 text-[#c9a96e]" />
          <h1 className="text-2xl font-light text-[#f0ede8] tracking-tight">Marketing</h1>
        </div>
        <p className="text-sm text-[#505050]">Marketing tools and analytics</p>
      </div>

      <div className="bg-[#141414] border border-[#252525] rounded-xl px-8 py-16 text-center">
        <div className="h-10 w-10 rounded-full bg-[#1c1c1c] border border-[#252525] flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="h-5 w-5 text-[#c9a96e]" />
        </div>
        <h3 className="text-base font-medium text-[#f0ede8] mb-1">Coming Soon</h3>
        <p className="text-sm text-[#505050]">
          Marketing analytics and campaign tools are under development.
        </p>
      </div>
    </div>
  )
}

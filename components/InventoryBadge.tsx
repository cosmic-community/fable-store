import type { InventoryState } from '@/types'

interface InventoryBadgeProps {
  state: InventoryState
  label: string
  compact?: boolean
}

const STYLES: Record<InventoryState, string> = {
  'in-stock': 'bg-emerald-50 text-emerald-700',
  'low-stock': 'bg-amber-50 text-amber-700',
  'out-of-stock': 'bg-rose-50 text-rose-700',
  backorder: 'bg-sky-50 text-sky-700',
}

const DOTS: Record<InventoryState, string> = {
  'in-stock': 'bg-emerald-500',
  'low-stock': 'bg-amber-500',
  'out-of-stock': 'bg-rose-500',
  backorder: 'bg-sky-500',
}

export default function InventoryBadge({ state, label, compact = false }: InventoryBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${STYLES[state]} ${
        compact ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${DOTS[state]}`} aria-hidden="true" />
      {label}
    </span>
  )
}
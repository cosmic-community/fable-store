import { formatPrice, toNumber } from '@/lib/utils'

interface PriceDisplayProps {
  price: unknown
  compareAt?: unknown
  size?: 'md' | 'lg'
}

export default function PriceDisplay({ price, compareAt, size = 'md' }: PriceDisplayProps) {
  const current = toNumber(price)
  if (current === null) return null

  const original = toNumber(compareAt)
  const onSale = original !== null && original > current
  const percentOff = onSale && original !== null ? Math.round(((original - current) / original) * 100) : 0

  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span
        className={`font-bold ${onSale ? 'text-rose-600' : 'text-ink'} ${
          size === 'lg' ? 'text-3xl' : 'text-lg'
        }`}
      >
        {formatPrice(current)}
      </span>
      {onSale && original !== null && (
        <>
          <span className={`text-gray-400 line-through ${size === 'lg' ? 'text-lg' : 'text-sm'}`}>
            <span className="sr-only">Original price </span>
            {formatPrice(original)}
          </span>
          {size === 'lg' && (
            <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-sm font-semibold text-rose-700">
              Save {percentOff}%
            </span>
          )}
        </>
      )}
    </div>
  )
}
import Link from 'next/link'
import type { Product } from '@/types'
import {
  getCategoryName,
  getInventory,
  getProductCategory,
  imgixUrl,
  toNumber,
} from '@/lib/utils'
import PriceDisplay from '@/components/PriceDisplay'
import InventoryBadge from '@/components/InventoryBadge'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const meta = product.metadata
  const image = imgixUrl(meta?.featured_image, 800, 1000)
  const category = getProductCategory(product)
  const inventory = getInventory(meta?.inventory_status)
  const price = toNumber(meta?.price)
  const compare = toNumber(meta?.compare_at_price)
  const onSale = price !== null && compare !== null && compare > price

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={product.title}
            width={400}
            height={500}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl" aria-hidden>
            🛍️
          </div>
        )}
        {onSale && (
          <span className="absolute left-3 top-3 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white">
            Sale
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {category && (
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">
            {getCategoryName(category)}
          </p>
        )}
        <h3 className="font-serif text-lg font-semibold leading-snug text-ink">{product.title}</h3>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
          <PriceDisplay price={meta?.price} compareAt={meta?.compare_at_price} />
          <InventoryBadge state={inventory.state} label={inventory.label} compact />
        </div>
      </div>
    </Link>
  )
}
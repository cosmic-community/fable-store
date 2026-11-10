import Link from 'next/link'
import type { Category } from '@/types'
import { getCategoryName } from '@/lib/utils'

interface CategoryFilterProps {
  categories: Category[]
  activeSlug?: string
}

export default function CategoryFilter({ categories, activeSlug }: CategoryFilterProps) {
  if (categories.length === 0) return null

  const base = 'rounded-full px-4 py-2 text-sm font-medium transition'
  const active = 'bg-brand text-white shadow'
  const inactive = 'bg-white text-gray-700 ring-1 ring-gray-200 hover:ring-brand hover:text-brand'

  return (
    <nav aria-label="Filter by category" className="mb-8 flex flex-wrap gap-2">
      <Link
        href="/shop"
        aria-current={!activeSlug ? 'page' : undefined}
        className={`${base} ${!activeSlug ? active : inactive}`}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/shop?category=${category.slug}`}
          aria-current={activeSlug === category.slug ? 'page' : undefined}
          className={`${base} ${activeSlug === category.slug ? active : inactive}`}
        >
          {getCategoryName(category)}
        </Link>
      ))}
    </nav>
  )
}
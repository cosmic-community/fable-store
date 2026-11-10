import Link from 'next/link'
import type { Category } from '@/types'
import { getCategoryName } from '@/lib/utils'

interface FooterProps {
  categories: Category[]
}

export default function Footer({ categories }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 bg-ink text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-serif text-2xl font-bold text-white">📖 Fable Store</p>
          <p className="mt-3 text-sm text-gray-400">
            Thoughtfully chosen goods with stories worth sharing.
          </p>
        </div>
        <nav aria-label="Footer shop links">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-white">Shop all</Link></li>
            <li><Link href="/reviews" className="hover:text-white">Customer reviews</Link></li>
          </ul>
        </nav>
        {categories.length > 0 && (
          <nav aria-label="Footer categories">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
              Categories
            </p>
            <ul className="space-y-2 text-sm">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/categories/${category.slug}`} className="hover:text-white">
                    {getCategoryName(category)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        © {year} Fable Store. All rights reserved.
      </div>
    </footer>
  )
}
import Link from 'next/link'
import type { Category } from '@/types'
import { getCategoryName } from '@/lib/utils'

interface HeaderProps {
  categories: Category[]
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/reviews', label: 'Reviews' },
]

export default function Header({ categories }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-serif text-2xl font-bold text-ink">
          <span aria-hidden>📖</span> Fable Store
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 transition hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-md border border-gray-300 px-3 py-2 text-sm font-medium">
            Menu
          </summary>
          <nav
            aria-label="Mobile"
            className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-lg"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2 text-sm hover:bg-brand-light"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>

      {categories.length > 0 && (
        <nav aria-label="Categories" className="border-t border-gray-100 bg-cream">
          <ul className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 py-2 text-sm sm:px-6 lg:px-8">
            {categories.map((category) => (
              <li key={category.id} className="shrink-0">
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-gray-600 transition hover:text-brand"
                >
                  {getCategoryName(category)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
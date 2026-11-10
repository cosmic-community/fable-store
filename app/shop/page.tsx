import type { Metadata } from 'next'
import { getCategories, getProducts } from '@/lib/cosmic'
import { getCategoryName, getProductCategory } from '@/lib/utils'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from '@/components/CategoryFilter'

export const metadata: Metadata = {
  title: 'Shop | Fable Store',
  description: 'Browse every product at Fable Store.',
}

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category: categorySlug } = await searchParams
  const [products, categories] = await Promise.all([getProducts(), getCategories()])

  const activeCategory = categories.find((category) => category.slug === categorySlug)
  const filtered = activeCategory
    ? products.filter((product) => getProductCategory(product)?.id === activeCategory.id)
    : products

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="font-serif text-4xl font-bold">
          {activeCategory ? getCategoryName(activeCategory) : 'Shop All'}
        </h1>
        <p className="mt-2 text-gray-600">
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
        </p>
      </header>

      <CategoryFilter categories={categories} activeSlug={activeCategory?.slug} />

      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center text-gray-500">
          No products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
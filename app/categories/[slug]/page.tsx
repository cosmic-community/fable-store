// app/categories/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getProductsByCategory } from '@/lib/cosmic'
import { getCategoryName, getMetafieldValue, imgixUrl } from '@/lib/utils'
import ProductCard from '@/components/ProductCard'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return { title: 'Category not found | Fable Store' }
  return {
    title: `${getCategoryName(category)} | Fable Store`,
    description: getMetafieldValue(category.metadata?.description).slice(0, 160),
    other: {
      'cosmic-context': JSON.stringify({ object_id: category.id, object_type: category.type }),
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) notFound()

  const products = await getProductsByCategory(category.id)
  const image = imgixUrl(category.metadata?.image, 1600, 600)
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-ink">
        {image && (
          <img
            src={image}
            alt=""
            width={800}
            height={300}
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
          />
        )}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-300">
            <Link href="/" className="hover:text-white">Home</Link> /{' '}
            <Link href="/shop" className="hover:text-white">Shop</Link>
          </nav>
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
            {getCategoryName(category)}
          </h1>
          {description && <p className="mt-4 max-w-2xl text-lg text-gray-200">{description}</p>}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="mb-6 text-gray-600">
          {products.length} {products.length === 1 ? 'product' : 'products'}
        </p>
        {products.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center text-gray-500">
            No products in this category yet.{' '}
            <Link href="/shop" className="text-brand underline">
              Browse the whole shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
// app/products/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductBySlug, getReviewsForProduct } from '@/lib/cosmic'
import {
  getCategoryName,
  getInventory,
  getMetafieldValue,
  getProductCategory,
  imgixUrl,
  parseRating,
  stripHtml,
} from '@/lib/utils'
import { normalizeVariants } from '@/lib/variants'
import ProductGallery from '@/components/ProductGallery'
import type { GalleryImage } from '@/components/ProductGallery'
import VariantSelector from '@/components/VariantSelector'
import PriceDisplay from '@/components/PriceDisplay'
import InventoryBadge from '@/components/InventoryBadge'
import StarRating from '@/components/StarRating'
import ReviewCard from '@/components/ReviewCard'
import RichText from '@/components/RichText'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Product not found | Fable Store' }
  return {
    title: `${product.title} | Fable Store`,
    description: stripHtml(getMetafieldValue(product.metadata?.description)).slice(0, 160),
    other: {
      'cosmic-context': JSON.stringify({ object_id: product.id, object_type: product.type }),
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const reviews = await getReviewsForProduct(product.id)
  const meta = product.metadata
  const category = getProductCategory(product)
  const inventory = getInventory(meta?.inventory_status)
  const groups = normalizeVariants(meta?.variants)
  const sku = getMetafieldValue(meta?.sku)
  const description = getMetafieldValue(meta?.description)

  const images: GalleryImage[] = []
  const featuredSrc = imgixUrl(meta?.featured_image, 1200, 1200)
  if (meta?.featured_image && featuredSrc) {
    images.push({
      src: featuredSrc,
      thumb: imgixUrl(meta.featured_image, 160, 160) ?? featuredSrc,
      alt: product.title,
    })
  }
  const gallery = Array.isArray(meta?.gallery) ? meta.gallery : []
  gallery.forEach((media, index) => {
    const src = imgixUrl(media, 1200, 1200)
    if (!src) return
    images.push({
      src,
      thumb: imgixUrl(media, 160, 160) ?? src,
      alt: `${product.title} view ${index + 2}`,
    })
  })

  const ratings = reviews.map((review) => parseRating(review.metadata?.rating)).filter((n) => n > 0)
  const average = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand">Home</Link> /{' '}
        <Link href="/shop" className="hover:text-brand">Shop</Link>
        {category && (
          <>
            {' '}/{' '}
            <Link href={`/categories/${category.slug}`} className="hover:text-brand">
              {getCategoryName(category)}
            </Link>
          </>
        )}{' '}
        / <span className="text-ink">{product.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={images} />

        <div>
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="text-sm font-semibold uppercase tracking-wide text-brand"
            >
              {getCategoryName(category)}
            </Link>
          )}
          <h1 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">{product.title}</h1>

          {ratings.length > 0 && (
            <a href="#reviews" className="mt-3 inline-flex items-center gap-2 text-sm text-gray-600">
              <StarRating rating={average} />
              <span>
                {average.toFixed(1)} ({ratings.length} {ratings.length === 1 ? 'review' : 'reviews'})
              </span>
            </a>
          )}

          <div className="mt-5">
            <PriceDisplay price={meta?.price} compareAt={meta?.compare_at_price} size="lg" />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <InventoryBadge state={inventory.state} label={inventory.label} />
            {sku && <span className="text-sm text-gray-500">SKU: {sku}</span>}
          </div>

          <div className="mt-8">
            <VariantSelector groups={groups} outOfStock={inventory.state === 'out-of-stock'} />
          </div>

          {description && (
            <div className="mt-10 border-t border-gray-200 pt-8">
              <h2 className="mb-3 font-serif text-xl font-semibold">About this product</h2>
              <RichText content={description} />
            </div>
          )}
        </div>
      </div>

      <section id="reviews" className="mt-16 scroll-mt-24 border-t border-gray-200 pt-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-2xl font-bold">Customer Reviews</h2>
          {ratings.length > 0 && (
            <div className="flex items-center gap-3">
              <StarRating rating={average} size="lg" />
              <span className="text-lg font-semibold">{average.toFixed(1)} out of 5</span>
            </div>
          )}
        </div>
        {reviews.length === 0 ? (
          <p className="rounded-2xl bg-white p-8 text-center text-gray-500">
            No reviews yet for this product.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
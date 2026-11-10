import Link from 'next/link'
import { getCategories, getProducts, getReviews } from '@/lib/cosmic'
import { getMetafieldValue, imgixUrl, stripHtml } from '@/lib/utils'
import ProductCard from '@/components/ProductCard'
import CategoryCard from '@/components/CategoryCard'
import ReviewCard from '@/components/ReviewCard'
import SectionHeading from '@/components/SectionHeading'

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getProducts(),
    getCategories(),
    getReviews(3),
  ])

  const featured = products.slice(0, 4)
  const heroProduct = products[0]
  const heroImage = imgixUrl(heroProduct?.metadata?.featured_image, 1000, 1200)
  const heroBlurb = heroProduct
    ? stripHtml(getMetafieldValue(heroProduct.metadata?.description)).slice(0, 110)
    : ''

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-light via-cream to-amber-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <p className="mb-4 inline-block rounded-full bg-white px-4 py-1 text-sm font-medium text-brand shadow-sm">
              ✨ New stories on the shelf
            </p>
            <h1 className="font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
              Find something worth telling a story about.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-gray-600">
              Fable Store curates well-made, thoughtfully chosen goods, each backed by honest
              reviews from real customers.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="rounded-full bg-brand px-7 py-3 font-semibold text-white shadow-md transition hover:bg-brand-dark"
              >
                Shop the collection
              </Link>
              <Link
                href="/reviews"
                className="rounded-full border border-gray-300 bg-white px-7 py-3 font-semibold text-ink transition hover:border-brand hover:text-brand"
              >
                Read reviews
              </Link>
            </div>
          </div>
          {heroProduct && heroImage && (
            <Link
              href={`/products/${heroProduct.slug}`}
              className="group relative mx-auto block w-full max-w-md"
            >
              <img
                src={heroImage}
                alt={heroProduct.title}
                width={500}
                height={600}
                className="aspect-[5/6] w-full rounded-3xl object-cover shadow-2xl transition duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute -bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur">
                <p className="font-serif text-lg font-semibold">{heroProduct.title}</p>
                {heroBlurb && <p className="line-clamp-1 text-sm text-gray-500">{heroBlurb}</p>}
              </div>
            </Link>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured"
          title="Featured Products"
          href="/shop"
          linkLabel="View all products"
        />
        {featured.length === 0 ? (
          <p className="text-gray-500">No products yet. Add some in your Cosmic dashboard.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {categories.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Browse" title="Shop by Category" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.slice(0, 6).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Kind words"
          title="Recent Reviews"
          href="/reviews"
          linkLabel="See all reviews"
        />
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} showProduct />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
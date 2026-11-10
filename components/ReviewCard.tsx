import Link from 'next/link'
import type { Review } from '@/types'
import { getMetafieldValue, getReviewProduct, isTruthy, parseRating } from '@/lib/utils'
import StarRating from '@/components/StarRating'

interface ReviewCardProps {
  review: Review
  showProduct?: boolean
}

export default function ReviewCard({ review, showProduct = false }: ReviewCardProps) {
  const meta = review.metadata
  const name = getMetafieldValue(meta?.reviewer_name) || 'Anonymous'
  const comment = getMetafieldValue(meta?.comment)
  const rating = parseRating(meta?.rating)
  const verified = isTruthy(meta?.verified_purchase)
  const product = showProduct ? getReviewProduct(review) : null

  return (
    <article className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <div className="flex items-center justify-between gap-2">
        <StarRating rating={rating} />
        {verified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <span aria-hidden>✓</span> Verified purchase
          </span>
        )}
      </div>
      {comment && <p className="mt-4 flex-1 text-gray-700">&ldquo;{comment}&rdquo;</p>}
      <footer className="mt-4 border-t border-gray-100 pt-4 text-sm">
        <p className="font-semibold text-ink">{name}</p>
        {product && (
          <p className="text-gray-500">
            on{' '}
            <Link href={`/products/${product.slug}`} className="text-brand hover:underline">
              {product.title}
            </Link>
          </p>
        )}
      </footer>
    </article>
  )
}
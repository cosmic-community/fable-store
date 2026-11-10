import type { Metadata } from 'next'
import { getReviews } from '@/lib/cosmic'
import { parseRating } from '@/lib/utils'
import ReviewCard from '@/components/ReviewCard'
import StarRating from '@/components/StarRating'

export const metadata: Metadata = {
  title: 'Customer Reviews | Fable Store',
  description: 'See what customers are saying about Fable Store products.',
}

export default async function ReviewsPage() {
  const reviews = await getReviews()
  const ratings = reviews.map((review) => parseRating(review.metadata?.rating)).filter((n) => n > 0)
  const average = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <h1 className="font-serif text-4xl font-bold">Customer Reviews</h1>
        <p className="mt-2 text-gray-600">Honest words from the people who shop with us.</p>
        {ratings.length > 0 && (
          <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 shadow-sm">
            <StarRating rating={average} size="lg" />
            <span className="text-lg font-semibold">{average.toFixed(1)}</span>
            <span className="text-sm text-gray-500">from {ratings.length} reviews</span>
          </div>
        )}
      </header>

      {reviews.length === 0 ? (
        <p className="rounded-2xl bg-white p-12 text-center text-gray-500">No reviews yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} showProduct />
          ))}
        </div>
      )}
    </div>
  )
}
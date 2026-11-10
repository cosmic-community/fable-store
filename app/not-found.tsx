import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-5xl" aria-hidden>📖</p>
      <h1 className="mt-4 font-serif text-4xl font-bold">This page wandered off</h1>
      <p className="mt-3 text-gray-600">
        We could not find the page you were looking for. Perhaps it belongs to another story.
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-block rounded-full bg-brand px-7 py-3 font-semibold text-white hover:bg-brand-dark"
      >
        Back to the shop
      </Link>
    </div>
  )
}
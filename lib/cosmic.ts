import { createBucketClient } from '@cosmicjs/sdk'
import { getCosmic } from '@/lib/cosmic-preview'
import { getDateValue } from '@/lib/utils'
import type { Category, Product, Review } from '@/types'

export { getMetafieldValue } from '@/lib/utils'

// Write-capable client (server-side only). Page reads use getCosmic() below.
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

const PROPS = ['id', 'slug', 'title', 'type', 'metadata', 'created_at', 'modified_at']

function sortNewest<T extends { created_at?: string | null; modified_at?: string | null }>(
  items: T[]
): T[] {
  return [...items].sort((a, b) => getDateValue(b) - getDateValue(a))
}

export async function getProducts(): Promise<Product[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects.find({ type: 'products' }).props(PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    return sortNewest((response.objects ?? []) as Product[])
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch products')
  }
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects
      .find({ type: 'products', 'metadata.category': categoryId })
      .props(PROPS)
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    return sortNewest((response.objects ?? []) as Product[])
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch category products')
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects.findOne({ type: 'products', slug }).props(PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    const product = response.object as Product | undefined
    return product ?? null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch product')
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects.find({ type: 'categories' }).props(PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    const categories = (response.objects ?? []) as Category[]
    return [...categories].sort((a, b) => a.title.localeCompare(b.title))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch categories')
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects.findOne({ type: 'categories', slug }).props(PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    const category = response.object as Category | undefined
    return category ?? null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch category')
  }
}

export async function getReviews(limit?: number): Promise<Review[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects.find({ type: 'reviews' }).props(PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    const reviews = sortNewest((response.objects ?? []) as Review[])
    return typeof limit === 'number' ? reviews.slice(0, limit) : reviews
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch reviews')
  }
}

export async function getReviewsForProduct(productId: string): Promise<Review[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects
      .find({ type: 'reviews', 'metadata.product': productId })
      .props(PROPS)
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    return sortNewest((response.objects ?? []) as Review[])
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch product reviews')
  }
}
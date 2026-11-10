import type { Category, CosmicMedia, InventoryState, Product, Review } from '@/types'

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export function getDateValue(item: {
  published_at?: string | null
  modified_at?: string | null
  created_at?: string | null
}): number {
  const raw = item.published_at || item.modified_at || item.created_at
  const time = raw ? Date.parse(raw) : NaN
  return Number.isNaN(time) ? 0 : time
}

export function toNumber(field: unknown): number | null {
  if (typeof field === 'number') return Number.isFinite(field) ? field : null
  const text = getMetafieldValue(field).replace(/[^0-9.\-]/g, '')
  if (!text) return null
  const value = parseFloat(text)
  return Number.isFinite(value) ? value : null
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

export function parseRating(field: unknown): number {
  const value = toNumber(field)
  if (value === null) return 0
  return Math.max(0, Math.min(5, value))
}

export function isTruthy(field: unknown): boolean {
  return ['true', 'yes', '1'].includes(getMetafieldValue(field).trim().toLowerCase())
}

export function imgixUrl(
  media: CosmicMedia | undefined | null,
  width: number,
  height?: number
): string | null {
  if (!media || !media.imgix_url) return null
  const size = height ? `w=${width}&h=${height}&fit=crop` : `w=${width}`
  return `${media.imgix_url}?${size}&auto=format,compress`
}

export function getInventory(raw: unknown): { state: InventoryState; label: string } {
  const label = getMetafieldValue(raw).trim()
  const lower = label.toLowerCase()
  if (lower.includes('out')) return { state: 'out-of-stock', label: label || 'Out of Stock' }
  if (lower.includes('low') || lower.includes('limited')) {
    return { state: 'low-stock', label: label || 'Low Stock' }
  }
  if (lower.includes('back') || lower.includes('pre')) {
    return { state: 'backorder', label: label || 'Backorder' }
  }
  return { state: 'in-stock', label: label || 'In Stock' }
}

export function getProductCategory(product: Product): Category | null {
  const category = product.metadata?.category
  return typeof category === 'object' && category !== null ? category : null
}

export function getReviewProduct(review: Review): Product | null {
  const product = review.metadata?.product
  return typeof product === 'object' && product !== null ? product : null
}

export function getCategoryName(category: Category): string {
  return getMetafieldValue(category.metadata?.name) || category.title
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}
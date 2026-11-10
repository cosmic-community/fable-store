export interface CosmicMedia {
  url: string
  imgix_url: string
  name?: string
}

export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  type: string
  created_at?: string
  modified_at?: string
  metadata: Record<string, unknown>
}

export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    name?: string
    description?: string
    image?: CosmicMedia
  }
}

export interface Product extends CosmicObject {
  type: 'products'
  metadata: {
    description?: string
    price?: number | string
    compare_at_price?: number | string
    sku?: string
    featured_image?: CosmicMedia
    gallery?: CosmicMedia[]
    inventory_status?: string | { key: string; value: string }
    variants?: unknown
    category?: Category | string
  }
}

export interface Review extends CosmicObject {
  type: 'reviews'
  metadata: {
    product?: Product | string
    reviewer_name?: string
    rating?: number | string
    comment?: string
    verified_purchase?: boolean | string
  }
}

export type InventoryState = 'in-stock' | 'low-stock' | 'out-of-stock' | 'backorder'
# Fable Store
![App Preview](https://imgix.cosmicjs.com/cc98bbc0-dcbc-11f1-83c6-9160013cbdca-autopilot-photo-1560769629-975ec94e6a86-1794283886963.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, responsive e-commerce storefront for **Fable Store**, powered by [Cosmic](https://www.cosmicjs.com) and built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- Home page with hero, featured products, category grid, and recent reviews
- Shop page listing all products, with category filtering
- Category pages listing the products in each category
- Product detail pages with:
  - featured image and gallery
  - price with compare-at sale display
  - SKU and inventory status badge
  - variant selector built from the JSON `variants` field
  - rich-text description
  - customer reviews with star ratings and verified purchase badges
- Reviews page with an overall rating summary
- Server-side data fetching, with Cosmic credentials never exposed to the browser
- Accessible, responsive layout with an emoji favicon and a dismissible "Built with Cosmic" badge

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6af29928dd6b09cd5e17949f&clone_repository=6af29a72dd6b09cd5e1794f4)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews.
>
> User instructions: An e-commerce store with products, categories, variants, and customer reviews"

### Code Generation Prompt

> Build a Next.js application for an online business called "Fable Store". The content is managed in Cosmic CMS with the following object types: categories, products, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A modern e-commerce storefront for Fable Store powered by Cosmic CMS. Pages: Home (hero, featured products, category grid, recent reviews), Shop/all products listing with category filtering, Category pages listing products in that category, Product detail pages (featured image + gallery, price with compare-at sale price display, SKU, inventory status badge, variants selector from JSON variants field, rich-text description, and customer reviews with star ratings and verified purchase badges), and a Reviews section. Clean, responsive, fast design with good typography and accessible navigation.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org) (App Router, Server Components)
- React 19 and TypeScript (strict)
- Tailwind CSS 3
- [Cosmic](https://www.cosmicjs.com/docs) headless CMS via `@cosmicjs/sdk`
- Bun for package management

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- A Cosmic bucket with `categories`, `products`, and `reviews` object types

### Installation

```bash
bun install
```

Set these environment variables (for example in `.env.local`, which is git-ignored):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Then run:

```bash
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch products with their connected category (depth 1)
const { objects } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch reviews for a product by its object id
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews', 'metadata.product': productId })
  .depth(1)
```

## Cosmic CMS Integration

- **Categories**: `name`, `description`, `image`
- **Products**: `description`, `price`, `compare_at_price`, `sku`, `featured_image`, `gallery`, `inventory_status`, `variants`, `category`
- **Reviews**: `product`, `reviewer_name`, `rating`, `comment`, `verified_purchase`

All reads go through `getCosmic()` so the dashboard live preview can show draft content, while public visitors only see published content.

## Deployment Options

- **Vercel**: import the repository and add `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` in Project Settings → Environment Variables.
- **Netlify**: use the Next.js runtime and set the same environment variables in Site settings.
<!-- README_END -->
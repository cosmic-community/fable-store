import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import { getCategories } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'Fable Store | Stories worth owning',
  description:
    'Fable Store is a modern online shop with thoughtfully curated products, categories, and honest customer reviews.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories()
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛍️</text></svg>"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
              <script defer src="https://insights.cosmicinsights.dev/script.js" data-project="6af29928dd6b09cd5e17949d"></script>
      </head>
      <body className="flex min-h-screen flex-col bg-cream font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-brand"
        >
          Skip to content
        </a>
        <Header categories={categories} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer categories={categories} />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}
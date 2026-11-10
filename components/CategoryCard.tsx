import Link from 'next/link'
import type { Category } from '@/types'
import { getCategoryName, getMetafieldValue, imgixUrl } from '@/lib/utils'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const image = imgixUrl(category.metadata?.image, 900, 600)
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative isolate flex aspect-[3/2] items-end overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-indigo-900"
    >
      {image && (
        <img
          src={image}
          alt=""
          width={450}
          height={300}
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="p-5 text-white">
        <h3 className="font-serif text-2xl font-semibold">{getCategoryName(category)}</h3>
        {description && <p className="mt-1 line-clamp-2 text-sm text-gray-200">{description}</p>}
      </div>
    </Link>
  )
}
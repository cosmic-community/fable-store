'use client'

import { useState } from 'react'

export interface GalleryImage {
  src: string
  thumb: string
  alt: string
}

interface ProductGalleryProps {
  images: GalleryImage[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const active = images[activeIndex]

  if (!active) {
    return (
      <div
        className="flex aspect-square items-center justify-center rounded-3xl bg-gray-100 text-6xl"
        aria-hidden
      >
        🛍️
      </div>
    )
  }

  return (
    <div>
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">
        <img
          src={active.src}
          alt={active.alt}
          width={600}
          height={600}
          className="aspect-square w-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <ul className="mt-4 grid grid-cols-5 gap-3" aria-label="Product images">
          {images.map((image, index) => (
            <li key={`${image.src}-${index}`}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1}`}
                aria-pressed={index === activeIndex}
                className={`block w-full overflow-hidden rounded-xl ring-2 transition ${
                  index === activeIndex ? 'ring-brand' : 'ring-transparent hover:ring-gray-300'
                }`}
              >
                <img
                  src={image.thumb}
                  alt=""
                  width={80}
                  height={80}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
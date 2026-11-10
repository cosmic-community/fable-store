interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md' | 'lg'
}

const SIZES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
}

export default function StarRating({ rating, size = 'md' }: StarRatingProps) {
  const filled = Math.round(rating)
  const dimension = SIZES[size]

  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`Rated ${rating.toFixed(1)} out of 5`}
    >
      {[0, 1, 2, 3, 4].map((index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className={`${dimension} ${index < filled ? 'text-amber-400' : 'text-gray-300'}`}
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </span>
  )
}
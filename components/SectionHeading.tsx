import Link from 'next/link'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  href?: string
  linkLabel?: string
}

export default function SectionHeading({ eyebrow, title, href, linkLabel }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">{eyebrow}</p>
        )}
        <h2 className="font-serif text-3xl font-bold text-ink">{title}</h2>
      </div>
      {href && linkLabel && (
        <Link href={href} className="shrink-0 text-sm font-semibold text-brand hover:underline">
          {linkLabel} →
        </Link>
      )}
    </div>
  )
}
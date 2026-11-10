'use client'

import { useState } from 'react'
import type { VariantGroup } from '@/lib/variants'

interface VariantSelectorProps {
  groups: VariantGroup[]
  outOfStock: boolean
}

export default function VariantSelector({ groups, outOfStock }: VariantSelectorProps) {
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    for (const group of groups) {
      const first = group.options[0]
      if (first) initial[group.name] = first
    }
    return initial
  })
  const [message, setMessage] = useState<string>('')

  const handleAdd = (): void => {
    const summary = Object.entries(selected)
      .map(([name, value]) => `${name}: ${value}`)
      .join(', ')
    setMessage(
      `Added to cart${summary ? ` (${summary})` : ''}. This is a demo storefront, so checkout is not connected yet.`
    )
  }

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <fieldset key={group.name}>
          <legend className="mb-2 text-sm font-semibold text-ink">
            {group.name}: <span className="font-normal text-gray-600">{selected[group.name]}</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {group.options.map((option) => {
              const isActive = selected[group.name] === option
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelected((prev) => ({ ...prev, [group.name]: option }))}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'border-brand bg-brand text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-brand'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </fieldset>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        disabled={outOfStock}
        className="w-full rounded-full bg-brand px-8 py-4 font-semibold text-white shadow-md transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {outOfStock ? 'Out of stock' : 'Add to cart'}
      </button>

      {message && (
        <p role="status" className="rounded-lg bg-brand-light p-3 text-sm text-brand-dark">
          {message}
        </p>
      )}
    </div>
  )
}
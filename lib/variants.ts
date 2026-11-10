export interface VariantGroup {
  name: string
  options: string[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function toLabel(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number') return String(value)
  if (isRecord(value)) {
    for (const key of ['name', 'label', 'title', 'value']) {
      const candidate = value[key]
      if (typeof candidate === 'string' || typeof candidate === 'number') {
        return String(candidate).trim()
      }
    }
  }
  return ''
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).replace(/[_-]/g, ' ')
}

function toOptions(list: unknown[]): string[] {
  return list.map(toLabel).filter((label) => label.length > 0)
}

const RESERVED_KEYS = ['price', 'sku', 'id', 'inventory', 'stock', 'quantity', 'image', 'status']

/**
 * Normalizes the flexible JSON "variants" field into selectable option groups.
 * Supports: [{name, options|values}], {Size: [...]}, ["S","M"], and flat records.
 */
export function normalizeVariants(raw: unknown): VariantGroup[] {
  let data: unknown = raw
  if (typeof raw === 'string') {
    try {
      data = JSON.parse(raw)
    } catch {
      return []
    }
  }

  const groups: VariantGroup[] = []

  if (Array.isArray(data)) {
    const hasGroupShape = data.some(
      (item) => isRecord(item) && (Array.isArray(item.options) || Array.isArray(item.values))
    )
    if (hasGroupShape) {
      for (const item of data) {
        if (!isRecord(item)) continue
        const list = Array.isArray(item.options)
          ? item.options
          : Array.isArray(item.values)
            ? item.values
            : []
        const options = toOptions(list)
        const name = toLabel(item.name ?? item.title ?? item.type) || 'Option'
        if (options.length > 0) groups.push({ name, options })
      }
      return groups
    }

    if (data.every((item) => typeof item === 'string' || typeof item === 'number')) {
      const options = toOptions(data)
      return options.length > 0 ? [{ name: 'Option', options }] : []
    }

    const records = data.filter(isRecord)
    const hasNames = records.length > 0 && records.every((r) => toLabel(r.name ?? r.title ?? r.label))
    if (hasNames) {
      const options = records.map((r) => toLabel(r.name ?? r.title ?? r.label))
      return [{ name: 'Option', options }]
    }

    const byKey = new Map<string, string[]>()
    for (const record of records) {
      for (const [key, value] of Object.entries(record)) {
        if (RESERVED_KEYS.includes(key.toLowerCase())) continue
        if (typeof value !== 'string' && typeof value !== 'number') continue
        const existing = byKey.get(key) ?? []
        const label = String(value)
        if (!existing.includes(label)) existing.push(label)
        byKey.set(key, existing)
      }
    }
    byKey.forEach((options, key) => {
      groups.push({ name: capitalize(key), options })
    })
    return groups
  }

  if (isRecord(data)) {
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        const options = toOptions(value)
        if (options.length > 0) groups.push({ name: capitalize(key), options })
      } else if (typeof value === 'string' && value.includes(',')) {
        const options = value.split(',').map((part) => part.trim()).filter(Boolean)
        if (options.length > 0) groups.push({ name: capitalize(key), options })
      }
    }
  }

  return groups
}
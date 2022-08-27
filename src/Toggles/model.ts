export type Toggles = {
  readonly topSites: boolean
  readonly bookmarks: boolean
  readonly indent: boolean
}

export const defaultToggles: Toggles = {
  bookmarks: true,
  topSites: true,
  indent: false,
}

const togglesValidators: Record<keyof Toggles, (v: unknown) => boolean> = {
  topSites: (v) => typeof v === 'boolean',
  bookmarks: (v) => typeof v === 'boolean',
  indent: (v) => typeof v === 'boolean',
}

export const isToggles = (value: unknown): value is Toggles => validateObject(value, togglesValidators)

const validateObject = <T>(value: unknown, validators: Record<string, (v: unknown) => boolean>): value is T => {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  return (
    Object.keys(validators).every((k) => Object.hasOwn(value, k)) &&
    Object.entries(value).every(([k, v]) => k in validators && validators[k](v))
  )
}

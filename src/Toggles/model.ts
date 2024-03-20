type PropertyValidator<T> = Record<keyof T, (prop: unknown) => boolean>

const validateObject = <T extends object>(o: unknown, validator: PropertyValidator<T>): o is T =>
  typeof o === 'object' &&
  o !== null &&
  // object has all keys of T
  Object.keys(validator).every((key) => Object.keys(o).includes(key)) &&
  // all properties of object are valid
  Object.entries(o).every(([key, prop]) => key in validator && validator[key as keyof T](prop))

export type Toggles = {
  readonly topSites: boolean
  readonly bookmarks: boolean
  readonly indent: boolean
}

const togglesValidator: PropertyValidator<Toggles> = {
  topSites: (prop) => typeof prop === 'boolean',
  bookmarks: (prop) => typeof prop === 'boolean',
  indent: (prop) => typeof prop === 'boolean',
}

export const isToggles = (o: unknown): o is Toggles => validateObject(o, togglesValidator)

export const defaultToggles: Toggles = {
  bookmarks: true,
  topSites: true,
  indent: false,
}

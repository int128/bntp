import { useEffect, useState } from 'react'

type LocalStorageSpec<T> = {
  key: string
  initialValue: T
  stringify: (value: T) => string
  parse: (stored: string) => T
}

export const useLocalStorage = <T>(spec: LocalStorageSpec<T>): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const value = localStorage.getItem(spec.key)
    if (value === null) {
      return spec.initialValue
    }
    try {
      return spec.parse(value)
    } catch (e) {
      console.warn(e)
      return spec.initialValue
    }
  })

  useEffect(
    () =>
      subscribeLocalStorage(spec.key, (newValue: string) => {
        let value
        try {
          value = spec.parse(newValue)
        } catch (e) {
          console.warn(e)
          value = spec.initialValue
        }
        setStoredValue(value)
      }),
    [setStoredValue, spec]
  )

  return [
    storedValue,
    (value: T) => {
      setStoredValue(value)
      localStorage.setItem(spec.key, spec.stringify(value))
    },
  ]
}

const subscribeLocalStorage = (key: string, handler: (newValue: string) => void): (() => void) => {
  const listener = (e: StorageEvent) => {
    if (e.storageArea === localStorage && e.key === key && e.newValue !== null) {
      handler(e.newValue)
    }
  }
  window.addEventListener('storage', listener)
  return () => window.removeEventListener('storage', listener)
}

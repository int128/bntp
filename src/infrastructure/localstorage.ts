import { useEffect, useState } from 'react'

type LocalStorageSpec<T> = {
  key: string,
  initialValue: T,
  stringify: (value: T) => string,
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

  useEffect(() => {
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.storageArea === localStorage && e.key === spec.key && e.newValue !== null) {
        let value
        try {
          value = spec.parse(e.newValue)
        } catch (e) {
          console.warn(e)
          value = spec.initialValue
        }
        setStoredValue(value)
      }
    }
    window.addEventListener('storage', handleStorageEvent)
    return () => window.removeEventListener('storage', handleStorageEvent)
  }, [setStoredValue, spec])

  return [
    storedValue,
    (value: T) => {
      setStoredValue(value)
      localStorage.setItem(spec.key, spec.stringify(value))
    },
  ]
}

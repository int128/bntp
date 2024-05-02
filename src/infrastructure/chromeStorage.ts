import { Chrome, ChromeContext, StorageAreaName } from './chrome'
import { Dispatch, useContext, useEffect, useState } from 'react'
import { useLocalStorageCache } from './localStorageCache'

export type Spec<T> = {
  areaName: StorageAreaName
  key: string
  initialValue: T
  isType: (value: unknown) => value is T
}

export const useChromeStorage = <T>(spec: Spec<T>): readonly [T, Dispatch<T>] => {
  const chrome = useContext(ChromeContext)
  const [storedValue, setStoredValue] = useState<T>(spec.initialValue)
  useEffect(
    () => {
      initialLoad(chrome, spec, setStoredValue)
      return subscribeChange(chrome, spec, setStoredValue)
    },
    // Don't set "spec" because it causes infinite loop.
    [spec.key, spec.areaName],
  )
  return [
    storedValue,
    (newValue: T) => {
      // Don't call setStoredValue() because Chrome will trigger an event
      chrome.storage[spec.areaName].set({ [spec.key]: newValue }).catch((e) => console.error(e))
    },
  ]
}

const initialLoad = <T>(chrome: Chrome, spec: Spec<T>, setStoredValue: Dispatch<T>) => {
  chrome.storage[spec.areaName]
    .get(spec.key)
    .then((items) => {
      if (!(spec.key in items)) {
        return
      }
      const value = items[spec.key]
      if (value === undefined) {
        setStoredValue(spec.initialValue)
        return
      }
      if (spec.isType(value)) {
        setStoredValue(value)
        return
      }
      console.warn(`unknown type of storage.${spec.areaName}.${spec.key}`, value)
    })
    .catch((e) => console.error(e))
}

const subscribeChange = <T>(chrome: Chrome, spec: Spec<T>, setStoredValue: Dispatch<T>) => {
  const area = chrome.storage[spec.areaName]
  const listener = (changes: { [key: string]: chrome.storage.StorageChange }) => {
    if (!(spec.key in changes)) {
      return
    }
    const newValue = changes[spec.key].newValue as unknown
    if (newValue === undefined) {
      setStoredValue(spec.initialValue)
      return
    }
    if (spec.isType(newValue)) {
      setStoredValue(newValue)
      return
    }
    console.warn(`unknown type of storage.${spec.areaName}.${spec.key}`, newValue)
  }
  area.onChanged.addListener(listener)
  return () => area.onChanged.removeListener(listener)
}

export const useChromeStorageWithCache = <T extends string>(spec: Spec<T>): [T, Dispatch<T>] => {
  const [cache, setCache] = useLocalStorageCache(spec)
  const [value, setValue] = useChromeStorage<T>({
    ...spec,
    initialValue: cache,
  })
  useEffect(() => {
    setCache(value)
  }, [setCache, value])
  return [value, setValue]
}

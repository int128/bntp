import { ChromeContext, StorageArea, StorageAreaName } from './chrome'
import { Dispatch, useContext, useEffect, useState } from 'react'
import { useLocalStorageCache } from './localStorageCache'

export type Spec<T> = {
  areaName: StorageAreaName
  key: string
  defaultValue: T
  isType: (value: unknown) => value is T
}

export const useChromeStorage = <T>(spec: Spec<T>, initialValue?: T): readonly [T, Dispatch<T>] => {
  const chrome = useContext(ChromeContext)
  const storageArea = chrome.storage[spec.areaName]
  const [storedValue, setStoredValue] = useState<T>(initialValue ?? spec.defaultValue)
  useEffect(
    () => {
      loadValue(storageArea, spec, setStoredValue).catch((e) => console.error(e))

      const listener = createStorageChangeListener(spec, setStoredValue)
      storageArea.onChanged.addListener(listener)
      return () => storageArea.onChanged.removeListener(listener)
    },
    // Don't set "spec" because it causes infinite loop.
    [spec.key, spec.areaName],
  )
  return [
    storedValue,
    (newValue: T) => {
      // Don't call setStoredValue() because Chrome will trigger an event
      saveValue(storageArea, spec, newValue).catch((e) => console.error(e))
    },
  ]
}

const loadValue = async <T>(storageArea: StorageArea, spec: Spec<T>, setStoredValue: Dispatch<T>) => {
  const items = await storageArea.get(spec.key)
  if (!(spec.key in items)) {
    return
  }
  const value = items[spec.key]
  if (value === undefined) {
    setStoredValue(spec.defaultValue)
    return
  }
  if (spec.isType(value)) {
    setStoredValue(value)
    return
  }
  console.warn(`unknown type of storage.${spec.areaName}.${spec.key}`, value)
}

const saveValue = async <T>(storageArea: StorageArea, spec: Spec<T>, newValue: T) => {
  await storageArea.set({ [spec.key]: newValue })
}

const createStorageChangeListener =
  <T>(spec: Spec<T>, setStoredValue: Dispatch<T>) =>
  (changes: { [key: string]: chrome.storage.StorageChange }) => {
    if (!(spec.key in changes)) {
      return
    }
    const newValue = changes[spec.key].newValue as unknown
    if (newValue === undefined) {
      setStoredValue(spec.defaultValue)
      return
    }
    if (spec.isType(newValue)) {
      setStoredValue(newValue)
      return
    }
    console.warn(`unknown type of storage.${spec.areaName}.${spec.key}`, newValue)
  }

export const useChromeStorageWithCache = <T extends string>(spec: Spec<T>): [T, Dispatch<T>] => {
  const [cacheValue, setCacheValue] = useLocalStorageCache(spec)
  const [value, setValue] = useChromeStorage<T>(spec, cacheValue)
  useEffect(() => {
    setCacheValue(value)
  }, [setCacheValue, value])
  return [value, setValue]
}

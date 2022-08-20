import { useEffect, useState } from 'react'

type Spec<T> = {
  areaName: chrome.storage.AreaName
  key: string
  initialValue: T
  assertType: (value: unknown) => asserts value is T
}

export const useChromeStorage = <T>(spec: Spec<T>): readonly [T, (newValue: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(spec.initialValue)
  useEffect(
    () => {
      initialLoad(spec, setStoredValue)
      return subscribeChange(spec, setStoredValue)
    },
    // Don't set "spec" because it causes infinite loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [spec.key, spec.areaName]
  )
  return [
    storedValue,
    (newValue: T) => {
      // Don't call setStoredValue() because Chrome will trigger an event
      chrome.storage[spec.areaName].set({ [spec.key]: newValue }).catch((e) => console.error(e))
    },
  ]
}

const initialLoad = <T>(spec: Spec<T>, setStoredValue: (newValue: T) => void) => {
  chrome.storage[spec.areaName]
    .get(spec.key)
    .then((items) => {
      if (!(spec.key in items)) {
        return
      }
      const value = items[spec.key] as unknown
      if (value === undefined) {
        setStoredValue(spec.initialValue)
        return
      }
      spec.assertType(value)
      setStoredValue(value)
    })
    .catch((e) => console.error(e))
}

const subscribeChange = <T>(spec: Spec<T>, setStoredValue: (newValue: T) => void) => {
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
    spec.assertType(newValue)
    setStoredValue(newValue)
  }
  area.onChanged.addListener(listener)
  return () => area.onChanged.removeListener(listener)
}

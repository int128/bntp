import { useEffect, useState } from 'react'

type Spec<T> = {
  areaName: chrome.storage.AreaName
  key: string
  initialValue: T
  assertType: (value: unknown) => asserts value is T
}

export const useChromeStorage = <T>(spec: Spec<T>): [T, (newValue: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(spec.initialValue)

  useEffect(() => {
    chrome.storage[spec.areaName].get(spec.key, (items) => {
      if (spec.key in items) {
        const value = items[spec.key] as unknown
        spec.assertType(value)
        setStoredValue(value)
      }
    })
    return subscribeChromeStorage(spec, setStoredValue)
  }, [spec])

  return [
    storedValue,
    (newValue: T) => {
      // no need to call setStoredValue() because Chrome will trigger an event
      chrome.storage[spec.areaName].set({ [spec.key]: newValue }, undefined)
    },
  ]
}

const subscribeChromeStorage = <T>(spec: Spec<T>, handler: (newValue: T) => void) => {
  const listener = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: chrome.storage.AreaName) => {
    if (areaName === spec.areaName && spec.key in changes) {
      const newValue = changes[spec.key].newValue as unknown
      if (newValue === undefined) {
        return
      }
      spec.assertType(newValue)
      handler(newValue)
    }
  }
  chrome.storage.onChanged.addListener(listener)
  return () => chrome.storage.onChanged.removeListener(listener)
}

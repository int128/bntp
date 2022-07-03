import { useEffect, useState } from 'react'

type Spec<T> = {
  areaName: chrome.storage.AreaName
  key: string
  initialValue: T
  assertType: (value: unknown) => asserts value is T
}

export const useChromeStorage = <T>(spec: Spec<T>): [T, (newValue: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(spec.initialValue)

  useEffect(
    () => {
      console.debug(`chrome.storage.${spec.areaName}.get(${spec.key})`)
      chrome.storage[spec.areaName].get(spec.key, (items) => {
        const value = items[spec.key] as unknown
        if (value === undefined) {
          return
        }
        spec.assertType(value)
        setStoredValue(value)
      })
      return subscribeChromeStorage(spec, setStoredValue)
    },
    // Don't set "spec" because it causes infinite loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [spec.key, spec.areaName]
  )

  return [
    storedValue,
    (newValue: T) => {
      console.debug(`chrome.storage.${spec.areaName}.set(${spec.key})`)
      // no need to call setStoredValue() because Chrome will trigger an event
      chrome.storage[spec.areaName].set({ [spec.key]: newValue }, undefined)
    },
  ]
}

const subscribeChromeStorage = <T>(spec: Spec<T>, handler: (newValue: T) => void) => {
  const listener = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: chrome.storage.AreaName) => {
    if (areaName === spec.areaName && spec.key in changes) {
      console.debug(`chrome.storage.${areaName}.onChanged(${spec.key})`)
      const newValue = changes[spec.key].newValue as unknown
      if (newValue === undefined) {
        handler(spec.initialValue)
        return
      }
      spec.assertType(newValue)
      handler(newValue)
    }
  }
  chrome.storage.onChanged.addListener(listener)
  return () => chrome.storage.onChanged.removeListener(listener)
}

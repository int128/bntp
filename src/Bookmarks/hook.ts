import { useEffect, useState } from 'react'
import { BookmarkFolder } from './model'
import { subscribeBookmarks } from './repository'

export const useBookmarkFolders = () => {
  const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolder[]>([])
  useEffect(() => {
    const subscription = subscribeBookmarks((bookmarkFolders) => setBookmarkFolders(bookmarkFolders))
    subscription.refresh()
    return () => subscription.unsubscribe()
  }, [])
  return bookmarkFolders
}

export const useLocalStorage = <T>(localStorageKey: string, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const value = localStorage.getItem(localStorageKey)
    if (value === null) {
      return initialValue
    }
    try {
      return JSON.parse(value) as T
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.storageArea === localStorage && e.key === localStorageKey && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue) as T)
        } catch {
          setStoredValue(initialValue)
        }
      }
    }
    window.addEventListener('storage', handleStorageEvent)
    return () => window.removeEventListener('storage', handleStorageEvent)
  }, [setStoredValue, localStorageKey, initialValue])

  return [
    storedValue,
    (value: T) => {
      setStoredValue(value)
      localStorage.setItem(localStorageKey, JSON.stringify(value))
    },
  ]
}

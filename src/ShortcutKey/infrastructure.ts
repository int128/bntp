import { useEffect } from 'react'

export const useGlobalKey = (handler: (key: string) => void) =>
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key) {
        handler(e.key)
      }
    }
    window.addEventListener('keypress', listener)
    return () => window.removeEventListener('keypress', listener)
  })

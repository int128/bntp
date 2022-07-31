import { useEffect } from 'react'

export const useGlobalKey = (handler: (key: string) => void) =>
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      // prevent handling a child event such as <input>
      if (e.target === document.body && e.key) {
        handler(e.key)
      }
    }
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  })

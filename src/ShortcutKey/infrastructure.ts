import { useEffect } from 'react'

export type GlobalKeyEvent = Pick<KeyboardEvent, 'key' | 'ctrlKey' | 'shiftKey' | 'altKey' | 'metaKey'>

export const useGlobalKey = (handler: (e: GlobalKeyEvent) => void) =>
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      // prevent handling a child event such as <input>
      if (e.target === document.body && e.key) {
        handler(e)
      }
    }
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  })

import { useEffect, useState } from 'react'

export const useOnLine = (): readonly [boolean] => {
  const [onLine, setOnLine] = useState(navigator.onLine)
  useEffect(() => {
    const listener = () => setOnLine(navigator.onLine)
    window.addEventListener('online', listener)
    window.addEventListener('offline', listener)
    return () => {
      window.removeEventListener('online', listener)
      window.removeEventListener('offline', listener)
    }
  }, [])
  return [onLine]
}

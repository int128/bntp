import { FC, useEffect, useState } from 'react'

import './component.css'

export const Themes: FC = () => {
  const THEMES = ['light', 'dark', 'solarized-light', 'solarized-dark']

  const [selectedTheme, setSelectedTheme] = useLocalStorage('SelectedTheme', THEMES[0])
  useEffect(() => {
    document.documentElement.className = `Theme__${selectedTheme}`
  })

  return (
    <div>
      {THEMES.map((theme) => (
        <label key={theme}>
          <input
            type="radio"
            name="Theme"
            value={theme}
            checked={theme === selectedTheme}
            onChange={() => setSelectedTheme(theme)}
          />
          {theme}
        </label>
      ))}
    </div>
  )
}

function useLocalStorage(localStorageKey: string, initialValue: string): [string, (value: string) => void] {
  const [storedValue, setStoredValue] = useState<string>(() => {
    const value = localStorage.getItem(localStorageKey)
    if (value === null) {
      return initialValue
    }
    return value
  })

  useEffect(() => {
    function handleStorageEvent(e: StorageEvent) {
      if (e.storageArea === localStorage && e.key === localStorageKey && e.newValue !== null) {
        setStoredValue(e.newValue)
      }
    }
    window.addEventListener('storage', handleStorageEvent)
    return () => {
      window.removeEventListener('storage', handleStorageEvent)
    }
  }, [setStoredValue, localStorageKey])

  return [
    storedValue,
    (value: string) => {
      setStoredValue(value)
      localStorage.setItem(localStorageKey, value)
    },
  ]
}

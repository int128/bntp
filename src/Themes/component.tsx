import { FC, useEffect } from 'react'
import { useLocalStorage } from '../infrastructure/localstorage'

import './component.css'

export const Themes: FC = () => {
  const THEMES = ['light', 'dark', 'solarized-light', 'solarized-dark']

  const [selectedTheme, setSelectedTheme] = useLocalStorage<string>('SelectedTheme', THEMES[0])
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

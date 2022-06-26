import { FC, useEffect } from 'react'
import { useLocalStorage } from '../infrastructure/localstorage'

import './component.css'

const THEMES = ['light', 'dark', 'solarized-light', 'solarized-dark']

const ThemesComponent: FC = () => {
  const [selectedTheme, setSelectedTheme] = useSelectedTheme()
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

export default ThemesComponent

const useSelectedTheme = () =>
  useLocalStorage({
    key: 'v3.selectedTheme',
    initialValue: THEMES[0],
    parse: (value: string) => value,
    stringify: (stored: string) => stored,
  })

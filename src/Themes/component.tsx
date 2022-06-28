import { FC, useEffect } from 'react'

import './component.css'
import { useSelectedTheme } from './repository'

const THEMES = ['light', 'dark', 'solarized-light', 'solarized-dark']

const ThemesComponent: FC = () => {
  const [selectedTheme, setSelectedTheme] = useSelectedTheme(THEMES[0])
  useEffect(() => {
    document.documentElement.className = `Theme__${selectedTheme}`
  }, [selectedTheme])

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

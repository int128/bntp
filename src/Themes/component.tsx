import './component.css'
import { FC, useEffect } from 'react'
import { useSelectedTheme } from './repository'

const THEMES = ['light', 'dark', 'solarized-light', 'solarized-dark']

const preferTheme = () => {
  const preferDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  return preferDark ? 'dark' : 'light'
}

const ThemesComponent: FC = () => {
  // set the initial value to avoid screen flicker
  const [selectedTheme, setSelectedTheme] = useSelectedTheme(preferTheme())
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

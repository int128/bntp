import './component.css'
import { FC, useEffect } from 'react'
import { allColorSchemes, allThemes } from './model'
import { useColorScheme, useTheme } from './repository'

const ThemesComponent: FC = () => {
  const [theme, setTheme] = useTheme('standard')
  const [colorScheme, setColorScheme] = useColorScheme('auto')
  useEffect(() => {
    document.documentElement.className = `Theme__${theme} ColorScheme__${colorScheme}`
  }, [theme, colorScheme])

  return (
    <>
      <div>
        {allColorSchemes.map((key) => (
          <label key={key}>
            <input
              type="radio"
              name="colorScheme"
              value={key}
              checked={key === colorScheme}
              onChange={() => setColorScheme(key)}
            />
            {key}
          </label>
        ))}
      </div>
      <div>
        {allThemes.map((key) => (
          <label key={key}>
            <input type="radio" name="theme" value={key} checked={key === theme} onChange={() => setTheme(key)} />
            {key}
          </label>
        ))}
      </div>
    </>
  )
}

export default ThemesComponent

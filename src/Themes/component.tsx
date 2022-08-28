import './component.css'
import { allColorSchemes, allThemes } from './model'
import { useSelectedColorScheme, useSelectedTheme } from './hook'
import { FC } from 'react'

const ThemesComponent: FC = () => {
  const [selectedTheme, setSelectedTheme] = useSelectedTheme()
  const [selectedColorScheme, setSelectedColorScheme] = useSelectedColorScheme()
  return (
    <>
      <div>
        {allColorSchemes.map((colorScheme) => (
          <label key={colorScheme}>
            <input
              type="radio"
              name="selectedColorScheme"
              value={colorScheme}
              checked={colorScheme === selectedColorScheme}
              onChange={() => setSelectedColorScheme(colorScheme)}
            />
            {capitalize(colorScheme)}
          </label>
        ))}
      </div>
      <div>
        {allThemes.map((theme) => (
          <label key={theme}>
            <input
              type="radio"
              name="selectedTheme"
              value={theme}
              checked={theme === selectedTheme}
              onChange={() => setSelectedTheme(theme)}
            />
            {capitalize(theme)}
          </label>
        ))}
      </div>
    </>
  )
}

const capitalize = (s: string) => s.replace(/^\w/, (c) => c.toUpperCase())

export default ThemesComponent

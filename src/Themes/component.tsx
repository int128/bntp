import { allColorSchemes, allThemes } from './model'
import { useSelectedColorScheme, useSelectedTheme } from './repository'
import { FC } from 'react'
import { useThemeStyle } from './style'

const ThemesComponent: FC = () => {
  const [selectedTheme, setSelectedTheme] = useSelectedTheme()
  const [selectedColorScheme, setSelectedColorScheme] = useSelectedColorScheme()
  return (
    <>
      <form>
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
      </form>
      <form>
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
      </form>
    </>
  )
}

const capitalize = (s: string) => s.replace(/^\w/, (c) => c.toUpperCase())

export default ThemesComponent

export const SubscribeThemeComponent: FC = () => {
  const [selectedTheme] = useSelectedTheme()
  const [selectedColorScheme] = useSelectedColorScheme()
  useThemeStyle(selectedTheme, selectedColorScheme)
  return null
}

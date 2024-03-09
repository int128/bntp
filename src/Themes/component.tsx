import './component.css'
import { allBookmarkFoldersAlignments, allColorSchemes, allThemes } from './model'
import { useBookmarkFoldersAlignment, useSelectedColorScheme, useSelectedTheme } from './hook'
import { FC } from 'react'

const ThemesComponent: FC = () => {
  const [selectedTheme, setSelectedTheme] = useSelectedTheme()
  const [selectedColorScheme, setSelectedColorScheme] = useSelectedColorScheme()
  const [selectedBookmarkFoldersAlignment, setSelectedBookmarkFoldersAlignment] = useBookmarkFoldersAlignment()
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
      <div>
        {allBookmarkFoldersAlignments.map((alignment) => (
          <label key={alignment}>
            <input
              type="radio"
              name="selectedBookmarkFolderAlignment"
              value={alignment}
              checked={alignment === selectedBookmarkFoldersAlignment}
              onChange={() => setSelectedBookmarkFoldersAlignment(alignment)}
            />
            {capitalize(alignment)}
          </label>
        ))}
      </div>
    </>
  )
}

const capitalize = (s: string) => s.replace(/^\w/, (c) => c.toUpperCase())

export default ThemesComponent

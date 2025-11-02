import { type ChromeStorageSpec, useChromeStorageWithCache } from '../infrastructure/chromeStorage'
import { type ColorScheme, isColorScheme, isTheme, type Theme } from './model'

export const selectedThemeSpec: ChromeStorageSpec<Theme> = {
  areaName: 'sync',
  key: 'v3.selectedTheme',
  defaultValue: 'standard',
  isType: isTheme,
}

export const useSelectedTheme = () => useChromeStorageWithCache(selectedThemeSpec)

export const selectedColorSchemeSpec: ChromeStorageSpec<ColorScheme> = {
  areaName: 'sync',
  key: 'v3.selectedColorScheme',
  defaultValue: 'auto',
  isType: isColorScheme,
}

export const useSelectedColorScheme = () => useChromeStorageWithCache(selectedColorSchemeSpec)

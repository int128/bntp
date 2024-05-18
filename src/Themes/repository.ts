import { ColorScheme, Theme, isColorScheme, isTheme } from './model'
import { Spec, useChromeStorageWithCache } from '../infrastructure/chromeStorage'

export const selectedThemeSpec: Spec<Theme> = {
  areaName: 'sync',
  key: 'v3.selectedTheme',
  defaultValue: 'standard',
  isType: isTheme,
}

export const useSelectedTheme = () => useChromeStorageWithCache(selectedThemeSpec)

export const selectedColorSchemeSpec: Spec<ColorScheme> = {
  areaName: 'sync',
  key: 'v3.selectedColorScheme',
  defaultValue: 'auto',
  isType: isColorScheme,
}

export const useSelectedColorScheme = () => useChromeStorageWithCache(selectedColorSchemeSpec)

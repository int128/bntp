import { ColorScheme, Theme, isColorScheme, isTheme } from './model'
import { useChromeStorage } from '../infrastructure/chromeStorage'

export const useSelectedTheme = (initialValue: Theme) =>
  useChromeStorage<Theme>({
    areaName: 'sync',
    key: 'v3.selectedTheme',
    initialValue,
    isType: isTheme,
  })

export const useSelectedColorScheme = (initialValue: ColorScheme) =>
  useChromeStorage<ColorScheme>({
    areaName: 'sync',
    key: 'v3.selectedColorScheme',
    initialValue,
    isType: isColorScheme,
  })

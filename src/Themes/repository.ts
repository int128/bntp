import { ColorScheme, Theme } from './model'
import { useChromeStorage } from '../infrastructure/chromeStorage'

export const useSelectedTheme = (initialValue: Theme) =>
  useChromeStorage<Theme>({
    areaName: 'sync',
    key: 'v3.selectedTheme',
    initialValue,
    assertType: (value: unknown) => {
      if (typeof value !== 'string') {
        throw new Error('value is not string')
      }
    },
  })

export const useSelectedColorScheme = (initialValue: ColorScheme) =>
  useChromeStorage<ColorScheme>({
    areaName: 'sync',
    key: 'v3.selectedColorScheme',
    initialValue,
    assertType: (value: unknown) => {
      if (typeof value !== 'string') {
        throw new Error('value is not string')
      }
    },
  })

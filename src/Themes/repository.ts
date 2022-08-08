import { ColorScheme, Theme } from './model'
import { useChromeStorage } from '../infrastructure/chromeStorage'

export const useTheme = (initialValue: Theme) =>
  useChromeStorage<Theme>({
    areaName: 'sync',
    key: 'v3.theme',
    initialValue,
    assertType: (value: unknown) => {
      if (typeof value !== 'string') {
        throw new Error('value is not string')
      }
    },
  })

export const useColorScheme = (initialValue: ColorScheme) =>
  useChromeStorage<ColorScheme>({
    areaName: 'sync',
    key: 'v3.colorScheme',
    initialValue,
    assertType: (value: unknown) => {
      if (typeof value !== 'string') {
        throw new Error('value is not string')
      }
    },
  })

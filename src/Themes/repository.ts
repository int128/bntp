import { useChromeStorage } from '../infrastructure/chromeStorage'

export const useSelectedTheme = (initialValue: string) =>
  useChromeStorage<string>({
    areaName: 'sync',
    key: 'v3.selectedTheme',
    initialValue,
    assertType: (value: unknown) => {
      if (typeof value !== 'string') {
        throw new Error('value is not string')
      }
    },
  })

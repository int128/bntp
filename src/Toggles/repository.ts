import { Toggles, defaultToggles } from './model'
import { useChromeStorage } from '../infrastructure/chromeStorage'

export const useToggles = () =>
  useChromeStorage<Toggles>({
    areaName: 'sync',
    key: 'v3.toggles',
    initialValue: defaultToggles,
    assertType: (value: unknown) => {
      if (typeof value !== 'object' || value === null) {
        throw new Error('value is not object')
      }
    },
  })

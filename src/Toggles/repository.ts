import { useLocalStorage } from '../infrastructure/localstorage'
import { defaultToggles, Toggles } from './model'

export const useToggles = () =>
  useLocalStorage<Toggles>({
    key: 'v3.toggles',
    initialValue: defaultToggles,
    parse: (stored: string): Toggles => {
      const p = JSON.parse(stored) as unknown
      if (typeof p === 'object') {
        return p as Toggles
      }
      throw new Error(`invalid JSON: ${stored}`)
    },
    stringify: (value: Toggles) => JSON.stringify(value),
  })

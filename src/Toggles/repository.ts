import { useLocalStorage } from '../infrastructure/localstorage'
import { defaultToggles, Toggles } from './model'

export const useToggles = () =>
  useLocalStorage<Toggles>({
    key: 'v3.toggles',
    initialValue: defaultToggles,
    parse: (stored: string) => JSON.parse(stored) as Toggles,
    stringify: (value: Toggles) => JSON.stringify(value),
  })

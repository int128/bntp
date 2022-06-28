import { useLocalStorage } from '../infrastructure/localstorage'

export const useSelectedTheme = (initialValue: string) =>
  useLocalStorage({
    key: 'v3.selectedTheme',
    initialValue,
    parse: (value: string) => value,
    stringify: (stored: string) => stored,
  })

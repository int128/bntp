import { LocalStorage } from './localStorage'

export const nullLocalStorage: LocalStorage = {
  setItem: () => {},
  getItem: () => null,
}

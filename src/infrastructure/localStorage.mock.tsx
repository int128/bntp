import { LocalStorage, LocalStorageContext } from './localStorage'
import { PropsWithChildren } from 'react'

const nullLocalStorage: LocalStorage = {
  setItem: () => {},
  getItem: () => null,
  removeItem: () => {},
}

export const NullLocalStorageProvider = (props: PropsWithChildren) => (
  <LocalStorageContext.Provider value={nullLocalStorage}>{props.children}</LocalStorageContext.Provider>
)

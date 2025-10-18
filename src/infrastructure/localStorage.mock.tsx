import type { PropsWithChildren } from 'react'
import { type LocalStorage, LocalStorageContext } from './localStorage'

const nullLocalStorage: LocalStorage = {
  setItem: () => {},
  getItem: () => null,
}

export const NullLocalStorageProvider = (props: PropsWithChildren) => (
  <LocalStorageContext.Provider value={nullLocalStorage}>{props.children}</LocalStorageContext.Provider>
)

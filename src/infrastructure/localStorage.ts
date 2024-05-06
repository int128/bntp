import { createContext } from 'react'

export type LocalStorage = Pick<Storage, 'setItem' | 'getItem'>

export const LocalStorageContext = createContext<LocalStorage>(window.localStorage)

import { Dispatch, useContext, useEffect, useState } from 'react'
import { LocalStorage, LocalStorageContext } from './localStorage'

type Spec<T extends string> = {
  key: string
  defaultValue: T
  isType: (value: unknown) => value is T
}

export const useLocalStorageCache = <T extends string>(spec: Spec<T>): [T, Dispatch<T>] => {
  const localStorage = useContext(LocalStorageContext)
  const [value, setValue] = useState<T>(getLocalStorageCacheOrDefaultValue(localStorage, spec))
  useEffect(() => {
    localStorage.setItem(spec.key, value)
  }, [spec.key, value])
  return [value, setValue]
}

export const getLocalStorageCacheOrDefaultValue = <T extends string>(localStorage: LocalStorage, spec: Spec<T>): T => {
  const cachedValue = localStorage.getItem(spec.key)
  if (spec.isType(cachedValue)) {
    return cachedValue
  }
  return spec.defaultValue
}

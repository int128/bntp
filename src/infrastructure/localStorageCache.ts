import { Dispatch, useEffect, useState } from 'react'

type Spec<T extends string> = {
  key: string
  defaultValue: T
  isType: (value: unknown) => value is T
}

export const useLocalStorageCache = <T extends string>(spec: Spec<T>): [T, Dispatch<T>] => {
  const [value, setValue] = useState<T>(getCacheOrDefaultValue(spec))
  useEffect(() => {
    localStorage.setItem(spec.key, value)
  }, [spec.key, value])
  return [value, setValue]
}

export const getCacheOrDefaultValue = <T extends string>(spec: Spec<T>): T => {
  const cachedValue = localStorage.getItem(spec.key)
  if (spec.isType(cachedValue)) {
    return cachedValue
  }
  return spec.defaultValue
}

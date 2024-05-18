import './themes.css'
import { ColorScheme, Theme } from './model'
import { selectedColorSchemeSpec, selectedThemeSpec } from './repository'
import { LocalStorage } from '../infrastructure/localStorage'
import { getLocalStorageCacheOrDefaultValue } from '../infrastructure/localStorageCache'
import { useEffect } from 'react'

export const useThemeStyle = (theme: Theme, colorScheme: ColorScheme) => {
  useEffect(() => {
    document.documentElement.dataset['theme'] = theme
  }, [theme])
  useEffect(() => {
    document.documentElement.dataset['colorScheme'] = colorScheme
  }, [colorScheme])
}

export const preloadThemeStyleFromLocalStorageCache = (localStorage: LocalStorage) => {
  document.documentElement.dataset['theme'] = getLocalStorageCacheOrDefaultValue(localStorage, selectedThemeSpec)
  document.documentElement.dataset['colorScheme'] = getLocalStorageCacheOrDefaultValue(
    localStorage,
    selectedColorSchemeSpec,
  )
}

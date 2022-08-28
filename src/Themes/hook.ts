import { ColorScheme, Theme, isColorScheme, isTheme } from './model'
import { Dispatch, useEffect } from 'react'
import { Spec, getChromeStorageCache, useChromeStorageWithCache } from '../infrastructure/chromeStorage'

const selectedThemeSpec: Spec<Theme> = {
  areaName: 'sync',
  key: 'v3.selectedTheme',
  initialValue: 'standard',
  isType: isTheme,
}

export const useSelectedTheme = (): [Theme, Dispatch<Theme>] => {
  const [theme, setTheme] = useChromeStorageWithCache(selectedThemeSpec)
  useEffect(() => {
    document.documentElement.dataset['theme'] = theme
  }, [theme])
  return [theme, setTheme]
}

const selectedColorSchemeSpec: Spec<ColorScheme> = {
  areaName: 'sync',
  key: 'v3.selectedColorScheme',
  initialValue: 'auto',
  isType: isColorScheme,
}

export const useSelectedColorScheme = (): [ColorScheme, Dispatch<ColorScheme>] => {
  const [colorScheme, setColorScheme] = useChromeStorageWithCache(selectedColorSchemeSpec)
  useEffect(() => {
    document.documentElement.dataset['colorScheme'] = colorScheme
  }, [colorScheme])
  return [colorScheme, setColorScheme]
}

export const preloadFromCache = () => {
  document.documentElement.dataset['theme'] = getChromeStorageCache(selectedThemeSpec)
  document.documentElement.dataset['colorScheme'] = getChromeStorageCache(selectedColorSchemeSpec)
}

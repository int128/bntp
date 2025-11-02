import { type ChromeStorageSpec, useChromeStorage } from '../infrastructure/chromeStorage'
import { defaultToggles, isToggles, type Toggles } from './model'

const chromeStorageSpec: ChromeStorageSpec<Toggles> = {
  areaName: 'sync',
  key: 'v3.toggles',
  defaultValue: defaultToggles,
  isType: isToggles,
}

export const useToggles = () => useChromeStorage<Toggles>(chromeStorageSpec)

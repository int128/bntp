import { useChromeStorage } from '../infrastructure/chromeStorage'
import { defaultToggles, isToggles, type Toggles } from './model'

export const useToggles = () =>
  useChromeStorage<Toggles>({
    areaName: 'sync',
    key: 'v3.toggles',
    defaultValue: defaultToggles,
    isType: isToggles,
  })

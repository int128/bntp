import { Toggles, defaultToggles, isToggles } from './model'
import { useChromeStorage } from '../infrastructure/chromeStorage'

export const useToggles = () =>
  useChromeStorage<Toggles>({
    areaName: 'sync',
    key: 'v3.toggles',
    initialValue: defaultToggles,
    isType: isToggles,
  })

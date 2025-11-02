import { type ChromeStorageSpec, useChromeStorage } from '../infrastructure/chromeStorage'
import { ShortcutMap } from './model'

const chromeStorageSpec: ChromeStorageSpec<readonly [string, string][]> = {
  areaName: 'sync',
  key: 'v3.shortcutKeyMap',
  defaultValue: [],
  isType: (value): value is [string, string][] => Array.isArray(value),
}

export const useShortcutMap = (): readonly [ShortcutMap, (newMap: ShortcutMap) => void] => {
  const [entries, setEntries] = useChromeStorage<readonly [string, string][]>(chromeStorageSpec)
  return [new ShortcutMap(entries), (newMap: ShortcutMap) => setEntries(newMap.serialize())]
}

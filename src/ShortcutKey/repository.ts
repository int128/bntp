import { ShortcutMap } from './model'
import { useChromeStorage } from '../infrastructure/chromeStorage'

export const useShortcutMap = (): readonly [ShortcutMap, (newMap: ShortcutMap) => void] => {
  const [entries, setEntries] = useChromeStorage<readonly [string, string][]>({
    areaName: 'sync',
    key: 'v3.shortcutKeyMap',
    defaultValue: [],
    isType: (value): value is [string, string][] => Array.isArray(value),
  })
  return [new ShortcutMap(entries), (newMap: ShortcutMap) => setEntries(newMap.serialize())]
}

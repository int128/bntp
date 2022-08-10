import { ShortcutMap } from './model'
import { useChromeStorage } from '../infrastructure/chromeStorage'

export const useShortcutMap = (): readonly [ShortcutMap, (newMap: ShortcutMap) => void] => {
  const [entries, setEntries] = useChromeStorage<readonly [string, string][]>({
    areaName: 'sync',
    key: 'v3.shortcutKeyMap',
    initialValue: [],
    assertType: (value: unknown) => {
      if (!Array.isArray(value)) {
        throw new Error('value is not array')
      }
    },
  })
  return [new ShortcutMap(entries), (newMap: ShortcutMap) => setEntries(newMap.serialize())]
}

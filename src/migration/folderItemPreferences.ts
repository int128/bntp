import { ShortcutMap } from '../ShortcutKey/model'
import { parseLocalStorage } from './localStorage'

export const V2_KEY = 'FOLDER_ITEM_PREFERENCES'
export const V3_KEY = 'v3.shortcutKeyMap'

type FolderItemPreference = {
  readonly id: string
  readonly accessKey: string
}

const isFolderItemPreferences = (v: unknown): v is FolderItemPreference[] =>
  Array.isArray(v) && v.every((e) => typeof e === 'object' && 'id' in e && 'accessKey' in e)

export const upgrade = (folderItemPreferences: readonly FolderItemPreference[]): ShortcutMap => {
  const entries = folderItemPreferences.map<[string, string]>((folderItemPreference) => [
    folderItemPreference.accessKey,
    folderItemPreference.id,
  ])
  return new ShortcutMap(entries)
}

export const migrate = async () => {
  const folderItemPreferences = parseLocalStorage(V2_KEY, isFolderItemPreferences)
  if (folderItemPreferences === undefined) {
    return
  }
  const shortcutMap = upgrade(folderItemPreferences)
  await chrome.storage.sync['set']({ [V3_KEY]: shortcutMap.serialize() })
  localStorage.removeItem(V2_KEY)
}

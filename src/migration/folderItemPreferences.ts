import { JTDSchemaType } from 'ajv/dist/core'
import { ShortcutMap } from '../ShortcutKey/model'
import { parseLocalStorage } from './localStorage'

export const V2_KEY = 'FOLDER_ITEM_PREFERENCES'
export const V3_KEY = 'v3.shortcutKeyMap'

type FolderItemPreference = {
  id: string
  accessKey: string
}

const schema: JTDSchemaType<FolderItemPreference[]> = {
  elements: {
    properties: {
      id: { type: 'string' },
      accessKey: { type: 'string' },
    },
  },
}

export const upgrade = (folderItemPreferences: FolderItemPreference[]): ShortcutMap => {
  const entries = folderItemPreferences.map<[string, string]>((folderItemPreference) => [
    folderItemPreference.accessKey,
    folderItemPreference.id,
  ])
  return new ShortcutMap(entries)
}

export const migrate = async () => {
  const folderItemPreferences = parseLocalStorage(V2_KEY, schema)
  if (folderItemPreferences === undefined) {
    return
  }
  const shortcutMap = upgrade(folderItemPreferences)
  await chrome.storage.sync.set({ [V3_KEY]: shortcutMap.serialize() })
}

import { JTDSchemaType } from 'ajv/dist/core'
import { ShortcutMap } from '../ShortcutKey/model'
import { parseLocalStorage } from './localStorage'

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
  const folderItemPreferences = parseLocalStorage('FOLDER_ITEM_PREFERENCES', schema)
  if (folderItemPreferences === undefined) {
    return
  }
  const shortcutMap = upgrade(folderItemPreferences)
  await chrome.storage.sync.set({ 'v3.shortcutKeyMap': shortcutMap.serialize() })
}

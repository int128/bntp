import { FolderCollapse } from '../Bookmarks/model'
import { JTDSchemaType } from 'ajv/dist/core'
import { parseLocalStorage } from './localStorage'

export const V2_KEY = 'FOLDER_PREFERENCES'
export const V3_KEY = 'v3.collapsedBookmarkFolderIDs'

type FolderPreference = {
  id: string
  collapsed: boolean
}

const schema: JTDSchemaType<FolderPreference[]> = {
  elements: {
    properties: {
      id: { type: 'string' },
      collapsed: { type: 'boolean' },
    },
  },
}

export const upgrade = (folderPreferences: FolderPreference[]): FolderCollapse => {
  const collapsedIDs = folderPreferences
    .filter((folderPreference) => folderPreference.collapsed)
    .map((folderPreference) => folderPreference.id)
  return new FolderCollapse(collapsedIDs)
}

export const migrate = async () => {
  const folderPreferences = parseLocalStorage(V2_KEY, schema)
  if (folderPreferences === undefined) {
    return
  }
  const folderCollapse = upgrade(folderPreferences)
  await chrome.storage.sync.set({ [V3_KEY]: folderCollapse.serialize() })
}

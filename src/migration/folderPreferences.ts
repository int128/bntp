import { FolderCollapse } from '../Bookmarks/model'
import { JTDSchemaType } from 'ajv/dist/core'
import { parseLocalStorage } from './localStorage'

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
  const folderPreferences = parseLocalStorage('FOLDER_PREFERENCES', schema)
  if (folderPreferences === undefined) {
    return
  }
  const folderCollapse = upgrade(folderPreferences)
  await chrome.storage.sync.set({ 'v3.collapsedBookmarkFolderIDs': folderCollapse.serialize() })
}

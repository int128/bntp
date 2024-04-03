import { FolderCollapse } from '../Bookmarks/model'
import { parseLocalStorage } from './localStorage'

export const V2_KEY = 'FOLDER_PREFERENCES'
export const V3_KEY = 'v3.collapsedBookmarkFolderIDs'

type FolderPreference = {
  readonly id: string
  readonly collapsed: boolean
}

const isFolderPreferences = (v: unknown): v is FolderPreference[] =>
  Array.isArray(v) && v.every((e) => typeof e === 'object' && 'id' in e && 'collapsed' in e)

export const upgrade = (folderPreferences: readonly FolderPreference[]): FolderCollapse => {
  const collapsedIDs = folderPreferences
    .filter((folderPreference) => folderPreference.collapsed)
    .map((folderPreference) => folderPreference.id)
  return new FolderCollapse(collapsedIDs)
}

export const migrate = async () => {
  const folderPreferences = parseLocalStorage(V2_KEY, isFolderPreferences)
  if (folderPreferences === undefined) {
    return
  }
  const folderCollapse = upgrade(folderPreferences)
  await chrome.storage.sync['set']({ [V3_KEY]: folderCollapse.serialize() })
  localStorage.removeItem(V2_KEY)
}

import { FolderCollapse } from '../Bookmarks/model'
import { JTDSchemaType } from 'ajv/dist/core'
import { parseLocalStorage } from './localStorage'
import { useFolderCollapse } from '../Bookmarks/repository'

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

export const migrate = () => {
  const folderPreferences = parseLocalStorage('FOLDER_PREFERENCES', schema)
  if (folderPreferences === undefined) {
    return
  }
  const folderCollapse = upgrade(folderPreferences)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [, setFolderCollapse] = useFolderCollapse()
  setFolderCollapse(folderCollapse)
}

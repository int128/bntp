import * as folderItemPreferences from './folderItemPreferences'
import * as folderPreferences from './folderPreferences'

// Migrate preferences from v2 (Local Storage) to v3 (Chrome Storage)
export const migratePreferencesFromV2ToV3 = () => {
  if (window.localStorage.length === 0) {
    return
  }
  folderPreferences.migrate()
  folderItemPreferences.migrate()
  window.localStorage.clear()
}

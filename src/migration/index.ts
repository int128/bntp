import * as folderItemPreferences from './folderItemPreferences'
import * as folderPreferences from './folderPreferences'

// Migrate preferences from v2 (Local Storage) to v3 (Chrome Storage)
export const migratePreferencesFromV2ToV3 = async () => {
  await folderPreferences.migrate()
  await folderItemPreferences.migrate()
}

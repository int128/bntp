import { migratePreferencesFromV2ToV3 } from '.'

beforeEach(() => window.localStorage.clear())

test('localStorage is empty', () => {
  migratePreferencesFromV2ToV3()
})

test('empty FOLDER_PREFERENCES', () => {
  window.localStorage.setItem('FOLDER_PREFERENCES', '[]')
  migratePreferencesFromV2ToV3()
})

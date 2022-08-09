import { migratePreferencesFromV2ToV3 } from '.'

beforeEach(() => window.localStorage.clear())

test('localStorage is empty', async () => {
  await migratePreferencesFromV2ToV3()
})

test('empty FOLDER_PREFERENCES', async () => {
  window.localStorage.setItem('FOLDER_PREFERENCES', '[]')
  await migratePreferencesFromV2ToV3()
})

test('empty FOLDER_ITEM_PREFERENCES', async () => {
  window.localStorage.setItem('FOLDER_ITEM_PREFERENCES', '[]')
  await migratePreferencesFromV2ToV3()
})

import { migratePreferencesFromV2ToV3 } from '.'

beforeEach(() => window.localStorage.clear())

test('localStorage is empty', async () => {
  await migratePreferencesFromV2ToV3()
  expect(chrome.storage.sync['set']).not.toBeCalled()
})

import { upgrade } from './folderPreferences'

describe('upgrade FOLDER_PREFERENCES', () => {
  test('empty', () => {
    const folderCollapse = upgrade([])
    expect(folderCollapse.serialize()).toStrictEqual([])
  })

  test('single folder', () => {
    const FOLDER_PREFERENCES = [{ id: '36', collapsed: true }]
    const folderCollapse = upgrade(FOLDER_PREFERENCES)
    expect(folderCollapse.serialize()).toStrictEqual(['36'])
  })

  test('multiple folders', () => {
    const FOLDER_PREFERENCES = [
      { id: '36', collapsed: true },
      { id: '17', collapsed: true },
    ]
    const folderCollapse = upgrade(FOLDER_PREFERENCES)
    expect(folderCollapse.serialize()).toStrictEqual(['36', '17'])
  })

  test('multiple folders with expanded', () => {
    const FOLDER_PREFERENCES = [
      { id: '1', collapsed: true },
      { id: '2', collapsed: false },
      { id: '3', collapsed: true },
    ]
    const folderCollapse = upgrade(FOLDER_PREFERENCES)
    expect(folderCollapse.serialize()).toStrictEqual(['1', '3'])
  })
})

import { upgrade } from './folderItemPreferences'

describe('upgrade FOLDER_ITEM_PREFERENCES', () => {
  test('empty', () => {
    const shortcutMap = upgrade([])
    expect(shortcutMap.serialize()).toStrictEqual([])
  })

  test('single item', () => {
    const FOLDER_ITEM_PREFERENCES = [{ id: '5', accessKey: 'B' }]
    const shortcutMap = upgrade(FOLDER_ITEM_PREFERENCES)
    expect(shortcutMap.serialize()).toStrictEqual([['B', '5']])
  })

  test('multiple items', () => {
    const FOLDER_ITEM_PREFERENCES = [
      { id: '5', accessKey: 'B' },
      { id: '7', accessKey: '5' },
    ]
    const shortcutMap = upgrade(FOLDER_ITEM_PREFERENCES)
    expect(shortcutMap.serialize()).toStrictEqual([
      ['B', '5'],
      ['5', '7'],
    ])
  })
})

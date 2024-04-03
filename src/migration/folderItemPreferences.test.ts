import { V2_KEY, V3_KEY, migrate, upgrade } from './folderItemPreferences'

describe('upgrade', () => {
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

describe('migrate', () => {
  test('empty', async () => {
    window.localStorage.setItem(V2_KEY, '[]')
    await migrate()
    expect(chrome.storage.sync['set']).toBeCalledWith({ [V3_KEY]: [] })
  })

  test('exists', async () => {
    window.localStorage.setItem(V2_KEY, '[{"id":"3","accessKey":"a"}]')
    await migrate()
    expect(chrome.storage.sync['set']).toBeCalledWith({ [V3_KEY]: [['A', '3']] })
  })

  test('ignores an invalid json', async () => {
    window.localStorage.setItem(V2_KEY, `{"foo": "bar"}`)
    await migrate()
    expect(chrome.storage.sync['set']).not.toBeCalled()
  })
})

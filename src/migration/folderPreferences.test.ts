import { V2_KEY, V3_KEY, migrate, upgrade } from './folderPreferences'

describe('upgrade', () => {
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

describe('migrate', () => {
  test('empty', async () => {
    window.localStorage.setItem(V2_KEY, '[]')
    await migrate()
    expect(chrome.storage.sync['set']).toBeCalledWith({ [V3_KEY]: [] })
  })

  test('exists', async () => {
    window.localStorage.setItem(V2_KEY, `[{"id":"3","collapsed":true}]`)
    await migrate()
    expect(chrome.storage.sync['set']).toBeCalledWith({ [V3_KEY]: ['3'] })
  })

  test('ignores an invalid json', async () => {
    window.localStorage.setItem(V2_KEY, `{"foo": "bar"}`)
    await migrate()
    expect(chrome.storage.sync['set']).not.toBeCalled()
  })
})

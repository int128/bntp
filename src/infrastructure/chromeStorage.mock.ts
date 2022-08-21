/* eslint-disable @typescript-eslint/require-await */

type StorageAreaChange = { [key: string]: chrome.storage.StorageChange }

type StorageAreaChangedEventListener = (changes: StorageAreaChange) => void

class StorageAreaChangedEventMock
  implements Pick<chrome.storage.StorageAreaChangedEvent, 'addListener' | 'removeListener'>
{
  readonly listeners: StorageAreaChangedEventListener[] = []

  addListener(listener: StorageAreaChangedEventListener) {
    this.listeners.push(listener)
  }

  removeListener(listener: StorageAreaChangedEventListener) {
    const index = this.listeners.indexOf(listener)
    if (index > -1) {
      this.listeners.splice(index, 1)
    }
  }
}

export class StorageAreaMock implements Pick<chrome.storage.StorageArea, 'get' | 'set'> {
  readonly onChanged = new StorageAreaChangedEventMock()

  async get() {
    return {}
  }

  async set(items: { [key: string]: string }) {
    const changes: StorageAreaChange = Object.fromEntries(
      Object.entries(items).map(([key, newValue]) => [key, { newValue }])
    )
    for (const listener of this.onChanged.listeners) {
      listener(changes)
    }
  }
}

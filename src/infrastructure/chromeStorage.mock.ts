/* eslint-disable @typescript-eslint/require-await */

type StorageAreaChangedEventListener = (changes: { [key: string]: chrome.storage.StorageChange }) => void

class StorageAreaChangedEventMock
  implements Pick<chrome.storage.StorageAreaChangedEvent, 'addListener' | 'removeListener'>
{
  listeners: StorageAreaChangedEventListener[] = []

  addListener(listener: (changes: { [key: string]: chrome.storage.StorageChange }) => void) {
    this.listeners.push(listener)
  }

  removeListener(listener: (changes: { [key: string]: chrome.storage.StorageChange }) => void) {
    this.listeners = this.listeners.filter((l) => l !== listener)
  }
}

export class StorageAreaMock implements Pick<chrome.storage.StorageArea, 'get' | 'set'> {
  readonly onChanged = new StorageAreaChangedEventMock()

  async get() {
    return {}
  }

  async set(items: { [key: string]: string }) {
    for (const listener of this.onChanged.listeners) {
      const changes: { [key: string]: chrome.storage.StorageChange } = {}
      for (const key in items) {
        changes[key] = { newValue: items[key] }
      }
      listener(changes)
    }
  }
}

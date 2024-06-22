import { Chrome } from './infrastructure/chrome'
import { vi } from 'vitest'

const chrome: Chrome = {
  bookmarks: {
    getTree: vi.fn().mockResolvedValue([]),
    onChanged: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
    },
    onChildrenReordered: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
    },
    onCreated: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
    },
    onMoved: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
    },
    onRemoved: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
    },
  },
  topSites: {
    get: vi.fn().mockResolvedValue([]),
  },
  storage: {
    sync: {
      get: vi.fn().mockResolvedValue({}),
      set: vi.fn(),
      onChanged: {
        addListener: vi.fn(),
        removeListener: vi.fn(),
      },
    },
  },
  runtime: {
    id: 'bntp-test',
    getManifest: vi.fn(),
  },
}

Object.assign(global, { chrome })

// https://github.com/jsdom/jsdom/issues/3294
HTMLDialogElement.prototype.showModal = vi.fn()
HTMLDialogElement.prototype.close = vi.fn()

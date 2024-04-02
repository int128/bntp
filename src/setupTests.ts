// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { vi } from 'vitest'

const chrome = {
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
    getManifest: vi.fn(),
  },
}

Object.assign(global, { chrome })

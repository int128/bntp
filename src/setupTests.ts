// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

import { chrome } from 'jest-chrome'
import { vi } from 'vitest'

// https://github.com/extend-chrome/jest-chrome
Object.assign(global, { chrome })

// Workaround for jest-chrome
Object.assign(global, { jest: vi })

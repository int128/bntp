import { defaultToggles, isToggles } from './model'

describe('isToggles', () => {
  test('non-object is not Toggles', () => {
    expect(isToggles(1)).toBe(false)
  })
  test('empty object is not Toggles', () => {
    expect(isToggles({})).toBe(false)
  })
  test('defaultToggles is Toggles', () => {
    expect(isToggles(defaultToggles)).toBe(true)
  })
})

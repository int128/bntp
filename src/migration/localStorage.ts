export const parseLocalStorage = <T>(key: string, guard: (v: unknown) => v is T): T | undefined => {
  const json = window.localStorage.getItem(key)
  if (json === null) {
    return
  }
  let v
  try {
    v = JSON.parse(json) as unknown
  } catch (e) {
    console.warn(`invalid JSON of localStorage key ${key}`, e)
    return
  }
  if (!guard(v)) {
    console.warn(`invalid JSON of localStorage key ${key}`)
    return
  }
  return v
}

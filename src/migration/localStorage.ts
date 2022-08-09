export const parseLocalStorage = <T>(key: string, isT: (v: unknown) => v is T): T | undefined => {
  const json = window.localStorage.getItem(key)
  if (json === null) {
    return
  }
  let v
  try {
    v = JSON.parse(json) as unknown
  } catch (e) {
    console.warn(`invalid JSON string in localStorage key ${key}`, e)
    return
  }
  if (!isT(v)) {
    console.warn(`invalid JSON type in localStorage key ${key}`)
    return
  }
  return v
}

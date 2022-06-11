export type Manifest = chrome.runtime.Manifest & {
  id: string
}

export const getManifest = (): Manifest => {
  if (chrome.runtime === undefined) {
    return {
      id: 'id',
      name: 'BNTP: Bookmarks in New Tab Page',
      version: '1.0.0',
      manifest_version: 2,
    }
  }
  return {
    ...chrome.runtime.getManifest(),
    id: chrome.runtime.id,
  }
}

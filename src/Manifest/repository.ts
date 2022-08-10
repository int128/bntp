export type Manifest = chrome.runtime.Manifest & {
  readonly id: string
}

export const getManifest = (): Manifest => ({
  ...chrome.runtime.getManifest(),
  id: chrome.runtime.id,
})

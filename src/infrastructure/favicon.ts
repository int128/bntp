import { createContext } from 'react'

export type Favicon = {
  getImageUrl: (url: string) => string
}

// https://bugs.chromium.org/p/chromium/issues/detail?id=104102#c63
const chromeFavicon: Favicon = {
  getImageUrl: (url: string) => `/_favicon/?pageUrl=${encodeURIComponent(url)}&size=32`,
}

export const FaviconContext = createContext<Favicon>(chromeFavicon)

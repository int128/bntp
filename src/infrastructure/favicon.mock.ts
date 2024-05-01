import { Favicon } from './favicon'

export const googleFavicon: Favicon = {
  getImageUrl: (url: string) => `https://www.google.com/s2/favicons?domain=${encodeURIComponent(url)}&size=32`,
}

import { TopSite } from './model'

export const getTopSites = (callback: (topSites: TopSite[]) => void) => {
  if (chrome.topSites === undefined) {
    return
  }
  chrome.topSites.get(callback)
}

import { TopSite } from './model'

export const getTopSites = async (): Promise<TopSite[]> =>
  new Promise((resolve) => {
    if (chrome.topSites === undefined) {
      return
    }
    chrome.topSites.get((topSites) => resolve(topSites))
  })

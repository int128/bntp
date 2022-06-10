import { TopSite } from './model'

export const getTopSites = (callback: (topSites: TopSite[]) => void) => chrome.topSites.get(callback)

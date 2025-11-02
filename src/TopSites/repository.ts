import { useContext, useEffect, useState } from 'react'
import { ChromeContext } from '../infrastructure/chrome'
import type { TopSite } from './model'

export const useTopSites = () => {
  const [topSites, setTopSites] = useState<readonly TopSite[]>([])
  const chrome = useContext(ChromeContext)
  useEffect(() => {
    chrome.topSites
      .get()
      .then(setTopSites)
      .catch((e) => console.error(e))
  }, [chrome.topSites.get])
  return topSites
}

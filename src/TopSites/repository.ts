import { useEffect, useState } from 'react'
import { TopSite } from './model'

export const useTopSites = () => {
  const [topSites, setTopSites] = useState<TopSite[]>([])
  useEffect(() => {
    void getTopSites().then(setTopSites)
  }, [])
  return topSites
}

const getTopSites = async (): Promise<TopSite[]> =>
  new Promise((resolve) => {
    chrome.topSites.get((topSites) => resolve(topSites))
  })

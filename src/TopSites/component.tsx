import { FC, useEffect, useState } from 'react'

import './component.css'
import './componentTip.css'
import { TopSite } from './model'
import { getTopSites } from './repository'

const TopSitesComponent: FC = () => {
  const topSites = useTopSites()
  return (
    <div className="TopSites">
      {topSites.map((s, i) => (
        <TopSiteComponent key={i} topSite={s} />
      ))}
    </div>
  )
}

export default TopSitesComponent

type TopSiteComponentProps = {
  topSite: TopSite
}

const TopSiteComponent: FC<TopSiteComponentProps> = ({ topSite }) => {
  const favicon = `chrome://favicon/${topSite.url}`
  return (
    <div className="TopSite">
      <div className="FloatTip">
        <a href={topSite.url}>
          <div className="TopSite__Button">
            <div className="TopSite__ButtonBody" style={{ backgroundImage: `url(${favicon})` }}></div>
          </div>
        </a>
        <div className="FloatTip__Baloon">
          <div className="FloatTip__Body">{topSite.title}</div>
        </div>
      </div>
    </div>
  )
}

const useTopSites = () => {
  const [topSites, setTopSites] = useState<TopSite[]>([])
  useEffect(() => {
    getTopSites(setTopSites)
  }, [])
  return topSites
}

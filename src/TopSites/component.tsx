import { FC } from 'react'
import { TopSite } from './model'
import { useTopSites } from './repository'

import './component.css'
import './componentTip.css'

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

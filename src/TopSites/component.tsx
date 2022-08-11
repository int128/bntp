import './component.css'
import { TopSite, filterTopSites } from './model'
import { FC } from 'react'
import { faviconImage } from '../infrastructure/favicon'
import { useTopSites } from './repository'

type TopSiteComponentsProps = {
  searchText: string
}

const TopSitesComponent: FC<TopSiteComponentsProps> = ({ searchText }) => {
  const topSites = filterTopSites(useTopSites(), searchText)
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
  return (
    <div className="TopSite">
      <a href={topSite.url}>
        <div className="TopSiteButton">
          <img className="TopSiteButton__Icon" alt="" src={faviconImage(topSite.url)} />
        </div>
      </a>
      <div className="TopSiteTitle">{topSite.title}</div>
    </div>
  )
}

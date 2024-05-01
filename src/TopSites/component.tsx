import './component.css'
import { FC, useContext } from 'react'
import { TopSite, filterTopSites } from './model'
import { FaviconContext } from '../infrastructure/favicon'
import { useTopSites } from './repository'

type TopSiteComponentsProps = {
  search: string
}

const TopSitesComponent: FC<TopSiteComponentsProps> = ({ search }) => {
  const topSites = filterTopSites(useTopSites(), search)
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
  const favicon = useContext(FaviconContext)
  return (
    <div className="TopSite">
      <a href={topSite.url}>
        <div className="TopSiteButton">
          <img className="TopSiteButton__Icon" alt="" src={favicon.getImageUrl(topSite.url)} />
        </div>
      </a>
      <div className="TopSiteTitle">{topSite.title}</div>
    </div>
  )
}

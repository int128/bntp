import React, { useEffect, useState } from 'react';

import './TopSites.css';
import './Tip.css';
import { TopSite } from '../models';
import { getTopSites } from '../repositories/TopSites';

export function TopSites() {
  const topSites = useTopSites();
  return (
    <div className="TopSites">
      {topSites.map(TopSiteComponent)}
    </div>
  );
}

function TopSiteComponent(topSite: TopSite, index: number) {
  const favicon = `chrome://favicon/${topSite.url}`;
  return (
    <div className="TopSite" key={index}>
      <div className="FloatTip">
        <a href={topSite.url}>
          <div className="TopSite__Button">
            <div className="TopSite__ButtonBody" style={{backgroundImage: `url(${favicon})`}}>
            </div>
          </div>
        </a>
        <div className="FloatTip__Baloon">
          <div className="FloatTip__Body">
            {topSite.title}
          </div>
        </div>
      </div>
    </div>
  );
}

function useTopSites() {
  const [topSites, setTopSites] = useState<TopSite[]>([]);
  useEffect(() => {
    getTopSites(setTopSites);
  }, []);
  return topSites;
}

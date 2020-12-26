import React, { FC, useEffect, useState } from 'react';

import './TopSites.css';
import './Tip.css';
import { TopSite } from '../models';
import { getTopSites } from '../repositories/TopSites';

export const TopSites: FC = () => {
  const topSites = useTopSites();
  return (
    <div className="TopSites">
      {topSites.map((s, i) => <TopSiteComponent key={i} topSite={s} />)}
    </div>
  );
}

interface TopSiteComponentProps {
  topSite: TopSite
}

const TopSiteComponent: FC<TopSiteComponentProps> = ({ topSite }) => {
  const favicon = `chrome://favicon/${topSite.url}`;
  return (
    <div className="TopSite">
      <div className="FloatTip">
        <a href={topSite.url}>
          <div className="TopSite__Button">
            <div className="TopSite__ButtonBody" style={{ backgroundImage: `url(${favicon})` }}>
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

import React, { useEffect, useState } from 'react';

import './TopSites.css';
import './Tip.css';

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

interface TopSite {
  title: string;
  url: string;
}

function useTopSites() {
  const [topSites, setTopSites] = useState<TopSite[]>([]);
  useEffect(() => {
    chrome.topSites.get(results => {
      setTopSites(results);
    });
  }, []);
  return topSites;
}

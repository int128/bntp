import React, { useEffect, useState } from 'react';

import './TopSites.css';
import './Tip.css';

export function TopSites() {
  const topSites = useTopSites();
  return (
    <div className="TopSites">
      {topSites.map((topSite, i) => <TopSiteComponent key={i} topSite={topSite} />)}
    </div>
  );
}

function TopSiteComponent(props: {topSite: TopSite}) {
  const favicon = `chrome://favicon/${props.topSite.url}`;
  return (
    <div className="TopSiteItem">
      <div className="FloatTip">
        <a href={props.topSite.url}>
          <div className="TopSiteItem__Button">
            <div className="TopSiteItem__ButtonBody" style={{backgroundImage: `url(${favicon})`}}>
            </div>
          </div>
        </a>
        <div className="FloatTip__Baloon">
          <div className="FloatTip__Body">
            {props.topSite.title}
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

import React, { useEffect, useState } from 'react';

export function TopSites() {
  const topSites = useTopSites();
  return (
    <div className="TopSites">
      <ul>
        {topSites.map((e, i) => <li key={i}><a href={e.url}>{e.title}</a></li>)}
      </ul>
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

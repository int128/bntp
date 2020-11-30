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

function useTopSites() {
  const [topSites, setTopSites] = useState<chrome.topSites.MostVisitedURL[]>([]);
  useEffect(() => {
    chrome.topSites.get(results => {
      setTopSites(results);
    });
  }, []);
  return topSites;
}

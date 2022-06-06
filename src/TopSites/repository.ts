import { TopSite } from "./model";

export function getTopSites(callback: (topSites: TopSite[]) => void) {
  chrome.topSites.get(callback);
}

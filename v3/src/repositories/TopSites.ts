import { TopSite } from "../models";

export function getTopSites(callback: (topSites: TopSite[]) => void) {
  chrome.topSites.get(callback);
}

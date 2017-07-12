import ChromeApp from '../models/ChromeApp';

/**
 * Open the {@argument item} only if it is a special link.
 * Also open if the current page is in the popup.
 *
 * @param {Bookmark|ChromeApp|ChromePage|TopSite} item
 * @returns true if it has been actually opened, false otherwise
 */
export function openLinkIfSpecialLink(item) {
  if (item instanceof ChromeApp) {
    window.chrome.management.launchApp(item.id);
    return true;
  } else {
    const isInPopup = document.location.hash === '#popup';
    const isSpecialLink = item.url.match(/^(chrome|file|javascript):/);
    if (isInPopup || isSpecialLink) {
      window.chrome.tabs.create({url: item.url});
      return true;
    } else {
      return false;
    }
  }
}

/**
 * Always open the {@argument item}.
 * 
 * @param {Bookmark|ChromeApp|ChromePage|TopSite} item
 */
export function openLink(item) {
  if (openLinkIfSpecialLink(item) === false) {
    document.location.href = item.url;
  }
}

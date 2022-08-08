// TODO: official favicon API is not yet supported
// https://github.com/GoogleChrome/developer.chrome.com/issues/1541
// https://bugs.chromium.org/p/chromium/issues/detail?id=104102
export const faviconBackgroundImage = (url: string): string | undefined => {
  if (url.startsWith('https://') || url.startsWith('http://')) {
    return `url(https://www.google.com/s2/favicons?sz=32&domain_url=${url})`
  }
}

export const faviconImage = (url: string): string | undefined => {
  if (url.startsWith('https://') || url.startsWith('http://')) {
    return `https://www.google.com/s2/favicons?sz=32&domain_url=${url}`
  }
}

// https://bugs.chromium.org/p/chromium/issues/detail?id=104102#c63
export const faviconImage = (url: string) => `/_favicon/?pageUrl=${encodeURIComponent(url)}&size=32`

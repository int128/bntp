export type TopSite = {
  readonly title: string
  readonly url: string
}

export const filterTopSites = (topSites: readonly TopSite[], search: string): readonly TopSite[] => {
  if (!search) {
    return topSites
  }
  const searchLower = search.toLocaleLowerCase()
  return topSites.filter(
    (b) => b.title.toLocaleLowerCase().includes(searchLower) || b.url.toLocaleLowerCase().includes(searchLower),
  )
}

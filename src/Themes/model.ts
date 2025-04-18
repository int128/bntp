export const allColorSchemes = ['auto', 'light', 'dark'] as const
export type ColorScheme = (typeof allColorSchemes)[number]
export const isColorScheme = (value: unknown): value is ColorScheme =>
  allColorSchemes.some((colorScheme) => value === colorScheme)

export const allThemes = ['standard', 'solarized'] as const
export type Theme = (typeof allThemes)[number]
export const isTheme = (value: unknown): value is Theme => allThemes.some((theme) => value === theme)

export const allBookmarkFoldersAlignments = ['vertical', 'horizontal'] as const
export type BookmarkFoldersAlignment = (typeof allBookmarkFoldersAlignments)[number]
export const isBookmarkFoldersAlignment = (value: unknown): value is BookmarkFoldersAlignment =>
  allBookmarkFoldersAlignments.some((alignment) => value === alignment)

export const allColorSchemes = ['auto', 'light', 'dark'] as const
export type ColorScheme = typeof allColorSchemes[number]

export const allThemes = ['standard', 'solarized'] as const
export type Theme = typeof allThemes[number]

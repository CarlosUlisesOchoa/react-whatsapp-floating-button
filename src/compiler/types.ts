export type Theme = 'light' | 'dark' | 'system'

export type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

import { useState, useEffect } from 'react'
import { ThemeContext } from './themeContext'
import type { Theme } from '@/compiler/types'

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    // Optional: Set theme based on system preference initially
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    setTheme(preferredTheme)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.style.setProperty('--color', '#213547')
      root.style.setProperty('--background-color', '#ffffff')
      root.style.setProperty('--link-color', '#646cff')
      root.style.setProperty('--link-hover-color', '#747bff')
      root.style.setProperty('--button-background-color', '#f9f9f9')
    } else if (theme === 'dark') {
      root.style.setProperty('--color', 'rgba(255, 255, 255, 0.87)')
      root.style.setProperty('--background-color', '#242424')
      root.style.setProperty('--link-color', '#646cff')
      root.style.setProperty('--link-hover-color', '#535bf2')
      root.style.setProperty('--button-background-color', '#1a1a1a')
    }
  }, [theme])

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    // Optional: persist theme to localStorage
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

import { useContext } from 'react'
import { ThemeContext } from '@/context/themeContext'
import type { ThemeContextType } from '@/compiler/types'

const ThemeToggler: React.FC = () => {
  const { theme, setTheme } = useContext<ThemeContextType>(ThemeContext)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  )
}

export default ThemeToggler

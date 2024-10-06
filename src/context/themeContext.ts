import type { ThemeContextType } from '@/compiler/types'

import { createContext } from 'react'

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
})

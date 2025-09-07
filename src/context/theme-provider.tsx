import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

// Define all possible themes including modules
export type SystemTheme = 'dark' | 'light' | 'system'
export type ModuleTheme = 'module-auth' | 'module-lending' | 'module-property' | 'module-sacco' | 'module-chama'
export type Theme = SystemTheme | ModuleTheme
export type ResolvedTheme = Exclude<SystemTheme, 'system'> | ModuleTheme

const DEFAULT_THEME: Theme = 'system'
const THEME_COOKIE_NAME = 'vite-ui-theme'
const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  defaultTheme: Theme
  resolvedTheme: ResolvedTheme
  theme: Theme
  setTheme: (theme: Theme) => void
  resetTheme: () => void
}

const initialState: ThemeProviderState = {
  defaultTheme: DEFAULT_THEME,
  resolvedTheme: 'light',
  theme: DEFAULT_THEME,
  setTheme: () => null,
  resetTheme: () => null,
}

const ThemeContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  storageKey = THEME_COOKIE_NAME,
  ...props
}: ThemeProviderProps) {
  const [theme, _setTheme] = useState<Theme>(
    () => (getCookie(storageKey) as Theme) || defaultTheme
  )

  // Memoize the resolved theme calculation
  const resolvedTheme = useMemo((): ResolvedTheme => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    return theme
  }, [theme])

  useEffect(() => {
    const root = window.document.documentElement
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = (currentTheme: ResolvedTheme) => {
      // Remove all theme classes
      root.classList.remove('light', 'dark', 
        'module-auth', 'module-lending', 'module-property', 
        'module-sacco', 'module-chama'
      )
      
      // Add the new theme class
      root.classList.add(currentTheme)
      
      // Set data-theme attribute for CSS selectors
      root.setAttribute('data-theme', currentTheme)
    }

    const handleSystemChange = () => {
      if (theme === 'system') {
        const systemTheme = mediaQuery.matches ? 'dark' : 'light'
        applyTheme(systemTheme)
      }
    }

    applyTheme(resolvedTheme)

    // Listen for system theme changes
    mediaQuery.addEventListener('change', handleSystemChange)

    return () => mediaQuery.removeEventListener('change', handleSystemChange)
  }, [theme, resolvedTheme])

  const setTheme = (newTheme: Theme) => {
    setCookie(storageKey, newTheme, THEME_COOKIE_MAX_AGE)
    _setTheme(newTheme)
  }

  const resetTheme = () => {
    removeCookie(storageKey)
    _setTheme(DEFAULT_THEME)
  }

  const contextValue = {
    defaultTheme,
    resolvedTheme,
    resetTheme,
    theme,
    setTheme,
  }

  return (
    <ThemeContext.Provider value={contextValue} {...props}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
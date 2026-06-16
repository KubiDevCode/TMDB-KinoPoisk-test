import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AppRouter from './providers/routerProvider/ui/AppRouter'
import type { RootState } from './providers/storeProvider/model/store'

const THEME_KEY = 'tmdb:theme'

function App() {
  const isFetching = useSelector((state: RootState) => (
    Object.values(state.tmdbApi.queries).some((query) => query?.status === 'pending')
  ))
  const hasError = useSelector((state: RootState) => (
    Object.values(state.tmdbApi.queries).some((query) => query?.status === 'rejected')
  ))
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) ?? 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    const toggleTheme = () => setTheme((current) => current === 'light' ? 'dark' : 'light')
    window.addEventListener('tmdb:toggle-theme', toggleTheme)
    return () => window.removeEventListener('tmdb:toggle-theme', toggleTheme)
  }, [])

  return (
    <div className="app-shell">
      {isFetching && <div className="global-progress" aria-label="Loading" />}
      {hasError && <div className="global-error">TMDB request failed. Check your connection or access token.</div>}
      <AppRouter />
    </div>
  )
}

export default App

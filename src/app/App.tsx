import { useSelector } from 'react-redux'
import AppRouter from './providers/routerProvider/ui/AppRouter'
import type { RootState } from './providers/storeProvider/model/store'

function App() {
  const isFetching = useSelector((state: RootState) => (
    Object.values(state.tmdbApi.queries).some((query) => query?.status === 'pending')
  ))
  const hasError = useSelector((state: RootState) => (
    Object.values(state.tmdbApi.queries).some((query) => query?.status === 'rejected')
  ))

  return (
    <div className="app-shell">
      {isFetching && <div className="global-progress" aria-label="Loading" />}
      {hasError && <div className="global-error">TMDB request failed. Check your connection or access token.</div>}
      <AppRouter />
    </div>
  )
}

export default App

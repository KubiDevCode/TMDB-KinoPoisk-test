import { Header } from '../widgets/Header/ui/Header'
import { MoviesCategoriesWidget } from '../widgets/MoviesCategoriesWidget/MoviesCategoriesWidget'
import { Welcome } from '../widgets/Welcome/ui/Welcome'

function App() {

  return (
    <div>
      <Header />
      <Welcome />
      <MoviesCategoriesWidget />
    </div>
  )
}

export default App

import { MoviesGrid } from '../../../entities/movie'
import { useFavoritesFromStorage } from '../../../shared/hooks/useFavorites'
import { Footer } from '../../../widgets/Footer'
import { Header } from '../../../widgets/Header'
import s from './FavoritesPage.module.scss'

export const FavoritesPage = () => {
    const { favoriteMovies, handleToggleFavorite } = useFavoritesFromStorage()

    return (
        <div className={s.page}>
            <Header />
            <main className={s.content}>
                <section className={s.heading}>
                    <p className={s.kicker}>Saved collection</p>
                    <h1 className={s.title}>Favorite Movies</h1>
                    <p className={s.subtitle}>
                        {favoriteMovies.length
                            ? `${favoriteMovies.length} movies saved locally in this browser.`
                            : 'Movies you save will appear here.'}
                    </p>
                </section>

                <MoviesGrid
                    movies={favoriteMovies}
                    onToggleFavorite={handleToggleFavorite}
                    emptyText="No favorite movies yet"
                />
            </main>
            <Footer />
        </div>
    )
}

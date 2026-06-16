import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MoviesGrid } from '../../../entities/movie'
import { mapMovieCard } from '../../../entities/movie/model/mappers/mappers'
import { SearchMovieForm } from '../../../features/SearchMovieForm'
import { useSearchMoviesQuery } from '../../../shared/api/tmdbApi'
import { useFavoritesFromStorage } from '../../../shared/hooks/useFavorites'
import { Pagination } from '../../../shared/ui/Pagination/Pagination'
import { SkeletonGrid } from '../../../shared/ui/SkeletonGrid/SkeletonGrid'
import { Footer } from '../../../widgets/Footer'
import { Header } from '../../../widgets/Header'
import s from './SearchPage.module.scss'

export const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { favoriteMovies, handleToggleFavorite } = useFavoritesFromStorage()

    const query = searchParams.get('find')?.trim() ?? ''
    const pageFromUrl = Number(searchParams.get('page') ?? '1')
    const currentPage = Number.isNaN(pageFromUrl) || pageFromUrl < 1 ? 1 : pageFromUrl

    const { data, isLoading, isError, isFetching } = useSearchMoviesQuery(
        { query, page: currentPage },
        { skip: !query },
    )

    const movies = useMemo(() => {
        return data?.results.map((movie) => mapMovieCard(movie, favoriteMovies)) ?? []
    }, [data?.results, favoriteMovies])

    const totalPages = data?.total_pages ? Math.min(data.total_pages, 500) : 1

    const handlePageChange = (value: number) => {
        const nextParams = new URLSearchParams(searchParams)
        nextParams.set('page', String(value))
        setSearchParams(nextParams)

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <>
            <Header />

            <main className={s.page}>
                {isFetching && <div className={s.progress} />}

                <section className={s.hero}>
                    <div className={s.heroContent}>
                        <p className={s.kicker}>TMDB Search</p>
                        <h1 className={s.title}>Search Results</h1>
                        <p className={s.subtitle}>
                            Find movies by title and browse matching results with pagination.
                        </p>

                        <SearchMovieForm initialValue={query} />
                    </div>
                </section>

                {!query ? (
                    <div className={s.statusBox}>
                        <h2 className={s.statusTitle}>Start your search</h2>
                        <p className={s.statusText}>Enter a movie title to start searching.</p>
                    </div>
                ) : isLoading ? (
                    <SkeletonGrid count={12} />
                ) : isError ? (
                    <div className={s.statusBox}>
                        <h2 className={s.statusTitle}>Something went wrong</h2>
                        <p className={s.statusText}>Please try again later.</p>
                    </div>
                ) : movies.length === 0 ? (
                    <div className={s.statusBox}>
                        <h2 className={s.statusTitle}>No matches found</h2>
                        <p className={s.statusText}>No matches found for "{query}".</p>
                    </div>
                ) : (
                    <>
                        <section className={s.resultsHeader}>
                            <div>
                                <h2 className={s.resultsTitle}>Found movies</h2>
                                <p className={s.resultsInfo}>
                                    Query: <span>"{query}"</span>
                                </p>
                            </div>

                            <div className={s.counter}>
                                {data?.total_results ?? movies.length} results
                            </div>
                        </section>

                        <MoviesGrid
                            movies={movies}
                            onToggleFavorite={handleToggleFavorite}
                            className={s.moviesGrid}
                        />

                        {totalPages > 1 && (
                            <div className={s.pagination}>
                                <Pagination
                                    page={currentPage}
                                    count={totalPages}
                                    onChange={handlePageChange}
                                />
                            </div>
                        )}
                    </>
                )}
            </main>

            <Footer />
        </>
    )
}

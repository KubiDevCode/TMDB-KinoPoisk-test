import { useEffect, useMemo, useState, type ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MoviesGrid } from '../../../entities/movie'
import { mapMovieCard } from '../../../entities/movie/model/mappers/mappers'
import { Button } from '../../../shared/ui/Button/Button'
import { useDiscoverMoviesQuery, useGetGenresQuery } from '../../../shared/api/tmdbApi'
import { useFavoritesFromStorage } from '../../../shared/hooks/useFavorites'
import { Pagination } from '../../../shared/ui/Pagination/Pagination'
import { SkeletonGrid } from '../../../shared/ui/SkeletonGrid/SkeletonGrid'
import { Footer } from '../../../widgets/Footer'
import { Header } from '../../../widgets/Header'
import s from './FilteredMoviesPage.module.scss'

const sortOptions = [
    { value: 'popularity.desc', label: 'Most popular' },
    { value: 'popularity.asc', label: 'Least popular' },
    { value: 'vote_average.desc', label: 'Highest rated' },
    { value: 'vote_average.asc', label: 'Lowest rated' },
    { value: 'primary_release_date.desc', label: 'Newest releases' },
    { value: 'primary_release_date.asc', label: 'Oldest releases' },
    { value: 'title.asc', label: 'Title A-Z' },
    { value: 'title.desc', label: 'Title Z-A' },
]

const parsePositiveNumber = (value: string | null, fallback: number) => {
    const parsed = Number(value)

    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export const FilteredMoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { favoriteMovies, handleToggleFavorite } = useFavoritesFromStorage()

    const page = parsePositiveNumber(searchParams.get('page'), 1)
    const genres = searchParams.get('genres')
        ?.split(',')
        .map(Number)
        .filter((value) => Number.isFinite(value) && value > 0) ?? []
    const ratingGte = Math.min(Number(searchParams.get('ratingGte') ?? 0), 10)
    const ratingLte = Math.min(Number(searchParams.get('ratingLte') ?? 10), 10)
    const sortBy = searchParams.get('sort') || sortOptions[0].value
    const [ratingDraft, setRatingDraft] = useState({ gte: ratingGte, lte: ratingLte })

    const { data: genresData, isLoading: isGenresLoading } = useGetGenresQuery()
    const moviesQuery = useDiscoverMoviesQuery({
        page,
        sortBy,
        genres,
        voteAverageGte: ratingGte || undefined,
        voteAverageLte: ratingLte < 10 ? ratingLte : undefined,
    })

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            if (
                String(ratingDraft.gte) === searchParams.get('ratingGte')
                && String(ratingDraft.lte) === searchParams.get('ratingLte')
            ) {
                return
            }

            const nextParams = new URLSearchParams(searchParams)
            nextParams.set('ratingGte', String(ratingDraft.gte))
            nextParams.set('ratingLte', String(ratingDraft.lte))
            nextParams.set('page', '1')
            setSearchParams(nextParams)
        }, 200)

        return () => window.clearTimeout(timeout)
    }, [ratingDraft, searchParams, setSearchParams])

    const movies = useMemo(() => {
        return moviesQuery.data?.results.map((movie) => mapMovieCard(movie, favoriteMovies)) ?? []
    }, [favoriteMovies, moviesQuery.data?.results])

    const totalPages = moviesQuery.data?.total_pages
        ? Math.min(moviesQuery.data.total_pages, 500)
        : 1

    const updateParam = (key: string, value: string) => {
        const nextParams = new URLSearchParams(searchParams)

        if (value && value !== '0') {
            nextParams.set(key, value)
        } else {
            nextParams.delete(key)
        }

        nextParams.set('page', '1')
        setSearchParams(nextParams)
    }

    const handleSelectChange = (key: string) => (event: ChangeEvent<HTMLSelectElement>) => {
        updateParam(key, event.target.value)
    }

    const handleGenreToggle = (genreId: number) => {
        const nextGenres = genres.includes(genreId)
            ? genres.filter((id) => id !== genreId)
            : [...genres, genreId]

        updateParam('genres', nextGenres.join(','))
    }

    const handleRatingChange = (key: 'gte' | 'lte') => (event: ChangeEvent<HTMLInputElement>) => {
        setRatingDraft((current) => ({
            ...current,
            [key]: Number(event.target.value),
        }))
    }

    const handlePageChange = (value: number) => {
        const nextParams = new URLSearchParams(searchParams)
        nextParams.set('page', String(value))
        setSearchParams(nextParams)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleResetFilters = () => {
        setRatingDraft({ gte: 0, lte: 10 })
        setSearchParams({})
    }

    return (
        <>
            <Header />

            <main className={s.page}>
                <section className={s.heading}>
                    <p className={s.kicker}>Discover movies</p>
                    <h1 className={s.title}>Filtered Movies</h1>
                    <p className={s.subtitle}>
                        Combine TMDB genres, ratings and sorting to quickly narrow the catalog.
                    </p>
                </section>

                <section className={s.filters} aria-label="Movie filters">
                    <label className={s.field}>
                        <span>Sort by</span>
                        <select value={sortBy} onChange={handleSelectChange('sort')}>
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className={s.field}>
                        <span>Min rating: {ratingDraft.gte.toFixed(1)}</span>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.1"
                            value={ratingDraft.gte}
                            onChange={handleRatingChange('gte')}
                        />
                    </label>

                    <label className={s.field}>
                        <span>Max rating: {ratingDraft.lte.toFixed(1)}</span>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.1"
                            value={ratingDraft.lte}
                            onChange={handleRatingChange('lte')}
                        />
                    </label>

                    <Button
                        variant="outlined"
                        onClick={handleResetFilters}
                        className={s.resetButton}
                    >
                        Reset
                    </Button>
                </section>

                <section className={s.genres} aria-label="Genres">
                    {isGenresLoading ? 'Loading genres...' : genresData?.genres.map((genre) => (
                        <button
                            key={genre.id}
                            type="button"
                            className={`${s.genreButton} ${genres.includes(genre.id) ? s.genreActive : ''}`}
                            onClick={() => handleGenreToggle(genre.id)}
                        >
                            {genre.name}
                        </button>
                    ))}
                </section>

                {moviesQuery.isLoading ? (
                    <SkeletonGrid count={12} />
                ) : moviesQuery.isError ? (
                    <div className={s.status}>Something went wrong. Please try again later.</div>
                ) : (
                    <>
                        <div className={s.resultsBar}>
                            <span>{moviesQuery.data?.total_results ?? movies.length} results</span>
                            <span>Page {page}</span>
                        </div>

                        <MoviesGrid
                            movies={movies}
                            onToggleFavorite={handleToggleFavorite}
                            className={s.moviesGrid}
                        />

                        {totalPages > 1 && (
                            <div className={s.pagination}>
                                <Pagination
                                    page={page}
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

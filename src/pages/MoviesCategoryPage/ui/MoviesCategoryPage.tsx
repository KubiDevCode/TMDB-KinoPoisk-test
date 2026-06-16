import classNames from 'classnames'
import { useMemo } from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import { MoviesGrid } from '../../../entities/movie'
import { mapMovieCard } from '../../../entities/movie/model/mappers/mappers'
import type { MovieCategory } from '../../../entities/movie/model/types/movieTypes'
import { NavButtonBox } from '../../../features/NavButtonBox/ui/NavButtonBox'
import {
    useGetNowPlayingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery,
} from '../../../shared/api/tmdbApi'
import { useFavoritesFromStorage } from '../../../shared/hooks/useFavorites'
import { Pagination } from '../../../shared/ui/Pagination/Pagination'
import { SkeletonGrid } from '../../../shared/ui/SkeletonGrid/SkeletonGrid'
import { Footer } from '../../../widgets/Footer'
import { Header } from '../../../widgets/Header'
import { categoryPageList } from '../model/CategoryPageList'
import s from './MoviesCategoryPage.module.scss'

type MoviesCategoryPageProps = {
    className?: string
}

type CategoryRoute = Exclude<MovieCategory, 'favorites'>

const categoryTitleMap: Record<CategoryRoute, string> = {
    popular: 'Popular Movies',
    'top-rated': 'Top Rated Movies',
    upcoming: 'Upcoming Movies',
    'now-playing': 'Now Playing Movies',
}

const isCategoryRoute = (category: string | undefined): category is CategoryRoute => {
    return Boolean(category && category in categoryTitleMap)
}

export const MoviesCategoryPage = ({ className }: MoviesCategoryPageProps) => {
    const { category } = useParams<{ category: string }>()
    const [searchParams, setSearchParams] = useSearchParams()
    const { favoriteMovies, handleToggleFavorite } = useFavoritesFromStorage()
    const pageFromUrl = Number(searchParams.get('page') ?? '1')
    const page = Number.isNaN(pageFromUrl) || pageFromUrl < 1 ? 1 : pageFromUrl
    const safeCategory: CategoryRoute = isCategoryRoute(category) ? category : 'popular'

    const popularQuery = useGetPopularMoviesQuery(page, { skip: category !== 'popular' })
    const topRatedQuery = useGetTopRatedMoviesQuery(page, { skip: category !== 'top-rated' })
    const upcomingQuery = useGetUpcomingMoviesQuery(page, { skip: category !== 'upcoming' })
    const nowPlayingQuery = useGetNowPlayingMoviesQuery(page, { skip: category !== 'now-playing' })

    const queryMap = {
        popular: popularQuery,
        'top-rated': topRatedQuery,
        upcoming: upcomingQuery,
        'now-playing': nowPlayingQuery,
    }

    const currentQuery = queryMap[safeCategory]

    const movies = useMemo(() => {
        return currentQuery.data?.results.map((movie) => mapMovieCard(movie, favoriteMovies)) ?? []
    }, [currentQuery.data?.results, favoriteMovies])

    const totalPages = currentQuery.data?.total_pages
        ? Math.min(currentQuery.data.total_pages, 500)
        : 1

    const handlePageChange = (value: number) => {
        setSearchParams({ page: String(value) })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (!isCategoryRoute(category)) {
        return <Navigate to="/movies/popular" replace />
    }

    return (
        <div className={className}>
            <Header />
            <main className={classNames(s.page, 'container')}>
                <ul className={s.categoryList}>
                    {categoryPageList.map((item) => (
                        <NavButtonBox key={item.path} buttonItem={item} variant="light" />
                    ))}
                </ul>

                <div className={s.heading}>
                    <p className={s.kicker}>Movie categories</p>
                    <h1 className={s.title}>{categoryTitleMap[safeCategory]}</h1>
                </div>

                {currentQuery.isLoading ? (
                    <SkeletonGrid count={12} />
                ) : currentQuery.isError ? (
                    <div className={s.status}>Something went wrong. Please try again later.</div>
                ) : (
                    <>
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
        </div>
    )
}

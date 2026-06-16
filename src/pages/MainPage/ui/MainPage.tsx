import { useMemo } from 'react'
import { mapMovieCard, mapMovieSection } from '../../../entities/movie/model/mappers/mappers'
import type { MovieCardModel, MovieSectionModel } from '../../../entities/movie/model/types/movieTypes'
import {
    useGetNowPlayingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery,
} from '../../../shared/api/tmdbApi'
import { useFavoritesFromStorage } from '../../../shared/hooks/useFavorites'
import { Footer } from '../../../widgets/Footer'
import { Header } from '../../../widgets/Header'
import { MoviesCategoriesWidget } from '../../../widgets/MoviesCategoriesWidget'
import { Welcome } from '../../../widgets/Welcome'

const welcomeSeed = crypto.getRandomValues(new Uint32Array(1))[0]

export const MainPage = () => {
    const popularQuery = useGetPopularMoviesQuery(1)
    const topRatedQuery = useGetTopRatedMoviesQuery(1)
    const upcomingQuery = useGetUpcomingMoviesQuery(1)
    const nowPlayingQuery = useGetNowPlayingMoviesQuery(1)
    const { favoriteMovies, handleToggleFavorite } = useFavoritesFromStorage()

    const sections: MovieSectionModel[] = useMemo(() => {
        const result: MovieSectionModel[] = []

        if (popularQuery.data) {
            result.push(
                mapMovieSection(popularQuery.data, 'popular', 'Popular Movies', favoriteMovies),
            )
        }

        if (topRatedQuery.data) {
            result.push(
                mapMovieSection(topRatedQuery.data, 'top-rated', 'Top Rated Movies', favoriteMovies),
            )
        }

        if (upcomingQuery.data) {
            result.push(
                mapMovieSection(upcomingQuery.data, 'upcoming', 'Upcoming Movies', favoriteMovies),
            )
        }

        if (nowPlayingQuery.data) {
            result.push(
                mapMovieSection(nowPlayingQuery.data, 'now-playing', 'Now Playing Movies', favoriteMovies),
            )
        }

        return result
    }, [favoriteMovies, nowPlayingQuery.data, popularQuery.data, topRatedQuery.data, upcomingQuery.data])

    const highlightedMovie: MovieCardModel | null = useMemo(() => {
        const movies = popularQuery.data?.results ?? []

        if (!movies.length) {
            return null
        }

        const candidates = movies.filter((movie) => movie.backdrop_path)
        const highlighted = candidates[welcomeSeed % candidates.length] ?? movies[0]

        return highlighted ? mapMovieCard(highlighted) : null
    }, [popularQuery.data?.results])

    return (
        <>
            <Header />
            <Welcome highlightedMovie={highlightedMovie} />
            <MoviesCategoriesWidget
                sections={sections}
                onToggleFavorite={handleToggleFavorite}
            />
            <Footer />
        </>
    )
}

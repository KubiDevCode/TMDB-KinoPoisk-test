import type {
    MoviesListResponseDto,
    MovieSectionModel,
    MovieCategory,
    MovieDto,
    MovieCardModel,
} from '../types/movieTypes'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

type ImageSize = 'w300' | 'w500' | 'w780' | 'original'

export const getMovieImageUrl = (
    path: string | null,
    size: ImageSize = 'w500',
): string | null => {
    return path ? `${IMAGE_BASE_URL}/${size}${path}` : null
}

const getFavoriteIds = (favorites: MovieCardModel[] = []) => {
    return new Set(favorites.map((favorite) => favorite.id))
}

export const mapMovieCard = (
    movie: MovieDto,
    favorites: MovieCardModel[] = [],
): MovieCardModel => {
    const favoriteIds = getFavoriteIds(favorites)

    return {
        id: movie.id,
        title: movie.title,
        voteAverage: movie.vote_average,
        posterPath: getMovieImageUrl(movie.poster_path, 'w500'),
        backdropPath: getMovieImageUrl(movie.backdrop_path, 'original'),
        releaseYear: movie.release_date?.slice(0, 4) ?? '',
        overview: movie.overview,
        isFavorite: favoriteIds.has(movie.id),
    }
}

export const mapMovieSection = (
    section: MoviesListResponseDto,
    category: MovieCategory,
    title: string,
    favorites: MovieCardModel[] = [],
): MovieSectionModel => {
    return {
        category,
        title,
        movies: section.results.map((movie) => mapMovieCard(movie, favorites)),
    }
}

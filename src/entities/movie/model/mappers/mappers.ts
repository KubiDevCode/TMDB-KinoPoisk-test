import type {
    MoviesListResponseDto,
    MovieSectionModel,
    MovieCategory,
    MovieSectionTitle,
    MovieDto,
    MovieCardModel,
} from '../types/movieTypes'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export const mapMovieCard = (movie: MovieDto, favoriteIds?: number[]): MovieCardModel => {
    return {
        id: movie.id,
        title: movie.title,
        voteAverage: movie.vote_average,
        posterPath: movie.poster_path
            ? `${IMAGE_BASE_URL}${movie.poster_path}`
            : null,
        favorites: favoriteIds ? favoriteIds.includes(movie.id) : false,
    }
}

export const mapMovieSection = (
    section: MoviesListResponseDto,
    category: MovieCategory,
    title: MovieSectionTitle,
    favoriteIds: number[]
): MovieSectionModel => {
    return {
        category,
        title,
        movies: section.results.map((movie) => mapMovieCard(movie, favoriteIds)),
    }
}
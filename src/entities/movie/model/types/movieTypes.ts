export type GenreDto = {
    id: number
    name: string
}

export type BaseMovieDto = {
    id: number
    title: string
    original_title: string
    poster_path: string | null
    backdrop_path: string | null
    overview: string
    vote_average: number
    vote_count: number
    release_date?: string
}

export type MovieDto = BaseMovieDto & {
    genre_ids?: number[]
}

export type MovieDetailsDto = BaseMovieDto & {
    runtime?: number
    genres: GenreDto[]
}

export type MovieCreditDto = {
    id: number
    name: string
    character?: string
    job?: string
    profile_path: string | null
}

export type MovieCreditsDto = {
    id: number
    cast: MovieCreditDto[]
    crew: MovieCreditDto[]
}

export type GenresResponseDto = {
    genres: GenreDto[]
}

export type MoviesListResponseDto = {
    page: number
    results: MovieDto[]
    total_pages: number
    total_results: number
    dates?: {
        maximum: string
        minimum: string
    }
}

export type MovieCategory = 'popular' | 'top-rated' | 'upcoming' | 'now-playing' | 'favorites'

export type MovieCardModel = {
    id: number
    title: string
    voteAverage: number
    posterPath: string | null
    backdropPath: string | null
    releaseYear: string
    overview: string
    isFavorite: boolean
}

export type MovieSectionModel = {
    category: MovieCategory
    title: string
    movies: MovieCardModel[]
}

export type DiscoverMoviesParams = {
    page?: number
    sortBy?: string
    genres?: number[]
    voteAverageGte?: number
    voteAverageLte?: number
}

export type BaseMovieDto = {
    id: number
    title: string
    original_title: string
    poster_path: string | null
    backdrop_path: string | null
    overview: string
    vote_average: number
    vote_count: number
    release_date: string
}

export type MovieDto = BaseMovieDto & {
    genre_ids?: number[]
}

export type MovieDetailsDto = BaseMovieDto & {
    runtime: number
    genres: Array<{
        id: number
        name: string
    }>
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

export type MovieCategory = 'popular' | 'top-rated' | 'upcoming' | 'now-playing'

export type MovieSectionTitle =
    | 'Popular Movies'
    | 'Top Rated Movies'
    | 'Upcoming Movies'
    | 'Now Playing Movies'

export type MovieCardModel = {
    id: number
    title: string
    voteAverage: number
    posterPath: string | null
    favorites: boolean
}

export type MovieSectionModel = {
    category: MovieCategory
    title: MovieSectionTitle
    movies: MovieCardModel[]
}
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { MoviesListResponseDto} from '../../entities/movie/model/types/movieTypes'

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.themoviedb.org/3/',
        prepareHeaders: (headers) => {
            const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjMzZDU1NTY3NDFkYThmM2E1MzJhOTM0Y2RhNjJiNCIsIm5iZiI6MTc3NTc0Nzc4NS4xMDksInN1YiI6IjY5ZDdjMmM5MDkwNTczZGQ4OWQzYmJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B6YZqDKxOQ0r6oZPO1i1lVXGPPWyeog1GdJKAn3uekA"
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            headers.set('Accept', 'application/json')

            return headers
        },
    }),
    endpoints: (builder) => ({
        getPopularMovies: builder.query<MoviesListResponseDto, number | void>({
            query: (page = 1) => `movie/popular?language=en-en&page=${page}`,
        }),

        getTopRatedMovies: builder.query<MoviesListResponseDto, number | void>({
            query: (page = 1) => `movie/top_rated?language=en-en&page=${page}`,
        }),

        getUpcomingMovies: builder.query<MoviesListResponseDto, number | void>({
            query: (page = 1) => `movie/upcoming?language=en-en&page=${page}`,
        }),

        getNowPlayingMovies: builder.query<MoviesListResponseDto, number | void>({
            query: (page = 1) => `movie/now_playing?language=en-en&page=${page}`,
        }),

        searchMovies: builder.query<any, { query: string; page?: number }>({
            query: ({ query, page = 1 }) =>
                `search/movie?language=en-en&query=${encodeURIComponent(query)}&page=${page}`,
        }),

        getMovieDetails: builder.query<any, number | string>({
            query: (id) => `movie/${id}?language=en-en`,
        }),

        getMovieCredits: builder.query<any, number | string>({
            query: (id) => `movie/${id}/credits?language=en-en`,
        }),

        getSimilarMovies: builder.query<any, { id: number | string; page?: number }>({
            query: ({ id, page = 1 }) =>
                `movie/${id}/similar?language=en-en&page=${page}`,
        }),

        getGenres: builder.query<any, void>({
            query: () => `genre/movie/list?language=en-en`,
        }),

        discoverMovies: builder.query<
            any,
            {
                page?: number
                sortBy?: string
                genres?: number[]
                voteAverageGte?: number
                voteAverageLte?: number
            }>
            ({
                query: ({
                    page = 1,
                    sortBy = 'popularity.desc',
                    genres = [],
                    voteAverageGte,
                    voteAverageLte,
                }) => {
                    const params = new URLSearchParams()

                    params.set('language', 'en-en')
                    params.set('page', String(page))
                    params.set('sort_by', sortBy)

                    if (genres.length) {
                        params.set('with_genres', genres.join(','))
                    }

                    if (voteAverageGte !== undefined) {
                        params.set('vote_average.gte', String(voteAverageGte))
                    }

                    if (voteAverageLte !== undefined) {
                        params.set('vote_average.lte', String(voteAverageLte))
                    }

                    return `discover/movie?${params.toString()}`
                },
            }),
    }),
})

export const {
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery,
    useGetNowPlayingMoviesQuery,
    useSearchMoviesQuery,
    useGetMovieDetailsQuery,
    useGetMovieCreditsQuery,
    useGetSimilarMoviesQuery,
    useGetGenresQuery,
    useDiscoverMoviesQuery,
} = tmdbApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.themoviedb.org/3/',
        prepareHeaders: (headers) => {
            const token = import.meta.env.VITE_TMDB_TOKEN

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            headers.set('Accept', 'application/json')

            return headers
        },
    }),
    endpoints: (builder) => ({
        getPopularMovies: builder.query<any, number | void>({
            query: (page = 1) => `movie/popular?language=ru-RU&page=${page}`,
        }),

        getTopRatedMovies: builder.query<any, number | void>({
            query: (page = 1) => `movie/top_rated?language=ru-RU&page=${page}`,
        }),

        getUpcomingMovies: builder.query<any, number | void>({
            query: (page = 1) => `movie/upcoming?language=ru-RU&page=${page}`,
        }),

        getNowPlayingMovies: builder.query<any, number | void>({
            query: (page = 1) => `movie/now_playing?language=ru-RU&page=${page}`,
        }),

        searchMovies: builder.query<any, { query: string; page?: number }>({
            query: ({ query, page = 1 }) =>
                `search/movie?language=ru-RU&query=${encodeURIComponent(query)}&page=${page}`,
        }),

        getMovieDetails: builder.query<any, number | string>({
            query: (id) => `movie/${id}?language=ru-RU`,
        }),

        getMovieCredits: builder.query<any, number | string>({
            query: (id) => `movie/${id}/credits?language=ru-RU`,
        }),

        getSimilarMovies: builder.query<any, { id: number | string; page?: number }>({
            query: ({ id, page = 1 }) =>
                `movie/${id}/similar?language=ru-RU&page=${page}`,
        }),

        getGenres: builder.query<any, void>({
            query: () => `genre/movie/list?language=ru-RU`,
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

                    params.set('language', 'ru-RU')
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
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
    DiscoverMoviesParams,
    GenresResponseDto,
    MovieCreditsDto,
    MovieDetailsDto,
    MoviesListResponseDto,
} from '../../entities/movie/model/types/movieTypes'

const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN
const DEFAULT_LANGUAGE = 'en-US'

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.themoviedb.org/3/',
        prepareHeaders: (headers) => {
            if (TMDB_ACCESS_TOKEN) {
                headers.set('Authorization', `Bearer ${TMDB_ACCESS_TOKEN}`)
            }

            headers.set('Accept', 'application/json')

            return headers
        },
    }),
    endpoints: (builder) => ({
        getPopularMovies: builder.query<MoviesListResponseDto, number | void>({
            query: (page = 1) => ({
                url: 'movie/popular',
                params: { language: DEFAULT_LANGUAGE, page },
            }),
        }),

        getTopRatedMovies: builder.query<MoviesListResponseDto, number | void>({
            query: (page = 1) => ({
                url: 'movie/top_rated',
                params: { language: DEFAULT_LANGUAGE, page },
            }),
        }),

        getUpcomingMovies: builder.query<MoviesListResponseDto, number | void>({
            query: (page = 1) => ({
                url: 'movie/upcoming',
                params: { language: DEFAULT_LANGUAGE, page },
            }),
        }),

        getNowPlayingMovies: builder.query<MoviesListResponseDto, number | void>({
            query: (page = 1) => ({
                url: 'movie/now_playing',
                params: { language: DEFAULT_LANGUAGE, page },
            }),
        }),

        searchMovies: builder.query<MoviesListResponseDto, { query: string; page?: number }>({
            query: ({ query, page = 1 }) => ({
                url: 'search/movie',
                params: {
                    language: DEFAULT_LANGUAGE,
                    query,
                    page,
                    include_adult: false,
                },
            }),
        }),

        getMovieDetails: builder.query<MovieDetailsDto, number | string>({
            query: (id) => ({
                url: `movie/${id}`,
                params: { language: DEFAULT_LANGUAGE },
            }),
        }),

        getMovieCredits: builder.query<MovieCreditsDto, number | string>({
            query: (id) => ({
                url: `movie/${id}/credits`,
                params: { language: DEFAULT_LANGUAGE },
            }),
        }),

        getSimilarMovies: builder.query<MoviesListResponseDto, { id: number | string; page?: number }>({
            query: ({ id, page = 1 }) => ({
                url: `movie/${id}/similar`,
                params: { language: DEFAULT_LANGUAGE, page },
            }),
        }),

        getGenres: builder.query<GenresResponseDto, void>({
            query: () => ({
                url: 'genre/movie/list',
                params: { language: DEFAULT_LANGUAGE },
            }),
        }),

        discoverMovies: builder.query<MoviesListResponseDto, DiscoverMoviesParams | void>({
            query: ({
                page = 1,
                sortBy = 'popularity.desc',
                genres = [],
                voteAverageGte,
                voteAverageLte,
            } = {}) => ({
                url: 'discover/movie',
                params: {
                    language: DEFAULT_LANGUAGE,
                    page,
                    sort_by: sortBy,
                    with_genres: genres.length ? genres.join(',') : undefined,
                    'vote_average.gte': voteAverageGte,
                    'vote_average.lte': voteAverageLte,
                    include_adult: false,
                    include_video: false,
                },
            }),
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

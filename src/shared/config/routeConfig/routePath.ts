
export type AppRoute = 'main' | 'not_found' | 'movies_category' | 'filtered_movies' | 'search' | 'favorites';

export const RoutePath: Record<AppRoute, string> = {
    main: '/',
    not_found: '*',
    movies_category: '/movies/:category',
    filtered_movies: '/filtered-movies',
    search: '/search',
    favorites: '/favorites'
} as const;

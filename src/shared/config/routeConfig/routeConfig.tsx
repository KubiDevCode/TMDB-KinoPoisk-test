import type { RouteProps } from 'react-router-dom'
import { FavoritesPage } from '../../../pages/FavoritesPage'
import { FilteredMoviesPage } from '../../../pages/FilteredMoviesPage'
import { MainPage } from '../../../pages/MainPage'
import { MoviesCategoryPage } from '../../../pages/MoviesCategoryPage'
import { NotFoundPage } from '../../../pages/NotFoundPage'
import { SearchPage } from '../../../pages/SearchPage'
import { MovieDetailsPage } from '../../../pages/MovieDetailsPage'
import type { AppRoute } from './routePath'
import { RoutePath } from './routePath'

export const routeConfig: Record<AppRoute, RouteProps> = {
    main: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    movies_category: {
        path: RoutePath.movies_category,
        element: <MoviesCategoryPage />,
    },
    filtered_movies: {
        path: RoutePath.filtered_movies,
        element: <FilteredMoviesPage />,
    },
    search: {
        path: RoutePath.search,
        element: <SearchPage />,
    },
    favorites: {
        path: RoutePath.favorites,
        element: <FavoritesPage />,
    },
    movie_details: {
        path: RoutePath.movie_details,
        element: <MovieDetailsPage />,
    },
    not_found: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
}

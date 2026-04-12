import type { RouteProps } from 'react-router-dom';
import type { AppRoute } from './routePath';
import { MainPage } from '../../../pages/MainPage';
import { NotFoundPage } from '../../../pages/NotFoundPage';
import { MoviesCategoryPage } from '../../../pages/MoviesCategoryPage';
import { RoutePath } from './routePath';
import { FavoritesPage } from '../../../pages/FavoritesPage';

export const routeConfig: Record<AppRoute, RouteProps> = {
    main: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    not_found: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
    movies_category: {
        path: RoutePath.movies_category,
        element: <MoviesCategoryPage />,
    },
    filtered_movies: {
        path: RoutePath.filtered_movies,
        element: <div>фильтры</div>,
    },
    search: {
        path: RoutePath.search,
        element: <div>поиск</div>,
    },
    favorites: {
        path: RoutePath.favorites,
        element: <FavoritesPage />,
    },
}
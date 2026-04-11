import type { RouteProps } from 'react-router-dom';
import { MainPage } from '../../../pages/MainPage/ui/MainPage';
import { NotFoundPage } from '../../../pages/NotFoundPage/ui/NotFoundPage';
import { MoviesCategoryPage } from '../../../pages/MoviesCategoryPage/ui/MoviesCategoryPage';
import { RoutePath } from './routePath';
import type { AppRoute } from './routePath';

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
        element: <div>любимые</div>,
    },
}
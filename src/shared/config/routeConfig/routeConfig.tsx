import type { RouteProps } from 'react-router-dom';
import { MainPage } from '../../../pages/MainPage/ui/MainPage';
import { NotFoundPage } from '../../../pages/NotFoundPage/ui/NotFoundPage';

export type AppRoute = 'main' | 'not_found' | 'movies_category';

export const RoutePath: Record<AppRoute, string> = {
    main: '/',
    not_found: '*',
    movies_category: '/movies/:category'
};

export const routeConfig: Record<AppRoute, RouteProps> = {
    main: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    not_found: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
    movies_category:{
        path: RoutePath.movies_category,
        element: <MoviesCategoryPage />,
    }
};
import type { RouteProps } from 'react-router-dom';
import { MainPage } from '../../../pages/MainPage/ui/MainPage';

export type AppRoute = 'main' | 'not_found';

export const RoutePath: Record<AppRoute, string> = {
    main: '/',
    not_found: '*',
};

export const routeConfig: Record<AppRoute, RouteProps> = {
    main: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    not_found: {
        path: RoutePath.not_found,
        element: <div>СОСИ</div>,
    },
};
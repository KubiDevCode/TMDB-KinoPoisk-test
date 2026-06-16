import type { NavButtonItem } from "../../../features/NavButtonBox/ui/NavButtonBox";
import { RoutePath } from '../../../shared/config/routeConfig/routePath';

export const headerList: NavButtonItem[] = [
    {
        title: 'Home',
        path: RoutePath.main,
    },
    {
        title: 'Categories',
        path: '/movies/popular'
    },
    {
        title: 'Discover',
        path: RoutePath.filtered_movies
    },
    {
        title: 'Search',
        path: RoutePath.search
    },
    {
        title: 'Favorites',
        path: RoutePath.favorites
    },
]

import type { NavButtonItem } from "../../../features/NavButtonBox/ui/NavButtonBox";
import { RoutePath } from '../../../shared/config/routeConfig/routePath';

export const headerList: NavButtonItem[] = [
    {
        title: 'Main',
        path: RoutePath.main,
    },
    {
        title: 'Category movies',
        path: '/movies/popular'
    },
    {
        title: 'Filtered movies',
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
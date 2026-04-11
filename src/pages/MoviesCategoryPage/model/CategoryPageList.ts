import type { NavButtonItem } from "../../../features/NavButtonBox/ui/NavButtonBox";

export const categoryPageList: NavButtonItem[] = [
    {
        title: 'Popular Movies',
        path: '/movies/popular',
    },
    {
        title: 'Top Rated Movies',
        path: '/movies/top-rated',
    },
    {
        title: 'Upcoming Movies',
        path: '/movies/upcoming',
    },
    {
        title: 'Now Playing Movies',
        path: '/movies/now-playing',
    },
]
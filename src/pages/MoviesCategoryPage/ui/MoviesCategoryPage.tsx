import { Navigate, useParams } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { useMemo, useState } from 'react';
import s from './MoviesCategoryPage.module.scss';
import { MovieCard } from '../../../entities/movie';
import { mapMovieCard } from '../../../entities/movie/model/mappers/mappers';
import { NavButtonBox } from '../../../features/NavButtonBox/ui/NavButtonBox';
import { useGetPopularMoviesQuery, useGetTopRatedMoviesQuery, useGetUpcomingMoviesQuery, useGetNowPlayingMoviesQuery } from '../../../shared/api/tmdbApi';
import { Header } from '../../../widgets/Header';
import classNames from 'classnames';
import { categoryPageList } from '../model/CategoryPageList';

interface MoviesCategoryPageProps {
    className?: string;
}

const categoryTitleMap: Record<string, string> = {
    popular: 'Popular Movies',
    'top-rated': 'Top Rated Movies',
    upcoming: 'Upcoming Movies',
    'now-playing': 'Now Playing Movies',
};

export const MoviesCategoryPage = ({ className }: MoviesCategoryPageProps) => {
    const { category } = useParams<{ category: string }>();
    const [page, setPage] = useState(1);

    const popularQuery = useGetPopularMoviesQuery(page, {
        skip: category !== 'popular',
    });

    const topRatedQuery = useGetTopRatedMoviesQuery(page, {
        skip: category !== 'top-rated',
    });

    const upcomingQuery = useGetUpcomingMoviesQuery(page, {
        skip: category !== 'upcoming',
    });

    const nowPlayingQuery = useGetNowPlayingMoviesQuery(page, {
        skip: category !== 'now-playing',
    });

    let currentQuery;

    switch (category) {
        case 'popular':
            currentQuery = popularQuery;
            break;
        case 'top-rated':
            currentQuery = topRatedQuery;
            break;
        case 'upcoming':
            currentQuery = upcomingQuery;
            break;
        case 'now-playing':
            currentQuery = nowPlayingQuery;
            break;
        default:
            return <Navigate to="/movies/popular" replace />;
    }

    const movies = useMemo(() => {
        return currentQuery.data?.results?.map(mapMovieCard) ?? [];
    }, [currentQuery.data]);

    const totalPages = currentQuery.data?.total_pages
        ? Math.min(currentQuery.data.total_pages, 500)
        : 1;

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={className}>
            <Header />
            <main className={classNames(s.page, 'container')}>
                <div className={s.container}>
                    <ul className={s.categoryList}>
                        {categoryPageList.map((item) => (
                            <NavButtonBox key={item.path} buttonItem={item} />
                        ))}
                    </ul>

                    <h1 className={s.title}>{categoryTitleMap[category]}</h1>

                    {currentQuery.isLoading ? (
                        <div className={s.status}>Loading...</div>
                    ) : currentQuery.isError ? (
                        <div className={s.status}>Something went wrong</div>
                    ) : (
                        <>
                            <div className={s.moviesGrid}>
                                {movies.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>

                            <div className={s.pagination}>
                                <Pagination
                                    page={page}
                                    count={totalPages}
                                    onChange={handlePageChange}
                                    color="primary"
                                    shape="rounded"
                                    size="large"
                                />
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};
import { useEffect, useMemo, useState } from "react";

import { mapMovieSection } from "../../../entities/movie/model/mappers/mappers";
import type { MovieSectionModel } from "../../../entities/movie/model/types/movieTypes";
import {
    useGetNowPlayingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery,
} from "../../../shared/api/tmdbApi";
import { Footer } from "../../../widgets/Footer";
import { Header } from "../../../widgets/Header";
import { MoviesCategoriesWidget } from "../../../widgets/MoviesCategoriesWidget";
import { Welcome } from "../../../widgets/Welcome";



const IMAGE_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

export const MainPage = () => {
    const popularQuery = useGetPopularMoviesQuery(1);
    const topRatedQuery = useGetTopRatedMoviesQuery(1);
    const upcomingQuery = useGetUpcomingMoviesQuery(1);
    const nowPlayingQuery = useGetNowPlayingMoviesQuery(1);

    const [randomMovieIndex, setRandomMovieIndex] = useState<number | null>(null);

    useEffect(() => {
        const movies = popularQuery.data?.results;

        if (!movies?.length) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setRandomMovieIndex(null);
            return;
        }

        const nextIndex = Math.floor(Math.random() * movies.length);
        setRandomMovieIndex(nextIndex);
    }, [popularQuery.data]);

    const sections: MovieSectionModel[] = useMemo(() => {
        const result: MovieSectionModel[] = [];

        if (popularQuery.data) {
            result.push(
                mapMovieSection(popularQuery.data, "popular", "Popular Movies"),
            );
        }

        if (topRatedQuery.data) {
            result.push(
                mapMovieSection(topRatedQuery.data, "topRated", "Top Rated Movies"),
            );
        }

        if (upcomingQuery.data) {
            result.push(
                mapMovieSection(upcomingQuery.data, "upcoming", "Upcoming Movies"),
            );
        }

        if (nowPlayingQuery.data) {
            result.push(
                mapMovieSection(nowPlayingQuery.data, "nowPlaying", "Now Playing Movies"),
            );
        }

        return result;
    }, [
        popularQuery.data,
        topRatedQuery.data,
        upcomingQuery.data,
        nowPlayingQuery.data,
    ]);

    const welcomeUrl = useMemo(() => {
        const movies = popularQuery.data?.results;

        if (!movies?.length || randomMovieIndex === null) {
            return "";
        }

        const randomMovie = movies[randomMovieIndex];

        if (!randomMovie?.backdrop_path) {
            return "";
        }

        return `${IMAGE_BACKDROP_BASE_URL}${randomMovie.backdrop_path}`;
    }, [popularQuery.data, randomMovieIndex]);

    return (
        <>
            <Header />
            <Welcome backgroundUrl={welcomeUrl} />
            <MoviesCategoriesWidget sections={sections} />
            <Footer />
        </>
    );
};
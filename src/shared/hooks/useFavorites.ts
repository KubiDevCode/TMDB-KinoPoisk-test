import { useState } from "react";
import type { MovieCardModel } from "../../entities/movie/model/types/movieTypes";

export const getFavoritesFromStorage = (): MovieCardModel[] => {
    const raw = window.localStorage.getItem("favorites");

    if (!raw) {
        return [];
    }

    try {
        return JSON.parse(raw) as MovieCardModel[];
    } catch {
        return [];
    }
};

export const toggleFavoritesFromStorage = (movie: MovieCardModel): MovieCardModel[] => {
    const raw = getFavoritesFromStorage();

    const exists = raw.some((item) => item.id === movie.id);

    const updated = exists
        ? raw.filter((item) => item.id !== movie.id)
        : [...raw, { ...movie, favorites: true }];

    window.localStorage.setItem("favorites", JSON.stringify(updated));

    return updated;
};



export const useFavoritesFromStorage = () => {

    const [favoriteMovies, setFavoriteMovies] = useState<MovieCardModel[]>(() => getFavoritesFromStorage());

    const handleToggleFavorite = (movie: MovieCardModel) => {
        const updated = toggleFavoritesFromStorage(movie);
        setFavoriteMovies(updated);
    };

    return {
        favoriteMovies, handleToggleFavorite
    }
}
import type { MovieCardModel } from "../../entities/movie/model/types/movieTypes"

export const getFavoritesFromStorage = (): number[] => {
    const raw = window.localStorage.getItem('favorites');

    if (!raw) {
        return [];
    }

    return JSON.parse(raw) as number[];
};

export const toggleFavoritesFromStorage = (movie: MovieCardModel): number[] => {
    const JSONraw = window.localStorage.getItem('favorites');

    let raw: number[] = [];

    if (JSONraw) {
        try {
            raw = JSON.parse(JSONraw) as number[];
        } catch {
            raw = [];
        }
    }

    const updated = raw.includes(movie.id)
        ? raw.filter((id) => id !== movie.id)
        : [...raw, movie.id];

    window.localStorage.setItem('favorites', JSON.stringify(updated));

    return updated;
};
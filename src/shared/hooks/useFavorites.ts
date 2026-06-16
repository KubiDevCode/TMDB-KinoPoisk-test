import { useEffect, useState } from 'react'
import type { MovieCardModel } from '../../entities/movie/model/types/movieTypes'

const FAVORITES_STORAGE_KEY = 'tmdb:favorites'
const LEGACY_FAVORITES_STORAGE_KEY = 'favorites'
const FAVORITES_UPDATED_EVENT = 'tmdb:favorites-updated'

const normalizeFavoriteMovie = (movie: MovieCardModel): MovieCardModel => ({
    ...movie,
    isFavorite: true,
})

export const getFavoritesFromStorage = (): MovieCardModel[] => {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY)
        ?? window.localStorage.getItem(LEGACY_FAVORITES_STORAGE_KEY)

    if (!raw) {
        return []
    }

    try {
        const parsed = JSON.parse(raw) as MovieCardModel[]

        if (!Array.isArray(parsed)) {
            return []
        }

        return parsed.map(normalizeFavoriteMovie)
    } catch {
        return []
    }
}

export const toggleFavoritesFromStorage = (movie: MovieCardModel): MovieCardModel[] => {
    const favorites = getFavoritesFromStorage()

    const exists = favorites.some((item) => item.id === movie.id)

    const updated = exists
        ? favorites.filter((item) => item.id !== movie.id)
        : [...favorites, normalizeFavoriteMovie(movie)]

    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event(FAVORITES_UPDATED_EVENT))

    return updated
}

export const useFavoritesFromStorage = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<MovieCardModel[]>(
        () => getFavoritesFromStorage(),
    )

    useEffect(() => {
        const syncFavorites = () => {
            setFavoriteMovies(getFavoritesFromStorage())
        }

        window.addEventListener('storage', syncFavorites)
        window.addEventListener(FAVORITES_UPDATED_EVENT, syncFavorites)

        return () => {
            window.removeEventListener('storage', syncFavorites)
            window.removeEventListener(FAVORITES_UPDATED_EVENT, syncFavorites)
        }
    }, [])

    const handleToggleFavorite = (movie: MovieCardModel) => {
        setFavoriteMovies(toggleFavoritesFromStorage(movie))
    }

    return {
        favoriteMovies,
        handleToggleFavorite,
    }
}

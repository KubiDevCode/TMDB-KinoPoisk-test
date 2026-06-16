import type { KeyboardEvent, MouseEvent } from 'react'
import type { MovieCardModel } from '../model/types/movieTypes'
import s from './MovieCard.module.scss'

type MovieCardProps = {
    movie: MovieCardModel
    onClick?: () => void
    onToggleFavorite: (movie: MovieCardModel) => void
}

export const MovieCard = ({ movie, onClick, onToggleFavorite }: MovieCardProps) => {
    const rating = Number.isFinite(movie.voteAverage)
        ? Math.round(movie.voteAverage * 10) / 10
        : null

    const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        onToggleFavorite(movie)
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (!onClick) {
            return
        }

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onClick()
        }
    }

    return (
        <article
            className={s.card}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            <div className={s.imageWrapper}>
                {movie.posterPath ? (
                    <img
                        src={movie.posterPath}
                        alt={movie.title}
                        className={s.image}
                        loading="lazy"
                    />
                ) : (
                    <div className={s.noPoster}>No poster</div>
                )}

                <button
                    type="button"
                    className={s.favoriteButton}
                    onClick={handleFavoriteClick}
                    aria-label={
                        movie.isFavorite
                            ? `Remove ${movie.title} from favorites`
                            : `Add ${movie.title} to favorites`
                    }
                >
                    {movie.isFavorite ? '♥' : '♡'}
                </button>

                {rating !== null && (
                    <div className={s.rating}>{rating.toFixed(1)}</div>
                )}
            </div>

            <div className={s.info}>
                <h3 className={s.title}>{movie.title}</h3>
                {movie.releaseYear && (
                    <p className={s.meta}>{movie.releaseYear}</p>
                )}
            </div>
        </article>
    )
}

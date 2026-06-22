import classNames from 'classnames'
import type { KeyboardEvent, MouseEvent } from 'react'
import { Badge } from '../../../shared/ui/Badge/Badge'
import { Button } from '../../../shared/ui/Button/Button'
import { RatingView } from '../../../shared/ui/RatingView/RatingView'
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

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
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
            aria-label={onClick ? `Open ${movie.title}` : undefined}
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

                <Button
                    className={classNames(s.favoriteButton, movie.isFavorite && s.favoriteActive)}
                    mode="black-06"
                    iconName={movie.isFavorite ? 'like' : 'plus'}
                    label={
                        movie.isFavorite
                            ? `Remove ${movie.title} from favorites`
                            : `Add ${movie.title} to favorites`
                    }
                    isLabelHidden
                    onClick={handleFavoriteClick}
                />
            </div>

            <div className={s.body}>
                <h3 className={s.title}>{movie.title}</h3>
                <div className={s.meta}>
                    {movie.releaseYear && (
                        <Badge iconName="calendar">{movie.releaseYear}</Badge>
                    )}
                    {rating !== null && (
                        <Badge className={s.ratingBadge}>
                            <RatingView value={rating / 2} label={rating.toFixed(1)} />
                        </Badge>
                    )}
                </div>
            </div>
        </article>
    )
}


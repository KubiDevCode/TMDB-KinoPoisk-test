import { toggleFavoritesFromStorage } from '../../../shared/hooks/useFavorites';
import type { MovieCardModel } from '../model/types/movieTypes';
import s from './MovieCard.module.scss';

type MovieCardProps = {
    movie: MovieCardModel;
    onClick?: () => void;
    onToggleFavorite: (movie: MovieCardModel) => void;
};

const FALLBACK_IMAGE = 'https://placehold.co/300x450?text=No+Image';

export const MovieCard = ({ movie, onClick, onToggleFavorite }: MovieCardProps) => {
    const posterUrl = movie.posterPath || FALLBACK_IMAGE;

    const rating =
        typeof movie.voteAverage === 'number'
            ? Math.round(movie.voteAverage * 10) / 10
            : null;

    return (
        <div
            className={s.card}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            <div className={s.imageWrapper}>
                <img
                    src={posterUrl}
                    alt={movie.title}
                    className={s.image}
                />

                <button
                    type="button"
                    className={s.favoriteButton}
                    onClick={() => onToggleFavorite(movie)}
                    aria-label={
                        movie.favorites
                            ? `Remove ${movie.title} from favorites`
                            : `Add ${movie.title} to favorites`
                    }
                >
                    {movie.favorites ? '♥' : '♡'}
                </button>

                {rating !== null && (
                    <div className={s.rating}>{rating}</div>
                )}
            </div>

            <div className={s.info}>
                <h3 className={s.title}>{movie.title}</h3>
            </div>
        </div>
    );
};
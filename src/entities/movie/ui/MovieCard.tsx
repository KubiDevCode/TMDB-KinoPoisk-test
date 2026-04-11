import s from './MovieCard.module.scss';

export interface Movie {
    id: number;
    title: string;
    posterPath: string | null;
    vote_average?: number;
}

type MovieCardProps = {
    movie: Movie;
    onClick?: () => void;
};

const FALLBACK_IMAGE = 'https://placehold.co/300x450?text=No+Image';

export const MovieCard = ({ movie, onClick }: MovieCardProps) => {
    const posterUrl = movie.posterPath || FALLBACK_IMAGE;

    const rating =
        typeof movie.vote_average === 'number'
            ? Math.round(movie.vote_average * 10) / 10
            : null;

    return (
        <div className={s.card} onClick={onClick}>
            <div className={s.imageWrapper}>
                <img
                    src={posterUrl}
                    alt={movie.title}
                    className={s.image}
                />

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
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import type { MovieCardModel } from '../model/types/movieTypes'
import { MovieCard } from './MovieCard'
import s from './MoviesGrid.module.scss'

type MoviesGridProps = {
    movies: MovieCardModel[]
    onToggleFavorite: (movie: MovieCardModel) => void
    className?: string
    emptyText?: string
}

export const MoviesGrid = ({
    movies,
    onToggleFavorite,
    className,
    emptyText = 'No movies found',
}: MoviesGridProps) => {
    const navigate = useNavigate()

    if (!movies.length) {
        return <div className={s.empty}>{emptyText}</div>
    }

    return (
        <div className={classNames(s.grid, className)}>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    )
}

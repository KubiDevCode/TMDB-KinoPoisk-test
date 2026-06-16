import classNames from 'classnames'
import type { MovieCardModel } from '../../../entities/movie/model/types/movieTypes'
import { SearchMovieForm } from '../../../features/SearchMovieForm'
import s from './Welcome.module.scss'

type WelcomeProps = {
    highlightedMovie: MovieCardModel | null
}

export const Welcome = ({ highlightedMovie }: WelcomeProps) => {
    const backgroundImage = highlightedMovie?.backdropPath
        ? `linear-gradient(90deg, rgba(3, 37, 65, 0.9) 0%, rgba(3, 37, 65, 0.74) 48%, rgba(3, 37, 65, 0.32) 100%), url(${highlightedMovie.backdropPath})`
        : 'linear-gradient(90deg, #032541 0%, #0f465d 100%)'

    return (
        <section
            className={classNames(s.banner)}
            style={{ backgroundImage }}
        >
            <div className={s.content}>
                <p className={s.kicker}>Powered by TMDB</p>
                <h1 className={s.title}>
                    {highlightedMovie?.title ?? 'Movie Explorer'}
                </h1>
                <p className={s.subtitle}>
                    {highlightedMovie?.overview
                        ? highlightedMovie.overview
                        : 'Browse popular, top rated, upcoming and now playing movies in one place.'}
                </p>
                <SearchMovieForm />
            </div>
        </section>
    )
}

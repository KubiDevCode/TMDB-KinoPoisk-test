import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import type { MovieCardModel } from '../../../entities/movie/model/types/movieTypes'
import { SearchMovieForm } from '../../../features/SearchMovieForm'
import { Button } from '../../../shared/ui/Button/Button'
import s from './Welcome.module.scss'

type WelcomeProps = {
    highlightedMovie: MovieCardModel | null
}

export const Welcome = ({ highlightedMovie }: WelcomeProps) => {
    const navigate = useNavigate()
    const backgroundImage = highlightedMovie?.backdropPath
        ? `linear-gradient(0deg, var(--color-black-08) 0%, rgb(20 20 20 / 0.08) 58%, var(--color-black-08) 100%), url(${highlightedMovie.backdropPath})`
        : 'linear-gradient(135deg, var(--color-black-06) 0%, var(--color-black-20) 100%)'

    const handlePlayClick = () => {
        if (highlightedMovie) {
            navigate(`/movie/${highlightedMovie.id}`)
            return
        }

        navigate('/movies/popular')
    }

    return (
        <section
            className={classNames(s.hero, 'container')}
            style={{ backgroundImage }}
            aria-labelledby="home-hero-title"
        >
            <div className={s.inner}>
                <p className={s.kicker}>Powered by TMDB</p>
                <h1 className={s.title} id="home-hero-title">
                    {highlightedMovie?.title ?? 'StreamVibe'}
                </h1>
                <p className={s.description}>
                    {highlightedMovie?.overview
                        ? highlightedMovie.overview
                        : 'Browse popular, top rated, upcoming and now playing movies in one StreamVibe catalog.'}
                </p>
                <div className={s.actions}>
                    <Button
                        className={s.playButton}
                        iconName="play"
                        label={highlightedMovie ? 'Play Now' : 'Start Watching Now'}
                        onClick={handlePlayClick}
                    />
                    <SearchMovieForm className={s.search} placeholder="Search movies" />
                </div>
            </div>
        </section>
    )
}


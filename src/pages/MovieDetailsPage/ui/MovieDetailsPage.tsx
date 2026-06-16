import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MoviesGrid } from '../../../entities/movie'
import { getMovieImageUrl, mapMovieCard } from '../../../entities/movie/model/mappers/mappers'
import {
    useGetMovieCreditsQuery,
    useGetMovieDetailsQuery,
    useGetSimilarMoviesQuery,
} from '../../../shared/api/tmdbApi'
import { useFavoritesFromStorage } from '../../../shared/hooks/useFavorites'
import { Button } from '../../../shared/ui/Button/Button'
import { SkeletonGrid } from '../../../shared/ui/SkeletonGrid/SkeletonGrid'
import { Footer } from '../../../widgets/Footer'
import { Header } from '../../../widgets/Header'
import s from './MovieDetailsPage.module.scss'

export const MovieDetailsPage = () => {
    const { id = '' } = useParams()
    const navigate = useNavigate()
    const { favoriteMovies, handleToggleFavorite } = useFavoritesFromStorage()
    const detailsQuery = useGetMovieDetailsQuery(id, { skip: !id })
    const creditsQuery = useGetMovieCreditsQuery(id, { skip: !id })
    const similarQuery = useGetSimilarMoviesQuery({ id }, { skip: !id })

    const similarMovies = useMemo(
        () => similarQuery.data?.results.map((movie) => mapMovieCard(movie, favoriteMovies)).slice(0, 6) ?? [],
        [favoriteMovies, similarQuery.data?.results],
    )

    const movie = detailsQuery.data
    const isFavorite = favoriteMovies.some((item) => item.id === movie?.id)

    return (
        <>
            <Header />
            <main className={s.page}>
                <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>

                {detailsQuery.isError ? (
                    <div className={s.status}>Could not load movie details.</div>
                ) : !movie ? (
                    <SkeletonGrid count={6} />
                ) : (
                    <>
                        <section className={s.hero}>
                            <div className={s.backdrop} style={{ backgroundImage: `url(${getMovieImageUrl(movie.backdrop_path, 'original') ?? ''})` }} />
                            <div className={s.details}>
                                {movie.poster_path ? (
                                    <img className={s.poster} src={getMovieImageUrl(movie.poster_path, 'w500') ?? ''} alt={movie.title} />
                                ) : <div className={s.posterFallback}>No poster</div>}
                                <div className={s.copy}>
                                    <p className={s.kicker}>Movie details</p>
                                    <h1>{movie.title}</h1>
                                    <p className={s.meta}>
                                        {movie.release_date?.slice(0, 4) || 'Unknown year'} · {movie.runtime ? `${movie.runtime} min` : 'Runtime unknown'} · ★ {movie.vote_average.toFixed(1)}
                                    </p>
                                    <p className={s.genres}>{movie.genres.map((genre) => genre.name).join(' · ')}</p>
                                    <p className={s.overview}>{movie.overview || 'No overview available.'}</p>
                                    <Button onClick={() => handleToggleFavorite(mapMovieCard(movie, favoriteMovies))}>
                                        {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                    </Button>
                                </div>
                            </div>
                        </section>

                        <section className={s.section}>
                            <h2>Top cast</h2>
                            <div className={s.cast}>
                                {creditsQuery.data?.cast.slice(0, 6).map((person) => (
                                    <article key={person.id} className={s.person}>
                                        {person.profile_path ? <img src={getMovieImageUrl(person.profile_path, 'w300') ?? ''} alt={person.name} /> : <div className={s.personFallback}>No photo</div>}
                                        <strong>{person.name}</strong>
                                        <span>{person.character || 'Unknown role'}</span>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className={s.section}>
                            <h2>Similar movies</h2>
                            <MoviesGrid movies={similarMovies} onToggleFavorite={handleToggleFavorite} emptyText="No similar movies found" />
                        </section>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}

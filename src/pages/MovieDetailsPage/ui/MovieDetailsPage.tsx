import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MovieCard } from '../../../entities/movie'
import { getMovieImageUrl, mapMovieCard } from '../../../entities/movie/model/mappers/mappers'
import {
    useGetMovieCreditsQuery,
    useGetMovieDetailsQuery,
    useGetSimilarMoviesQuery,
} from '../../../shared/api/tmdbApi'
import { useFavoritesFromStorage } from '../../../shared/hooks/useFavorites'
import { Badge } from '../../../shared/ui/Badge/Badge'
import { Button } from '../../../shared/ui/Button/Button'
import { RatingView } from '../../../shared/ui/RatingView/RatingView'
import { SkeletonGrid } from '../../../shared/ui/SkeletonGrid/SkeletonGrid'
import { Slider } from '../../../shared/ui/Slider/Slider'
import { Tags } from '../../../shared/ui/Tags/Tags'
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
        () => similarQuery.data?.results.map((movie) => mapMovieCard(movie, favoriteMovies)).slice(0, 10) ?? [],
        [favoriteMovies, similarQuery.data?.results],
    )

    const movie = detailsQuery.data
    const isFavorite = favoriteMovies.some((item) => item.id === movie?.id)
    const rating = movie ? Math.round(movie.vote_average * 10) / 10 : null
    const director = creditsQuery.data?.crew.find((person) => person.job === 'Director')
    const topCast = creditsQuery.data?.cast.slice(0, 12) ?? []
    const movieCard = movie ? mapMovieCard(movie, favoriteMovies) : null
    const backdrop = movie ? getMovieImageUrl(movie.backdrop_path, 'original') : null

    return (
        <>
            <Header />
            <main className={s.page}>
                <div className={s.topbar}>
                    <Button mode="black-10" iconName="arrow-left" onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </div>

                {detailsQuery.isError ? (
                    <div className={s.status}>Could not load movie details.</div>
                ) : !movie || !movieCard ? (
                    <SkeletonGrid count={6} />
                ) : (
                    <>
                        <section
                            className={s.banner}
                            style={{ backgroundImage: backdrop
                                ? `linear-gradient(0deg, var(--color-black-08) 0%, rgb(20 20 20 / 0.08) 58%, var(--color-black-08) 100%), url(${backdrop})`
                                : undefined }}
                            aria-labelledby="movie-details-title"
                        >
                            <div className={s.bannerInner}>
                                <div className={s.bannerBody}>
                                    <h1 className={s.bannerTitle} id="movie-details-title">
                                        {movie.title}
                                    </h1>
                                    <p className={s.bannerDescription}>
                                        {movie.overview || 'No overview available.'}
                                    </p>
                                </div>
                                <footer className={s.bannerFooter}>
                                    <Button iconName="play" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                        Play Now
                                    </Button>
                                    <div className={s.bannerActions}>
                                        <Button
                                            mode="black-06"
                                            iconName={isFavorite ? 'like' : 'plus'}
                                            onClick={() => handleToggleFavorite(movieCard)}
                                        >
                                            {isFavorite ? 'Saved' : 'Save'}
                                        </Button>
                                        {rating !== null && (
                                            <Badge className={s.ratingBadge}>
                                                <RatingView value={rating / 2} label={rating.toFixed(1)} />
                                            </Badge>
                                        )}
                                    </div>
                                </footer>
                            </div>
                        </section>

                        <section className={s.details} aria-label="Detailed movie information">
                            <div className={s.main}>
                                <div className={s.panel}>
                                    <div className={s.group}>
                                        <h2 className={s.panelTitle}>Description</h2>
                                        <p className={s.description}>
                                            {movie.overview || 'No overview available.'}
                                        </p>
                                    </div>
                                </div>

                                <div className={s.panel}>
                                    <header className={s.panelHeader}>
                                        <h2 className={s.panelTitle}>Cast</h2>
                                    </header>
                                    {topCast.length ? (
                                        <Slider
                                            hasScrollbarOnMobile={false}
                                            navigationMode="rounded"
                                            isNavigationHiddenMobile={false}
                                            isSlideWidthAuto
                                            hasNavigationPagination={false}
                                            sliderParams={{
                                                slidesPerView: 'auto',
                                                spaceBetween: 10,
                                                breakpoints: {
                                                    1024: {
                                                        slidesPerView: 'auto',
                                                        spaceBetween: 20,
                                                        allowTouchMove: false,
                                                    },
                                                },
                                            }}
                                        >
                                            {topCast.map((person) => (
                                                <article className={s.personCard} key={person.id}>
                                                    {person.profile_path ? (
                                                        <img
                                                            className={s.personImage}
                                                            src={getMovieImageUrl(person.profile_path, 'w300') ?? ''}
                                                            alt={person.name}
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <div className={s.personFallback}>No photo</div>
                                                    )}
                                                    <div className={s.personBody}>
                                                        <h3 className={s.personName}>{person.name}</h3>
                                                        <p className={s.personRole}>{person.character || 'Cast'}</p>
                                                    </div>
                                                </article>
                                            ))}
                                        </Slider>
                                    ) : (
                                        <div className={s.inlineStatus}>No cast information available.</div>
                                    )}
                                </div>

                                <div className={s.panel}>
                                    <header className={s.panelHeader}>
                                        <h2 className={s.panelTitle}>Similar movies</h2>
                                    </header>
                                    {similarMovies.length ? (
                                        <Slider navigationMode="tile">
                                            {similarMovies.map((similarMovie) => (
                                                <MovieCard
                                                    key={similarMovie.id}
                                                    movie={similarMovie}
                                                    onClick={() => navigate(`/movie/${similarMovie.id}`)}
                                                    onToggleFavorite={handleToggleFavorite}
                                                />
                                            ))}
                                        </Slider>
                                    ) : (
                                        <div className={s.inlineStatus}>No similar movies found.</div>
                                    )}
                                </div>
                            </div>

                            <aside className={s.info}>
                                <div className={s.panel}>
                                    <div className={s.groups}>
                                        <div className={s.group}>
                                            <h2 className={s.panelTitle}>Released Year</h2>
                                            <p className={s.infoValue}>
                                                {movie.release_date?.slice(0, 4) || 'Unknown year'}
                                            </p>
                                        </div>
                                        <div className={s.group}>
                                            <h2 className={s.panelTitle}>Runtime</h2>
                                            <p className={s.infoValue}>
                                                {movie.runtime ? `${movie.runtime} min` : 'Runtime unknown'}
                                            </p>
                                        </div>
                                        <div className={s.group}>
                                            <h2 className={s.panelTitle}>Ratings</h2>
                                            {rating !== null ? (
                                                <div className={s.ratingsBox}>
                                                    <h3 className={s.ratingTitle}>TMDB</h3>
                                                    <RatingView value={rating / 2} label={rating.toFixed(1)} />
                                                </div>
                                            ) : (
                                                <p className={s.infoValue}>No rating</p>
                                            )}
                                        </div>
                                        <div className={s.group}>
                                            <h2 className={s.panelTitle}>Genres</h2>
                                            <Tags items={movie.genres.map((genre) => genre.name)} />
                                        </div>
                                        {director && (
                                            <div className={s.group}>
                                                <h2 className={s.panelTitle}>Director</h2>
                                                <article className={s.crewCard}>
                                                    {director.profile_path ? (
                                                        <img
                                                            className={s.crewImage}
                                                            src={getMovieImageUrl(director.profile_path, 'w300') ?? ''}
                                                            alt={director.name}
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <div className={s.crewFallback}>No photo</div>
                                                    )}
                                                    <div>
                                                        <h3 className={s.crewName}>{director.name}</h3>
                                                        <p className={s.personRole}>Director</p>
                                                    </div>
                                                </article>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </aside>
                        </section>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}

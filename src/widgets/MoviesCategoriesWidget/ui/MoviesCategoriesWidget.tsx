import { useNavigate } from 'react-router-dom'
import { MovieCard } from '../../../entities/movie'
import type { MovieCardModel, MovieSectionModel } from '../../../entities/movie/model/types/movieTypes'
import { Button } from '../../../shared/ui/Button/Button'
import { Section } from '../../../shared/ui/Section/Section'
import { Slider } from '../../../shared/ui/Slider/Slider'
import s from './MoviesCategoriesWidget.module.scss'

interface MoviesCategoriesWidgetProps {
    sections?: MovieSectionModel[]
    cardView?: number
    onToggleFavorite: (movie: MovieCardModel) => void
    hasButton?: boolean
}

export const MoviesCategoriesWidget = (props: MoviesCategoriesWidgetProps) => {
    const {
        sections,
        cardView = 10,
        onToggleFavorite,
        hasButton = true,
    } = props

    const navigate = useNavigate()

    const handleViewMoreClick = (category: string) => () => {
        navigate(`/movies/${category}`)
    }

    return (
        <div className={s.widget}>
            {sections?.map((section) => (
                <Section
                    key={section.category}
                    title={section.title}
                    titleId={`${section.category}-movies-title`}
                    actions={hasButton ? (
                        <Button
                            mode="black-10"
                            iconName="arrow-right"
                            iconPosition="after"
                            onClick={handleViewMoreClick(section.category)}
                        >
                            View More
                        </Button>
                    ) : null}
                    isActionsHiddenOnMobile
                >
                    <Slider navigationMode="tile">
                        {section.movies.slice(0, cardView).map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onClick={() => navigate(`/movie/${movie.id}`)}
                                onToggleFavorite={onToggleFavorite}
                            />
                        ))}
                    </Slider>
                </Section>
            ))}
        </div>
    )
}


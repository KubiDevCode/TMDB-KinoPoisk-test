import s from "./MoviesCategoriesWidget.module.scss";
import classNames from "classnames";
import { Button } from "../../../shared/ui/Button/Button";
import { MoviesGrid } from "../../../entities/movie/index";
import type { MovieCardModel, MovieSectionModel } from "../../../entities/movie/model/types/movieTypes";
import { useNavigate } from "react-router-dom";

interface MoviesCategoriesWidgetProps {
    sections?: MovieSectionModel[];
    cardView?: number;
    onToggleFavorite: (movie: MovieCardModel) => void;
    hasButton?: boolean
}

export const MoviesCategoriesWidget = (props: MoviesCategoriesWidgetProps) => {
    const {
        sections,
        cardView = 7,
        onToggleFavorite,
        hasButton = true,
    } = props;

    const navigate = useNavigate();

    const handleViewMoreClick = (category: string) => () => {
        navigate(`/movies/${category}`);
    }

    return (
        <div className={classNames(s.widget, 'container')}>
            {sections?.map((section) => (
                <section key={section.category} className={s.section}>
                    <div className={s.sectionHeader}>
                        <h2 className={s.title}>{section.title}</h2>
                        {hasButton ? <Button
                            variant="outlined"
                            onClick={handleViewMoreClick(section.category)}
                        >
                            View More
                        </Button> : null}
                    </div>

                    <MoviesGrid
                        movies={section.movies.slice(0, cardView)}
                        onToggleFavorite={onToggleFavorite}
                        className={s.moviesGrid}
                    />
                </section>
            ))}
        </div>
    );
};

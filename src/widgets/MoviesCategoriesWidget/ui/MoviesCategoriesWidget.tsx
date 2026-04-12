import s from "./MoviesCategoriesWidget.module.scss";
import classNames from "classnames";
import { Button } from "../../../shared/ui/Button/Button";
import { MovieCard } from "../../../entities/movie/index";
import type { MovieCardModel, MovieSectionModel } from "../../../entities/movie/model/types/movieTypes";
import { useNavigate } from "react-router-dom";

interface MoviesCategoriesWidgetProps {
    sections?: MovieSectionModel[];
    cardView?: number;
    onToggleFavorite: (movie: MovieCardModel) => void;
}

export const MoviesCategoriesWidget = (props: MoviesCategoriesWidgetProps) => {
    const {
        sections,
        cardView = 7,
        onToggleFavorite,
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
                        <Button
                            variant="outlined"
                            onClick={handleViewMoreClick(section.category)}
                        >
                            View More
                        </Button>
                    </div>

                    <div className={s.moviesGrid}>
                        {section.movies.slice(0, cardView).map((movie) => (
                            <MovieCard key={movie.id} movie={movie} onToggleFavorite={onToggleFavorite} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};
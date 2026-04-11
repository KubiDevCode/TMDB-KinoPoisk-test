import classNames from "classnames";
import { SearchMovieForm } from "../../../features/SearchMovieForm/index";
import s from "./Welcome.module.scss";

type RandomMovieBannerProps = {
    backgroundUrl: string;
};

export const Welcome = ({
    backgroundUrl,
}: RandomMovieBannerProps) => {
    return (
        <section
            className={classNames(s.banner)}
            style={{ backgroundImage: `url(${backgroundUrl})` }}
        >
            <div className="container">
                <div className={s.overlay} />
                <div className={s.content}>
                    <h1 className={s.title}>WELCOME</h1>
                    <p className={s.subtitle}>Browse highlighted titles from TMDB</p>
                    <SearchMovieForm />
                </div>
            </div>
        </section>
    );
};
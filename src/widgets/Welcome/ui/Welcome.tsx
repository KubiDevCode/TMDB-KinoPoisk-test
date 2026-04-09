import classNames from "classnames";
import { SearchMovieForm } from "../../../features/SearchMovieForm/ui/SearchMovieForm";
import styles from "./Welcome.module.scss";

type RandomMovieBannerProps = {
    backgroundUrl: string;
};

export const Welcome = ({
    backgroundUrl,
}: RandomMovieBannerProps) => {
    return (
        <section
            className={classNames(styles.banner)}
            style={{ backgroundImage: `url(${backgroundUrl})` }}
        >
            <div className="container">
                <div className={styles.overlay} />
                <div className={styles.content}>
                    <h1 className={styles.title}>WELCOME</h1>
                    <p className={styles.subtitle}>Browse highlighted titles from TMDB</p>

                    <SearchMovieForm />
                </div>
            </div>
        </section>
    );
};
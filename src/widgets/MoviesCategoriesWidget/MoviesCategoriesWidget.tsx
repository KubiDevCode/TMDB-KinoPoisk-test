import React from "react";
import styles from "./MoviesCategoriesWidget.module.scss";
import classNames from "classnames";

// Рабочие заглушки постеров
const categories = [
    {
        category: "popular",
        title: "Popular Movies",
        movies: [
            { id: 1, title: "Movie 1", posterUrl: "https://picsum.photos/id/1011/200/300" },
            { id: 2, title: "Movie 2", posterUrl: "https://picsum.photos/id/1012/200/300" },
            { id: 3, title: "Movie 3", posterUrl: "https://picsum.photos/id/1013/200/300" },
            { id: 3, title: "Movie 3", posterUrl: "https://picsum.photos/id/1013/200/300" },
            { id: 1, title: "Movie 1", posterUrl: "https://picsum.photos/id/1011/200/300" },
            { id: 2, title: "Movie 2", posterUrl: "https://picsum.photos/id/1012/200/300" },
            { id: 3, title: "Movie 3", posterUrl: "https://picsum.photos/id/1013/200/300" },
        ],
    },
    {
        category: "top_rated",
        title: "Top Rated Movies",
        movies: [
            { id: 4, title: "Movie 4", posterUrl: "https://picsum.photos/id/1015/200/300" },
            { id: 5, title: "Movie 5", posterUrl: "https://picsum.photos/id/1016/200/300" },
            { id: 6, title: "Movie 6", posterUrl: "https://picsum.photos/id/1018/200/300" },
            { id: 4, title: "Movie 4", posterUrl: "https://picsum.photos/id/1015/200/300" },
            { id: 5, title: "Movie 5", posterUrl: "https://picsum.photos/id/1016/200/300" },
            { id: 5, title: "Movie 5", posterUrl: "https://picsum.photos/id/1016/200/300" },
            { id: 6, title: "Movie 6", posterUrl: "https://picsum.photos/id/1018/200/300" },
        ],
    },
    {
        category: "upcoming",
        title: "Upcoming Movies",
        movies: [
            { id: 7, title: "Movie 7", posterUrl: "https://picsum.photos/id/1020/200/300" },
            { id: 8, title: "Movie 8", posterUrl: "https://picsum.photos/id/1024/200/300" },
            { id: 9, title: "Movie 9", posterUrl: "https://picsum.photos/id/1025/200/300" },
            { id: 7, title: "Movie 7", posterUrl: "https://picsum.photos/id/1020/200/300" },
            { id: 8, title: "Movie 8", posterUrl: "https://picsum.photos/id/1024/200/300" },
            { id: 9, title: "Movie 9", posterUrl: "https://picsum.photos/id/1025/200/300" },
            { id: 9, title: "Movie 9", posterUrl: "https://picsum.photos/id/1025/200/300" },
        ],
    },
];

export const MoviesCategoriesWidget = () => {
    return (
        <div className={classNames(styles.widget, 'container')}>
            {categories.map((section) => (
                <section key={section.category} className={styles.section}>
                    <h2 className={styles.title}>{section.title}</h2>

                    <div className={styles.moviesGrid}>
                        {section.movies.map((movie) => (
                            <div key={movie.id} className={styles.movieCard}>
                                <img
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    className={styles.poster}
                                />
                                <p className={styles.movieTitle}>{movie.title}</p>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};
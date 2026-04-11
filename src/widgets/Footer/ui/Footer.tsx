import cls from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={cls.footer}>
            <div className={cls.container}>
                <p className={cls.text}>
                    © 2025 Kinopoisk Demo · Data courtesy of TMDB
                </p>

                <div className={cls.links}>
                    <a
                        className={cls.link}
                        href="https://github.com/KubiDevCode"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
};
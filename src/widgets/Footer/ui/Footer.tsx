import cls from './Footer.module.scss'

export const Footer = () => {
    return (
        <footer className={cls.footer}>
            <div className={cls.container}>
                <p className={cls.text}>
                    © 2026 Movie Explorer · Data courtesy of TMDB.
                </p>

                <a
                    className={cls.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noreferrer"
                >
                    themoviedb.org
                </a>
            </div>
        </footer>
    )
}

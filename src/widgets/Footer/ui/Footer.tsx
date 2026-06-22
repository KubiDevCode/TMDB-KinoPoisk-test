import { Link } from 'react-router-dom'
import { Icon } from '../../../shared/ui/Icon/Icon'
import cls from './Footer.module.scss'

const menuItems = [
    {
        title: 'Home',
        links: [
            { label: 'Overview', path: '/' },
            { label: 'Popular', path: '/movies/popular' },
            { label: 'Search', path: '/search' },
            { label: 'Favorites', path: '/favorites' },
        ],
    },
    {
        title: 'Movies',
        links: [
            { label: 'Popular', path: '/movies/popular' },
            { label: 'Top Rated', path: '/movies/top-rated' },
            { label: 'Upcoming', path: '/movies/upcoming' },
            { label: 'Now Playing', path: '/movies/now-playing' },
        ],
    },
    {
        title: 'Discover',
        links: [
            { label: 'Filters', path: '/filtered-movies' },
            { label: 'Genres', path: '/filtered-movies' },
            { label: 'Ratings', path: '/filtered-movies' },
        ],
    },
    {
        title: 'Data',
        links: [
            { label: 'TMDB', path: 'https://www.themoviedb.org/' },
            { label: 'API Source', path: 'https://developer.themoviedb.org/' },
        ],
    },
]

export const Footer = () => {
    return (
        <footer className={cls.footer}>
            <div className={cls.inner}>
                <nav className={cls.menu} aria-label="Footer navigation">
                    {menuItems.map(({ title, links }) => (
                        <div className={cls.column} key={title}>
                            <h2 className={cls.title}>{title}</h2>
                            <ul className={cls.list}>
                                {links.map((link) => (
                                    <li className={cls.item} key={`${title}-${link.label}`}>
                                        {link.path.startsWith('http') ? (
                                            <a
                                                className={cls.link}
                                                href={link.path}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {link.label}
                                            </a>
                                        ) : (
                                            <Link className={cls.link} to={link.path}>
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className={cls.column}>
                        <h2 className={cls.title}>Connect With Us</h2>
                        <div className={cls.socials}>
                            <a className={cls.socialLink} href="https://www.facebook.com/" aria-label="Facebook">
                                <Icon name="facebook" />
                            </a>
                            <a className={cls.socialLink} href="https://twitter.com/" aria-label="Twitter">
                                <Icon name="twitter" />
                            </a>
                            <a className={cls.socialLink} href="https://www.linkedin.com/" aria-label="LinkedIn">
                                <Icon name="linked-in" />
                            </a>
                        </div>
                    </div>
                </nav>

                <div className={cls.extra}>
                    <p className={cls.copyright}>
                        © <time dateTime="2026">2026</time> StreamVibe. Data courtesy of TMDB.
                    </p>
                    <div className={cls.extraLinks}>
                        <Link className={cls.extraLink} to="/search">Search</Link>
                        <Link className={cls.extraLink} to="/favorites">Favorites</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}


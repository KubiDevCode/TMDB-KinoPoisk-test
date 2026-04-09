import s from './Header.module.scss'
import TMDBLogo from '../../../shared/assets/icons/tmdb.svg?react'
import { Button } from '../../../shared/ui/Button/Button'
import classNames from 'classnames'

const navItems = [
    'Main',
    'Category movies',
    'Filtered movies',
    'Search',
    'Favorites',
]

export const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.container}>
                <a href="/" className={s.logo}>
                    <TMDBLogo className={s.logoIcon} height={70}/>
                </a>

                <nav className={s.nav}>
                    <ul className={s.navList}>
                        {navItems.map((item, index) => (
                            <li key={item} className={s.navItem}>
                                <a
                                    href="/"
                                    className={classNames(s.navLink, {
                                        [s.active]: index === 0,
                                    })}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <Button>☀</Button>
            </div>
        </header>
    )
}
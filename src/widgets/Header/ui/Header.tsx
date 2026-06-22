import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import streamLogo from '../../../shared/assets/stream-logo.svg'
import { Button } from '../../../shared/ui/Button/Button'
import { headerList } from '../model/HeaderList'
import s from './Header.module.scss'

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        document.documentElement.classList.toggle('is-lock', isMenuOpen)

        return () => document.documentElement.classList.remove('is-lock')
    }, [isMenuOpen])

    return (
        <header className={s.header}>
            <div className={classNames(s.inner, 'container')}>
                <Link
                    to="/"
                    className={s.logo}
                    aria-label="StreamVibe home"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <img src={streamLogo} alt="" width={199} height={60} loading="eager" />
                </Link>

                <div className={classNames(s.overlay, isMenuOpen && s.open)}>
                    <nav className={s.menu} aria-label="Main navigation">
                        <ul className={s.menuList}>
                            {headerList.map((navItem) => (
                                <li className={s.menuItem} key={navItem.path}>
                                    <NavLink
                                        to={navItem.path}
                                        end={navItem.path === '/'}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={({ isActive }) => classNames(
                                            s.menuLink,
                                            (isActive || (navItem.path === '/movies/popular' && pathname.startsWith('/movies/'))) && s.active,
                                        )}
                                    >
                                        {navItem.title}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className={s.actions}>
                        <Button
                            className={s.actionButton}
                            mode="transparent"
                            iconName="search"
                            label="Search"
                            isLabelHidden
                            onClick={() => {
                                setIsMenuOpen(false)
                                navigate('/search')
                            }}
                        />
                        <Button
                            className={s.actionButton}
                            mode="transparent"
                            iconName="like"
                            label="Favorites"
                            isLabelHidden
                            onClick={() => {
                                setIsMenuOpen(false)
                                navigate('/favorites')
                            }}
                        />
                    </div>
                </div>

                <button
                    className={classNames(s.burgerButton, isMenuOpen && s.burgerActive)}
                    type="button"
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((current) => !current)}
                >
                    <svg className={s.burgerSvg} width="30" height="30" viewBox="0 0 100 100">
                        <path
                            className={classNames(s.burgerLine, s.line1)}
                            d="M 20,29 H 80 C 80,29 94,29 94,67 94,78 91,82 85,82 80,82 75,75 75,75 L 25,25"
                        />
                        <path className={classNames(s.burgerLine, s.line2)} d="M 20,50 H 80" />
                        <path
                            className={classNames(s.burgerLine, s.line3)}
                            d="M 20,71 H 80 C 80,71 94,71 94,33 94,22 91,18 85,18 80,18 75,25 75,25 L 25,75"
                        />
                    </svg>
                </button>
            </div>
        </header>
    )
}

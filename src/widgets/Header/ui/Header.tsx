import { Link } from 'react-router-dom'
import { NavButtonBox } from '../../../features/NavButtonBox/ui/NavButtonBox'
import { headerList } from '../model/HeaderList'
import s from './Header.module.scss'

export const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.container}>
                <Link to="/" className={s.logo} aria-label="Movie Explorer home">
                    <span className={s.logoMark}>TMDB</span>
                    <span className={s.logoText}>Movie Explorer</span>
                </Link>

                <nav className={s.nav} aria-label="Main navigation">
                    <ul className={s.navList}>
                        {headerList.map((navItem) => (
                            <NavButtonBox buttonItem={navItem} key={navItem.path} />
                        ))}
                    </ul>
                </nav>
                <button
                    type="button"
                    className={s.themeButton}
                    onClick={() => window.dispatchEvent(new Event('tmdb:toggle-theme'))}
                    aria-label="Toggle light and dark theme"
                >
                    Theme
                </button>
            </div>
        </header>
    )
}

import s from './Header.module.scss'
import TMDBLogo from '../../../shared/assets/icons/tmdb.svg?react'
import { Button } from '../../../shared/ui/Button/Button'
import { headerList } from '../model/HeaderList'
import { NavButtonBox } from '../../../features/NavButtonBox/ui/NavButtonBox'


export const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.container}>
                <a href="/" className={s.logo}>
                    <TMDBLogo className={s.logoIcon} height={70} />
                </a>

                <nav className={s.nav}>
                    <ul className={s.navList}>
                        {headerList.map((navItems, index) => (
                            <NavButtonBox buttonItem={navItems} key={index} />
                        ))}
                    </ul>
                </nav>

                <Button>☀</Button>
            </div>
        </header>
    )
}
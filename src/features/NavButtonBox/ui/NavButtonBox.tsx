import { NavLink } from 'react-router-dom'
import s from './NavButtonBox.module.scss'

export type NavButtonItem = {
    title: string
    path: string
}

type NavButtonBoxProps = {
    buttonItem: NavButtonItem
    variant?: 'dark' | 'light'
}

export const NavButtonBox = ({ buttonItem, variant = 'dark' }: NavButtonBoxProps) => {
    return (
        <li className={s.navItem}>
            <NavLink
                to={buttonItem.path}
                className={({ isActive }) => (
                    [
                        s.link,
                        variant === 'light' ? s.light : s.dark,
                        isActive ? s.active : '',
                    ].join(' ')
                )}
                end={buttonItem.path === '/'}
            >
                {buttonItem.title}
            </NavLink>
        </li>
    )
}

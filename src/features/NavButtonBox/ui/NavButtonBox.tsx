import { NavLink } from 'react-router-dom';
import s from './NavButtonBox.module.scss';
import { Button } from '../../../shared/ui/Button/Button';

export interface NavButtonItem {
    title: string
    path: string
}

interface NavButtonBoxProps {
    buttonItem: NavButtonItem
}

export const NavButtonBox = ({ buttonItem }: NavButtonBoxProps) => {
    return (
        <li className={s.navItem}>
            <NavLink
                to={buttonItem.path}
                className={s.link}
                end={buttonItem.path === '/'}
            >
                {({ isActive }) => (
                    <span className={s.buttonWrap}>
                        <Button
                            variant={isActive ? 'contained' : 'outlined'}
                            color="primary"
                        >
                            {buttonItem.title}
                        </Button>
                    </span>
                )}
            </NavLink>
        </li>
    );
};
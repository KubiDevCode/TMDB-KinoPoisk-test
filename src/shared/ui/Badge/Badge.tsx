import classNames from 'classnames'
import type { ReactNode } from 'react'
import { Icon, type IconName } from '../Icon/Icon'
import s from './Badge.module.scss'

type BadgeMode = 'accent'

type BadgeProps = {
    children: ReactNode
    className?: string
    mode?: BadgeMode
    isBig?: boolean
    iconName?: IconName
    iconAriaLabel?: string
}

export const Badge = ({
    children,
    className,
    mode,
    isBig = false,
    iconName,
    iconAriaLabel,
}: BadgeProps) => {
    return (
        <div
            className={classNames(
                s.badge,
                mode && s[mode],
                isBig && s.big,
                className,
            )}
        >
            {iconName && (
                <Icon
                    className={s.icon}
                    name={iconName}
                    ariaLabel={iconAriaLabel}
                />
            )}
            <span>{children}</span>
        </div>
    )
}


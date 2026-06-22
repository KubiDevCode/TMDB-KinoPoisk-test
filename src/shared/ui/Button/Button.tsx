import classNames from 'classnames'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon, type IconName } from '../Icon/Icon'
import s from './Button.module.scss'

type ButtonVariant = 'contained' | 'outlined' | 'text'
type ButtonColor = 'primary' | 'secondary' | 'success' | 'error'
type ButtonMode = '' | 'transparent' | 'black-10' | 'black-08' | 'black-06'

type ButtonProps = {
    children?: ReactNode
    label?: string
    variant?: ButtonVariant
    color?: ButtonColor
    mode?: ButtonMode
    fullWidth?: boolean
    className?: string
    href?: string
    target?: string
    iconName?: IconName
    iconPosition?: 'before' | 'after'
    isLabelHidden?: boolean
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'children'>

export const Button = ({
    children,
    label,
    variant = 'contained',
    color = 'primary',
    mode = '',
    fullWidth = false,
    className,
    type = 'button',
    href,
    target,
    iconName,
    iconPosition = 'before',
    isLabelHidden = false,
    ...restProps
}: ButtonProps) => {
    const visibleContent = children ?? label
    const title = isLabelHidden ? label : undefined
    const icon = iconName && <Icon className={s.icon} name={iconName} />
    const commonClassName = classNames(
        s.button,
        s[variant],
        mode && s[mode],
        color !== 'primary' && s[color],
        fullWidth && s.fullWidth,
        className,
    )

    if (href) {
        return (
            <a
                className={commonClassName}
                href={href}
                target={target}
                title={title}
                aria-label={title}
                {...(restProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                {iconPosition === 'before' && icon}
                {!isLabelHidden && visibleContent && (
                    <span className={s.label}>{visibleContent}</span>
                )}
                {iconPosition === 'after' && icon}
            </a>
        )
    }

    return (
        <button
            type={type}
            className={commonClassName}
            title={title}
            aria-label={title}
            {...restProps}
        >
            {iconPosition === 'before' && icon}
            {!isLabelHidden && visibleContent && (
                <span className={s.label}>{visibleContent}</span>
            )}
            {iconPosition === 'after' && icon}
        </button>
    )
}

import classNames from 'classnames'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import s from './Button.module.scss'

type ButtonVariant = 'contained' | 'outlined' | 'text'
type ButtonColor = 'primary' | 'secondary' | 'success' | 'error'

type ButtonProps = {
    children: ReactNode
    variant?: ButtonVariant
    color?: ButtonColor
    fullWidth?: boolean
    className?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>

export const Button = ({
    children,
    variant = 'contained',
    color = 'primary',
    fullWidth = false,
    className,
    type = 'button',
    ...restProps
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={classNames(
                s.button,
                s[variant],
                color !== 'primary' && s[color],
                fullWidth && s.fullWidth,
                className,
            )}
            {...restProps}
        >
            {children}
        </button>
    )
}

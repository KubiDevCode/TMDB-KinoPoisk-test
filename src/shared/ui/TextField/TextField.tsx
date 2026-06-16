import classNames from 'classnames'
import type { InputHTMLAttributes } from 'react'
import s from './TextField.module.scss'

type TextFieldProps = {
    label?: string
    error?: string
    fullWidth?: boolean
    className?: string
} & InputHTMLAttributes<HTMLInputElement>

export const TextField = ({
    label,
    error,
    fullWidth = false,
    className,
    id,
    ...inputProps
}: TextFieldProps) => {
    const inputId = id ?? inputProps.name ?? label?.toLowerCase().replaceAll(' ', '-')

    return (
        <label className={classNames(s.field, fullWidth && s.fullWidth, className)}>
            {label && <span className={s.label}>{label}</span>}
            <input
                id={inputId}
                className={s.input}
                aria-invalid={Boolean(error)}
                {...inputProps}
            />
            {error && <span className={s.error}>{error}</span>}
        </label>
    )
}

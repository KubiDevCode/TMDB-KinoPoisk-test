import { Button as MButton } from '@mui/material'
import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

type ButtonProps = {
    children: ReactNode
    onClick?: () => void
    variant?: 'contained' | 'outlined' | 'text'
    color?: 'primary' | 'secondary' | 'success' | 'error'
    fullWidth?: boolean
    disabled?: boolean
    className?: string
    sx?: SxProps<Theme>
    type?: 'button' | 'submit' | 'reset'
}

export const Button = (props: ButtonProps) => {
    const {
        children,
        onClick,
        variant = 'contained',
        color = 'primary',
        fullWidth = false,
        disabled = false,
        className,
        sx,
        type = 'button',
    } = props

    return (
        <MButton
            type={type}
            variant={variant}
            color={color}
            fullWidth={fullWidth}
            disabled={disabled}
            onClick={onClick}
            className={className}
            sx={{
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 600,
                padding: '10px 20px',
                ...sx,
            }}
        >
            {children}
        </MButton>
    )
}
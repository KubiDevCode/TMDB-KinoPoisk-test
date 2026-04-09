import { Button as MButton } from '@mui/material'
import type { ReactNode } from 'react'


type ButtonProps = {
    children: ReactNode
    onClick?: () => void
    variant?: 'contained' | 'outlined' | 'text'
    color?: 'primary' | 'secondary' | 'success' | 'error'
    fullWidth?: boolean
    disabled?: boolean
}

export const Button = (props: ButtonProps) => {
    const {
        children,
        onClick,
        variant = 'contained',
        color = 'primary',
        fullWidth = false,
        disabled = false,
    } = props

    return (
        <MButton
            variant={variant}
            color={color}
            fullWidth={fullWidth}
            disabled={disabled}
            onClick={onClick}
            sx={{
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 600,
                padding: '10px 20px',
            }}
        >
            {children}
        </MButton>
    )
}
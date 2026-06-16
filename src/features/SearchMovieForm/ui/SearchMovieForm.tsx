import { useEffect, useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../../../shared/ui/Button/Button'
import { TextField } from '../../../shared/ui/TextField/TextField'
import s from './SearchMovieForm.module.scss'

type SearchMovieFormProps = {
    initialValue?: string
    placeholder?: string
    className?: string
}

export const SearchMovieForm = ({
    initialValue = '',
    placeholder = 'Search for a movie',
    className,
}: SearchMovieFormProps) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const query = value.trim()

        if (!query) {
            navigate('/search')
            return
        }

        const params = new URLSearchParams({
            find: query,
            page: '1',
        })

        navigate(`/search?${params.toString()}`)
    }

    const handleChange = (nextValue: string) => {
        setValue(nextValue)

        if (!nextValue && location.pathname === '/search') {
            navigate('/search')
        }
    }

    return (
        <form className={`${s.form} ${className ?? ''}`} onSubmit={handleSubmit}>
            <TextField
                type="search"
                className={s.input}
                aria-label={placeholder}
                placeholder={placeholder}
                value={value}
                onChange={(event) => handleChange(event.target.value)}
                fullWidth
            />
            <Button type="submit" className={s.button} disabled={!value.trim()}>
                Search
            </Button>
        </form>
    )
}

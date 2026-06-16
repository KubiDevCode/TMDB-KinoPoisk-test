import s from './Pagination.module.scss'

type PaginationProps = {
    page: number
    count: number
    onChange: (page: number) => void
}

const getPageItems = (page: number, count: number) => {
    const pages = new Set([1, count, page - 1, page, page + 1])

    return [...pages]
        .filter((item) => item >= 1 && item <= count)
        .sort((first, second) => first - second)
}

export const Pagination = ({ page, count, onChange }: PaginationProps) => {
    if (count <= 1) {
        return null
    }

    const pages = getPageItems(page, count)

    return (
        <nav className={s.pagination} aria-label="Pagination">
            <button
                type="button"
                className={s.button}
                onClick={() => onChange(page - 1)}
                disabled={page <= 1}
            >
                Prev
            </button>

            {pages.map((item, index) => {
                const previousItem = pages[index - 1]
                const hasGap = previousItem !== undefined && item - previousItem > 1

                return (
                    <span key={item} className={s.pageItem}>
                        {hasGap && <span className={s.ellipsis}>...</span>}
                        <button
                            type="button"
                            className={`${s.button} ${item === page ? s.active : ''}`}
                            onClick={() => onChange(item)}
                            aria-current={item === page ? 'page' : undefined}
                        >
                            {item}
                        </button>
                    </span>
                )
            })}

            <button
                type="button"
                className={s.button}
                onClick={() => onChange(page + 1)}
                disabled={page >= count}
            >
                Next
            </button>
        </nav>
    )
}

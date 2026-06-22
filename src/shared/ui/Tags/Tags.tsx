import s from './Tags.module.scss'

type TagsProps = {
    items: string[]
}

export const Tags = ({ items }: TagsProps) => {
    if (!items.length) {
        return null
    }

    return (
        <ul className={s.list}>
            {items.map((tag) => (
                <li className={s.item} key={tag}>
                    {tag}
                </li>
            ))}
        </ul>
    )
}


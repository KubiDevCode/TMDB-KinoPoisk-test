import s from './SkeletonGrid.module.scss'

type SkeletonGridProps = {
    count?: number
}

export const SkeletonGrid = ({ count = 6 }: SkeletonGridProps) => (
    <div className={s.grid} aria-label="Loading movies">
        {Array.from({ length: count }, (_, index) => (
            <div key={index} className={s.card}>
                <div className={s.poster} />
                <div className={s.line} />
                <div className={s.shortLine} />
            </div>
        ))}
    </div>
)

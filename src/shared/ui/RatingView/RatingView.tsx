import type { CSSProperties } from 'react'
import starsFilled from '../../assets/rating/stars_filled.svg'
import starsUnfilled from '../../assets/rating/stars_unfilled.svg'
import s from './RatingView.module.scss'

type RatingViewProps = {
    value?: number
    label?: string | number
}

export const RatingView = ({ value = 5, label }: RatingViewProps) => {
    const safeValue = Math.max(0, Math.min(value, 5))
    const ariaLabel = `Rating: ${safeValue.toFixed(1)} out of 5`

    return (
        <div
            className={s.ratingView}
            aria-label={ariaLabel}
            title={ariaLabel}
            style={{ '--rating-view-value': safeValue } as CSSProperties}
        >
            <div className={s.stars}>
                <img className={s.unfilled} src={starsUnfilled} width={98} height={18} alt="" />
                <img className={s.filled} src={starsFilled} width={98} height={18} alt="" />
            </div>
            {label !== undefined && <div className={s.label}>{label}</div>}
        </div>
    )
}


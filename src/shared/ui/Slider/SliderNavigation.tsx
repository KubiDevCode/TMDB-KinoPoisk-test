import classNames from 'classnames'
import { Button } from '../Button/Button'
import s from './SliderNavigation.module.scss'

type SliderNavigationProps = {
    className?: string
    mode?: 'tile' | 'rounded' | ''
    position?: 'abs-bottom' | ''
    isHiddenMobile?: boolean
    previousClassName: string
    nextClassName: string
    paginationClassName: string
    hasPagination?: boolean
}

export const SliderNavigation = ({
    className,
    mode = '',
    position = '',
    isHiddenMobile = false,
    previousClassName,
    nextClassName,
    paginationClassName,
    hasPagination = true,
}: SliderNavigationProps) => {
    return (
        <div
            className={classNames(
                s.navigation,
                mode && s[mode],
                position && s.absBottom,
                isHiddenMobile && 'hidden-mobile',
                className,
            )}
        >
            <Button
                className={classNames(s.arrowButton, previousClassName)}
                mode="black-10"
                iconName="arrow-left"
                label="Previous slide"
                isLabelHidden
            />
            {hasPagination && (
                <div className={classNames(s.pagination, paginationClassName)} />
            )}
            <Button
                className={classNames(s.arrowButton, nextClassName)}
                mode="black-10"
                iconName="arrow-right"
                label="Next slide"
                isLabelHidden
            />
        </div>
    )
}

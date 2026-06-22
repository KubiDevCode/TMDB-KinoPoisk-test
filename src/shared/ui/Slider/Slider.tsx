import classNames from 'classnames'
import { Children, type ReactNode, useId, useMemo } from 'react'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { SwiperOptions } from 'swiper/types'
import { SliderNavigation } from './SliderNavigation'
import s from './Slider.module.scss'

import 'swiper/css'

type SliderProps = {
    children: ReactNode
    className?: string
    sliderParams?: SwiperOptions
    hasScrollbarOnMobile?: boolean
    navigationPosition?: 'abs-bottom' | ''
    navigationMode?: 'tile' | 'rounded' | ''
    isNavigationHiddenMobile?: boolean
    isSlideWidthAuto?: boolean
    hasNavigationPagination?: boolean
}

const defaultSliderParams: SwiperOptions = {
    slidesPerView: 5,
    slidesPerGroup: 5,
    spaceBetween: 30,
    breakpoints: {
        0: {
            slidesPerView: 1.35,
            slidesPerGroup: 1,
            spaceBetween: 16,
        },
        481: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 20,
            allowTouchMove: false,
        },
        1441: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 30,
            allowTouchMove: false,
        },
    },
}

export const Slider = ({
    children,
    className,
    sliderParams = defaultSliderParams,
    hasScrollbarOnMobile = true,
    navigationPosition = '',
    navigationMode = '',
    isNavigationHiddenMobile = true,
    isSlideWidthAuto = false,
    hasNavigationPagination = true,
}: SliderProps) => {
    const reactId = useId()
    const instanceId = useMemo(() => reactId.replaceAll(':', ''), [reactId])
    const previousClassName = `slider-prev-${instanceId}`
    const nextClassName = `slider-next-${instanceId}`
    const paginationClassName = `slider-pagination-${instanceId}`
    const scrollbarClassName = `slider-scrollbar-${instanceId}`
    const slides = Children.toArray(children)

    return (
        <div className={classNames(s.slider, isSlideWidthAuto && s.autoWidth, className)}>
            <Swiper
                className={s.swiper}
                modules={[Navigation, Pagination, Scrollbar]}
                navigation={{
                    prevEl: `.${previousClassName}`,
                    nextEl: `.${nextClassName}`,
                }}
                pagination={{
                    el: `.${paginationClassName}`,
                    bulletClass: s.paginationBullet,
                    bulletActiveClass: s.active,
                }}
                scrollbar={hasScrollbarOnMobile ? {
                    el: `.${scrollbarClassName}`,
                    dragClass: s.scrollbarDrag,
                } : false}
                {...sliderParams}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide className={s.item} key={index}>
                        {slide}
                    </SwiperSlide>
                ))}
            </Swiper>

            <SliderNavigation
                className={s.navigation}
                position={navigationPosition}
                mode={navigationMode}
                isHiddenMobile={isNavigationHiddenMobile}
                previousClassName={previousClassName}
                nextClassName={nextClassName}
                paginationClassName={paginationClassName}
                hasPagination={hasNavigationPagination}
            />

            {hasScrollbarOnMobile && (
                <div className={classNames(s.scrollbar, scrollbarClassName, 'visible-mobile')} />
            )}
        </div>
    )
}

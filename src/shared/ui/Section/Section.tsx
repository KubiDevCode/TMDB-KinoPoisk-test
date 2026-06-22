import classNames from 'classnames'
import type { ReactNode } from 'react'
import s from './Section.module.scss'

type SectionProps = {
    children: ReactNode
    title: string
    titleId?: string
    description?: string
    actions?: ReactNode
    className?: string
    bodyClassName?: string
    isActionsHiddenOnMobile?: boolean
}

export const Section = ({
    children,
    title,
    titleId,
    description,
    actions,
    className,
    bodyClassName,
    isActionsHiddenOnMobile = false,
}: SectionProps) => {
    const id = titleId ?? title.toLowerCase().replaceAll(' ', '-')

    return (
        <section className={classNames(s.section, 'container', className)} aria-labelledby={id}>
            <header className={s.header}>
                <div className={s.info}>
                    <h2 className={classNames(s.title, 'h3')} id={id}>
                        {title}
                    </h2>
                    {description && (
                        <div className={s.description}>
                            <p>{description}</p>
                        </div>
                    )}
                </div>
                {actions && (
                    <div className={classNames(s.actions, isActionsHiddenOnMobile && 'hidden-mobile')}>
                        {actions}
                    </div>
                )}
            </header>
            <div className={classNames(s.body, bodyClassName)}>
                {children}
            </div>
        </section>
    )
}


import classNames from 'classnames'
import arrowLeftIcon from '../../assets/stream-icons/arrow-left.svg'
import arrowRightIcon from '../../assets/stream-icons/arrow-right.svg'
import calendarIcon from '../../assets/stream-icons/calendar.svg'
import catalogIcon from '../../assets/stream-icons/catalog.svg'
import clockIcon from '../../assets/stream-icons/clock.svg'
import eyeIcon from '../../assets/stream-icons/eye.svg'
import facebookIcon from '../../assets/stream-icons/facebook.svg'
import genresIcon from '../../assets/stream-icons/genres.svg'
import likeIcon from '../../assets/stream-icons/like.svg'
import linkedInIcon from '../../assets/stream-icons/linked-in.svg'
import notificationIcon from '../../assets/stream-icons/notification.svg'
import playIcon from '../../assets/stream-icons/play.svg'
import plusIcon from '../../assets/stream-icons/plus.svg'
import searchIcon from '../../assets/stream-icons/search.svg'
import starIcon from '../../assets/stream-icons/star.svg'
import translateIcon from '../../assets/stream-icons/translate.svg'
import twitterIcon from '../../assets/stream-icons/twitter.svg'
import volumeIcon from '../../assets/stream-icons/volume.svg'
import s from './Icon.module.scss'

export type IconName =
    | 'arrow-left'
    | 'arrow-right'
    | 'calendar'
    | 'catalog'
    | 'clock'
    | 'eye'
    | 'facebook'
    | 'genres'
    | 'like'
    | 'linked-in'
    | 'notification'
    | 'play'
    | 'plus'
    | 'search'
    | 'star'
    | 'translate'
    | 'twitter'
    | 'volume'

const icons: Record<IconName, string> = {
    'arrow-left': arrowLeftIcon,
    'arrow-right': arrowRightIcon,
    calendar: calendarIcon,
    catalog: catalogIcon,
    clock: clockIcon,
    eye: eyeIcon,
    facebook: facebookIcon,
    genres: genresIcon,
    like: likeIcon,
    'linked-in': linkedInIcon,
    notification: notificationIcon,
    play: playIcon,
    plus: plusIcon,
    search: searchIcon,
    star: starIcon,
    translate: translateIcon,
    twitter: twitterIcon,
    volume: volumeIcon,
}

type IconProps = {
    className?: string
    name: IconName
    ariaLabel?: string
}

export const Icon = ({ className, name, ariaLabel }: IconProps) => {
    return (
        <span
            className={classNames(s.icon, className)}
            aria-label={ariaLabel}
            aria-hidden={ariaLabel ? undefined : true}
            role={ariaLabel ? 'img' : undefined}
        >
            <img src={icons[name]} alt="" className={s.image} />
        </span>
    )
}

import { Footer } from '../../../widgets/Footer';
import { Header } from '../../../widgets/Header';
import s from './FavoritesPage.module.scss';

interface FavoritesPageProps {
    className?: string;
}

export const FavoritesPage = ({ className }: FavoritesPageProps) => {
    return (
        <>
            <Header />
            <Footer />
        </>
    )
};
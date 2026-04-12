import type { MovieSectionModel } from '../../../entities/movie/model/types/movieTypes';
import { useFavoritesFromStorage } from '../../../shared/hooks/useFavorites';
import { Footer } from '../../../widgets/Footer';
import { Header } from '../../../widgets/Header';
import { MoviesCategoriesWidget } from '../../../widgets/MoviesCategoriesWidget';


interface FavoritesPageProps {
    className?: string;
}

export const FavoritesPage = ({ className }: FavoritesPageProps) => {

    const { favoriteMovies, handleToggleFavorite } = useFavoritesFromStorage()

    const sections: MovieSectionModel[] = [
        {
            category: 'favorites',
            title: 'Favorites Movies',
            movies: favoriteMovies,
        },
    ];

    return (
        <div className={className}>
            <Header />
            <MoviesCategoriesWidget
                sections={sections}
                onToggleFavorite={handleToggleFavorite}
            />
            <Footer />
        </div>
    );
};
import { Footer } from "../../../widgets/Footer";
import { Header } from "../../../widgets/Header/index";
import { MoviesCategoriesWidget } from "../../../widgets/MoviesCategoriesWidget/index";
import { Welcome } from "../../../widgets/Welcome/index"


export const MainPage = () => {

    return (
        <>
            <Header />
            <Welcome backgroundUrl={""} />
            <MoviesCategoriesWidget />
            <Footer />
        </>
    );
};
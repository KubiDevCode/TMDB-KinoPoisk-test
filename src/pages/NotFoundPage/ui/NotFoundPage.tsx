import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.scss";
import { Button } from "../../../shared/ui/Button/Button";
import { Header } from "../../../widgets/Header";
import { Footer } from "../../../widgets/Footer";

export const NotFoundPage = () => {
    return (
        <div className={s.page}>
            <Header />
            <main className={s.notFound}>
                <div className={s.content}>
                    <p className={s.code}>404</p>
                    <h1 className={s.title}>Page not found</h1>
                    <p className={s.text}>
                        Sorry, the page you are looking for does not exist or has been moved.
                    </p>

                    <Link to="/" className={s.link}>
                        <Button variant="contained">Go to Home</Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
};

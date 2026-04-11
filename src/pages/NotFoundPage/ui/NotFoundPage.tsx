import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.scss";
import { Button } from "../../../shared/ui/Button/Button";

export const NotFoundPage = () => {
    return (
        <section className={s.notFound}>
            <div className={s.content}>
                <p className={s.code}>404</p>
                <h1 className={s.title}>Page not found</h1>
                <p className={s.text}>
                    Sorry, the page you are looking for does not exist or has been moved.
                </p>

                <Link to="/" className={s.link}>
                    <Button variant="contained">Go to Main Page</Button>
                </Link>
            </div>
        </section>
    );
};
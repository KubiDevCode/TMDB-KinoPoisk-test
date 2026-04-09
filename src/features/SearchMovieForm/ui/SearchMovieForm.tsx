import styles from "./SearchMovieForm.module.scss";
import { TextField } from "../../../shared/ui/TextField/TextField";
import { Button } from "../../../shared/ui/Button/Button";

export const SearchMovieForm = () => {

    return (
        <form className={styles.form} >
            <TextField label='Search for a movie' />
            <Button>
                Search
            </Button>
        </form>
    );
};
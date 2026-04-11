import s from "./SearchMovieForm.module.scss";
import { TextField } from "../../../shared/ui/TextField/TextField";
import { Button } from "../../../shared/ui/Button/Button";

export const SearchMovieForm = () => {

    return (
        <form className={s.form} >
            <TextField label='Search for a movie' 
                sx={{
                    "& .MuiInputLabel-root": {
                        color: "primary.main",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "primary.main",
                    },

                    "& .MuiInputBase-input": {
                        color: "primary.main",
                    },

                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "primary.main",
                    },

                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "primary.dark",
                    },

                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "primary.main",
                    },
                }}
            />
            <Button>
                Search
            </Button>
        </form>
    );
};
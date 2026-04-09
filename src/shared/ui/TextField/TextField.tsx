import { TextField as MTextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField"

export const TextField = (props: TextFieldProps) => {
    return <MTextField {...props} />;
};
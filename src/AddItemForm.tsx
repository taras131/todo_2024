import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type TProps = {
    addItem: (title: string) => void
}
const errorMessage = "Title is required"
const AddItemForm: FC<TProps> = ({addItem}) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const addTask = (e: any) => {
        e.preventDefault()
        console.log(title)
        if (title.trim() !== "") {
            addItem(title.trim());
            setTitle("");
        } else {
            setError(errorMessage);
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask(e);
        }
    }
    const styles = {
        maxWidth: "39px",
        minWidth: "39px",
        minHeight: "39px",
        maxHeight: "39px",
    }
    return (
        <form>
            <TextField value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                     /*  className={error ? "error" : ""}*/
                       label={error ? error : "type something"}
                       variant="outlined"
                       size={"small"}
                       error={!!error}
            />
            <Button size={"small"}
                    variant={"contained"}
                    onClick={addTask}
                    sx={styles}>
                +
            </Button>
        </form>
    );
};

export default AddItemForm;
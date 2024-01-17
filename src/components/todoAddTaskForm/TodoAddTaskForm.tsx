import React, {FC, useState} from 'react';
import Button from "../button/Button";
import {ITask} from "../../models/ITask";
import {v1} from "uuid";
import styles from "./TodoAddTaskForm.module.css"

type PropsType = {
    addTask: (newTask: ITask) => void,
}

const TodoAddTaskForm: FC<PropsType> = ({addTask}) => {
    const [inputValue, setInputValue] = useState("")
    const [error, setError] = useState("")
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        setInputValue(e.target.value)
    }
    const validateInput = () => {
        if (inputValue.trim().length < 3) {
            setError("не менее 3 символов")
            return false;
        }
        if (inputValue.trim().length > 15) {
            setError("не более 15 символов")
            return false;
        }
        return true
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        validateInput();
        if (validateInput()) {
            addTask({
                id: v1(),
                title: inputValue.trim(),
                isDone: false,
            });
            setInputValue("");
        }
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.form_main}>
                <input value={inputValue} onChange={handleInputChange} className={error ? styles.input_error : ""}/>
                <Button>
                    +
                </Button>
            </div>
            {error && (<span className={styles.error}>{error}</span>)}
        </form>
    );
};

export default TodoAddTaskForm;
import React, {FC, useState} from 'react';
import styles from "./TodoAddTaskForm.module.css"
import Button from "../button/Button";
import {ITask} from "../../models/ITask";

type PropsType ={
    addTask: (newTask: ITask) => void,
}

const TodoAddTaskForm: FC<PropsType> = ({addTask}) => {
    const [inputValue, setInputValue] = useState("")
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        addTask({
            id: crypto.randomUUID(),
            title: inputValue,
            isDone: false,
        })
        setInputValue("")
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input value={inputValue} onChange={handleInputChange}/>
            <Button handleClick={() => {
            }} isDisabled={inputValue.length < 3}>
                +
            </Button>
        </form>
    );
};

export default TodoAddTaskForm;
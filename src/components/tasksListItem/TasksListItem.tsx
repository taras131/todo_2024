import React, {FC} from 'react';
import {ITask} from "../../models/ITask";
import Button from "../button/Button";
import styles from "./TasksListItem.module.css";

type PropsType = {
    task: ITask
    handleRemoveTaskClick: () => void
    handleChangeCompletedTask: () => void,
}

const TasksListItem: FC<PropsType> = ({task, handleRemoveTaskClick, handleChangeCompletedTask}) => {
    return (
        <li className={styles.taskItem}>
            <input type="checkbox" checked={task.isDone} onChange={handleChangeCompletedTask}/>
            <span>{task.title}</span>
            <Button handleClick={handleRemoveTaskClick}>
                X
            </Button>
        </li>
    );
};

export default TasksListItem;
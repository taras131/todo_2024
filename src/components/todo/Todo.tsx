import React, {FC} from 'react';
import TodoHeader from "../todoHeader/TodoHeader";
import TodoAddTaskForm from "../todoAddTaskForm/TodoAddTaskForm";
import TasksList from "../tasksList/TasksList";
import {ITask} from "../../models/ITask";
import styles from "./Todo.module.css"


type PropsType = {
    title: string,
    tasks: ITask [],
    addTask: (newTask: ITask) => void,
    removeTask: (id: string) => () => void,
    changeCompletedTask: (id: string) => () => void,
}

const Todo: FC<PropsType> = ({title, tasks,addTask, removeTask, changeCompletedTask}) => {
    return (
        <div className={styles.todoList}>
            <TodoHeader title={title}/>
            <TodoAddTaskForm addTask={addTask}/>
            {tasks.length
                ? (<TasksList tasks={tasks} removeTask={removeTask} changeCompletedTask={changeCompletedTask}/>)
                : (<p>Пока нет задач</p>)}
        </div>
    );
};

export default Todo;
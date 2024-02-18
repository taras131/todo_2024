import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (newFilterValues: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean) => void
    filter: FilterValuesType
    removeTodolist: () => void
    changeTaskTitle: (taskId: string, title: string) => void
    changeTodoListTitle: (title: string) => void
}

export function Todolist(props: PropsType) {
    let filteredTasks = props.tasks
    switch (props.filter) {
        case "active":
            filteredTasks = props.tasks.filter(task => !task.isDone)
            break;
        case "completed":
            filteredTasks = props.tasks.filter(task => task.isDone)
            break;
        default:
            filteredTasks = props.tasks
    }
    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");
    const onAddTaskHandler = (title: string) => {
        props.addTask(title)
    };


    const onClickHandler = (taskId: string) => () => {
        props.removeTask(taskId)
    }
    const onChangeHandler = (taskId: string) => (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(taskId, e.currentTarget.checked);
    }
    const onChangeTaskTitleHandler = (taskId: string) => (title: string) => {
        props.changeTaskTitle(taskId, title)
    };
    return <div>
        <h3>
            <EditableSpan title={props.title}
                          onChangeHandler={props.changeTodoListTitle}/>
            <IconButton aria-label="delete" onClick={props.removeTodolist}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={onAddTaskHandler}/>
        <ul>
            {
                filteredTasks.map(t => {
                    return (
                        <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox
                                checked={t.isDone}
                                onChange={onChangeHandler(t.id)}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                            />
                            <EditableSpan title={t.title}
                                          onChangeHandler={onChangeTaskTitleHandler(t.id)}/>
                            <IconButton size={"small"} aria-label="delete" onClick={onClickHandler(t.id)}>
                                <DeleteIcon/>
                            </IconButton>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "contained"}
                    onClick={onAllClickHandler}
                    color={"error"}>
                All
            </Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"}
                    onClick={onActiveClickHandler}
                    color={"primary"}>
                Active
            </Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"}
                    onClick={onCompletedClickHandler}
                    color={"success"}>
                Completed
            </Button>
        </div>
    </div>
}

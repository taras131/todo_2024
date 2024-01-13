import React, {FC, useState} from 'react';
import {ITask} from "../../models/ITask";
import TasksListItem from "../tasksListItem/TasksListItem";
import TasksListFilter from "../tasksListFilter/TasksListFilter";
import {FilterTasksEnum} from "../../utils/consts";

type PropsType = {
    tasks: ITask [],
    removeTask: (id: string) => () => void
    changeCompletedTask: (id: string) => () => void,
}

const TasksList: FC<PropsType> = ({tasks, removeTask, changeCompletedTask}) => {
    const [filter, setFilter] = useState<FilterTasksEnum>(FilterTasksEnum.all)
    const handleFilterChange = (newValue: FilterTasksEnum) => () => {
        setFilter(newValue)
    }
    let filteredTask = tasks
    switch (filter) {
        case (FilterTasksEnum.completed):
            filteredTask = tasks.filter(task => task.isDone);
            break;
        case (FilterTasksEnum.active):
            filteredTask = tasks.filter(task => !task.isDone);
            break;

    }
    const tasksList = filteredTask.map(task => (<TasksListItem key={task.id}
                                                               task={task}
                                                               handleRemoveTaskClick={removeTask(task.id)}
                                                               handleChangeCompletedTask={changeCompletedTask(task.id)}/>))
    return (
        <>
            <TasksListFilter filter={filter} handleFilterChange={handleFilterChange}/>
            <ul>
                {tasksList.length
                    ? tasksList
                    : (<span>измените условия фильтрации</span>)}
            </ul>
        </>
    );
};

export default TasksList;
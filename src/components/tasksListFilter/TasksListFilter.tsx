import React, {FC} from 'react';
import Button from "../button/Button";
import {FilterTasksEnum} from "../../utils/consts";
import styles from "./TasksListFilter.module.css"

type PropsType = {
    filter: FilterTasksEnum
    handleFilterChange: (newValue: FilterTasksEnum) => () => void
}

const TasksListFilter: FC<PropsType> = ({filter, handleFilterChange}) => {
    return (
        <div className={styles.filter}>
            <Button handleClick={handleFilterChange(FilterTasksEnum.all)}
                    isActive={filter === FilterTasksEnum.all}>
                All
            </Button>

            <Button handleClick={handleFilterChange(FilterTasksEnum.active)}
                    isActive={filter === FilterTasksEnum.active}>
                Active
            </Button>
            <Button handleClick={handleFilterChange(FilterTasksEnum.completed)}
                    isActive={filter === FilterTasksEnum.completed}>
                Completed
            </Button>
        </div>
    );
};

export default TasksListFilter;
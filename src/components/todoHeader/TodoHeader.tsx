import React, {FC} from 'react';
import styles from "./TodoHeader.module.css"

type PropsType = {
    title: string,
}

const TodoHeader: FC<PropsType> = ({title}) => {
    return (
        <div className={styles.todoHeader}>
            <h3>{title}</h3>
        </div>
    );
};

export default TodoHeader;
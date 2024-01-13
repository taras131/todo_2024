import React, {useState} from 'react';
import Todo from "../todo/Todo";
import {ITask} from "../../models/ITask";
import styles from "./App.module.css"

const todoListTitle: string = "What to learn";
const tasksData: ITask [] = [
    {id: crypto.randomUUID(), title: "HTML&CSS", isDone: true},
    {id: crypto.randomUUID(), title: "JS", isDone: true},
    {id: crypto.randomUUID(), title: "React", isDone: false},
]

function App() {
    const [tasks, setTasks] = useState<ITask []>(tasksData)
    const addTask = (newTask: ITask) => {
        setTasks(prev => [...prev, newTask])
    }
    const removeTask = (id: string) => () => {
        setTasks(prev => [...prev.filter(task => task.id !== id)])
    }
    const changeCompletedTask = (id: string) => () => {
        setTasks(prev => [...prev.map(task => {
            if (task.id === id) {
                return {...task, isDone: !task.isDone}
            } else {
                return task
            }
        })])
    }
    return (
        <div className={styles.app}>
            <Todo title={todoListTitle}
                  tasks={tasks}
                  addTask={addTask}
                  removeTask={removeTask}
                  changeCompletedTask={changeCompletedTask}/>
        </div>
    );
}

export default App;

import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = { id: string, title: string, filter: FilterValuesType }
type TasksType = {
    [key: string]: TaskType[]
}

function App() {
    const todolistID1 = v1()
    const todolistID2 = v1()
    const [todoLists, setTodoLists] = useState<TodoListType []>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])
    const [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true}, {id: v1(), title: "JS", isDone: true}, {
                id: v1(),
                title: "ReactJS",
                isDone: false
            }, {id: v1(), title: "Rest API", isDone: false}, {id: v1(), title: "GraphQL", isDone: false},],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false}, {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });
    const addTask = (todoListId: string) => (title: string) => {
        setTasks(prev => ({
            ...prev, [todoListId]: [...prev[todoListId], {
                id: v1(),
                title: title,
                isDone: false
            }]
        }))
    }
    const changeTaskStatus = (todoListId: string) => (taskId: string, newStatus: boolean) => {
        setTasks(prev => ({
            ...prev,
            [todoListId]: prev[todoListId].map(task => task.id === taskId ? {...task, isDone: newStatus} : task)
        }))
    }
    const removeTask = (todoListId: string) => (taskId: string) => {
        setTasks(prev => ({...prev, [todoListId]: prev[todoListId].filter(task => task.id !== taskId)}))
    }
    const changeFilter = (todoListId: string) => (newFilterValues: FilterValuesType) => {
        setTodoLists(prev => prev.map(todoList => {
            return todoListId === todoList.id ? {...todoList, filter: newFilterValues} : todoList
        }))
    }
    const removeTodolist = (todoListId: string) => () => {
        setTodoLists(prev => (prev.filter(el => el.id !== todoListId)));
        delete tasks[todoListId]
    }
    return (
        <div className="App">
            {todoLists.map((el) => {
                return (
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={tasks[el.id]}
                        filter={el.filter}
                        removeTask={removeTask(el.id)}
                        changeFilter={changeFilter(el.id)}
                        addTask={addTask(el.id)}
                        changeTaskStatus={changeTaskStatus(el.id)}
                        removeTodolist={removeTodolist(el.id)}
                    />
                )
            })}


        </div>
    );
}

export default App;

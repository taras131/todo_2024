import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import Header from "./Header";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, setTaskAC, tasksReducer} from "./tasksReducer";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = { id: string, title: string, filter: FilterValuesType }
export type TasksType = {
    [key: string]: TaskType[]
}

function App() {
    const todolistID1 = v1()
    const todolistID2 = v1()
    const [todoLists, setTodoLists] = useState<TodoListType []>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
            [todolistID1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todolistID2]: [
                {id: v1(), title: "HTML&CSS2", isDone: true},
                {id: v1(), title: "JS2", isDone: true},
                {id: v1(), title: "ReactJS2", isDone: false},
                {id: v1(), title: "Rest API2", isDone: false}, {id: v1(), title: "GraphQL2", isDone: false},
            ]
        }
    )
    const addTask = (todoListId: string) => (title: string) => {
        dispatchTasks(addTaskAC(todoListId, title))
    }
    const changeTaskStatus = (todoListId: string) => (taskId: string, newStatus: boolean) => {
        dispatchTasks(changeTaskStatusAC(todoListId, taskId, newStatus))
    }
    const changeTaskTitle = (todoListId: string) => (taskId: string, title: string) => {
        dispatchTasks(changeTaskTitleAC(todoListId, taskId, title))
    }
    const changeTodoListTitle = (todoListId: string) => (title: string) => {
        setTodoLists(prev => prev.map(el => el.id === todoListId ? {...el, title: title} : el))
    }
    const removeTask = (todoListId: string) => (taskId: string) => {
        dispatchTasks(removeTaskAC(todoListId, taskId))
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
    const addTodoList = (title: string) => {
        const newTodoList: TodoListType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodoLists(prev => ([newTodoList, ...prev]))
        dispatchTasks(setTaskAC(newTodoList.id, []))
    }
    return (
        <div className="App">
            <Header/>
            <Container fixed>
                <Grid container spacing={4} sx={{margin: "20px 0"}}>
                    <Grid item>
                        <AddItemForm addItem={addTodoList}/>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    {todoLists.map((el) => {
                        return (
                            <Grid item key={el.id}>
                                <Paper elevation={3} sx={{padding: "20px"}}>
                                    <Todolist
                                        todolistId={el.id}
                                        title={el.title}
                                        tasks={tasks[el.id]}
                                        filter={el.filter}
                                        removeTask={removeTask(el.id)}
                                        changeFilter={changeFilter(el.id)}
                                        addTask={addTask(el.id)}
                                        changeTaskStatus={changeTaskStatus(el.id)}
                                        removeTodolist={removeTodolist(el.id)}
                                        changeTaskTitle={changeTaskTitle(el.id)}
                                        changeTodoListTitle={changeTodoListTitle(el.id)}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

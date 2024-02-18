import {v1} from "uuid";
import {TasksType} from "./App";
import {TaskType} from "./Todolist";



export const tasksReducer = (state: TasksType, action: TasksReducerActionType): TasksType => {
    switch (action.type) {
        case "REMOVE_TASK":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId]
                    .filter(task => task.id !== action.payload.taskId)
            }
        case "ADD_TASK":
            return {
                ...state, [action.payload.todoListId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todoListId]]
            }
        case "CHANGE_TASK_STATUS":
            return {
                ...state,
                [action.payload.todoListId]:
                    state[action.payload.todoListId].map(task => task.id === action.payload.taskId
                        ? {...task, isDone: action.payload.newStatus}
                        : task)
            }
        case "CHANGE_TASK_TITLE":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    title: action.payload.title
                } : task)
            }
        case "SET_TASKS":
            return {
                ...state, [action.payload.todoListId]: action.payload.tasks
            }
        default:
            return state
    }
}
type TasksReducerActionType = RemoveTaskType | AddTaskType | ChangeTaskStatusType | ChangeTaskTitleType | SetTasksType
type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
type SetTasksType = ReturnType<typeof setTaskAC>

export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: "REMOVE_TASK",
        payload: {
            todoListId, taskId
        }
    } as const
}
export const addTaskAC = (todoListId: string, title: string) => {
    return {
        type: "ADD_TASK",
        payload: {todoListId, title}
    } as const
}
export const changeTaskStatusAC = (todoListId: string, taskId: string, newStatus: boolean) => {
    return {
        type: "CHANGE_TASK_STATUS",
        payload: {todoListId, taskId, newStatus}
    } as const
}
export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string) => {
    return {
        type: "CHANGE_TASK_TITLE",
        payload: {todoListId, taskId, title}
    } as const
}
export const setTaskAC = (todoListId: string, tasks: TaskType[]) => {
    return {
        type: "SET_TASKS",
        payload: {todoListId, tasks}
    } as const
}
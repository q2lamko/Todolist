import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type removeTaskType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type addTaskType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type changeTaskStatusType = {
    type: 'CHANGE-STATUS'
    taskId: string
    todolistId: string
    isDone: boolean
}
export type changeTaskTitleType = {
    type: 'CHANGE-TITLE'
    taskId: string
    todolistId: string
    title: string
}


export type ActionTypes =
    removeTaskType
    | addTaskType
    | changeTaskStatusType
    | changeTaskTitleType
    | AddTodolistActionType
| RemoveTodolistActionType


export const tasksReducer = (state: TasksStateType, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false};
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case "CHANGE-STATUS": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone;

            }
            return stateCopy
        }
        case "CHANGE-TITLE": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title;

            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error("I don't understand this type")
    }

}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): addTaskType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusType => {
    return {type: 'CHANGE-STATUS', taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleType => {
    return {type: 'CHANGE-TITLE', taskId, title, todolistId}
}


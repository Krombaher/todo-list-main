import {TasksStateType} from "../../App";
import {v1} from "uuid";

type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskTitleAT | ChangeTaskStatusAT | AddEmptyTaskAT | RemoveTaskListAT

type RemoveTaskAT = {
    type: 'REMOVE_TASK'
    todoListId: string
    taskId: string
}

type AddTaskAT = {
    type: 'ADD_TASK'
    todoListId: string
    title: string
}

type ChangeTaskTitleAT = {
    type: 'CHANGE_TASK_TITLE'
    todoListId: string
    taskId: string
    title: string
}

type ChangeTaskStatusAT = {
    type: 'CHANGE_TASK_STATUS'
    todoListId: string
    taskId:string
    newIsDone: boolean
}

type AddEmptyTaskAT = {
    type:'ADD_EMPTY_TASK'
    todoListId: string
}

type RemoveTaskListAT = {
    type:'REMOVE_TASK_LIST'
    todoListId: string
}

const REMOVE_TASK = 'REMOVE_TASK'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
const ADD_EMPTY_TASK = 'ADD_EMPTY_TASK'
const REMOVE_TASK_LIST = 'REMOVE_TASK_LIST'

export const taskReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case ADD_TASK:
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}

        case REMOVE_TASK:
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}

        case CHANGE_TASK_TITLE:
            return {...state, [action.todoListId]: state[action.todoListId]
                    .map(el => el.id === action.taskId ? {...el, title: action.title} : el)}

        case CHANGE_TASK_STATUS:
            return {...state, [action.todoListId]: state[action.todoListId]
                    .map(el => el.id === action.taskId ? {...el, isDone: action.newIsDone} : el)}

        case ADD_EMPTY_TASK:
            return {...state, [action.todoListId]: []}

        case REMOVE_TASK_LIST:
            let newState = {...state}
            delete newState[action.todoListId]
            return newState

        default:
            return state
    }
}

export const addTaskAC = (todoListId: string, title: string):AddTaskAT => {
    return {type: ADD_TASK, todoListId, title}
}

export const removeTaskAC = (todoListId: string, taskId: string):RemoveTaskAT => {
    return {type: REMOVE_TASK, todoListId, taskId}
}

export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string):ChangeTaskTitleAT => {
    return {type: CHANGE_TASK_TITLE, todoListId, taskId, title}
}

export const changeTaskStatusAC = (todoListId: string, taskId: string, newIsDone: boolean):ChangeTaskStatusAT => {
    return {type: CHANGE_TASK_STATUS, todoListId, taskId, newIsDone}
}

export const addEmptyTaskAC = (todoListId: string):AddEmptyTaskAT => {
    return {type: ADD_EMPTY_TASK, todoListId}
}

export const removeTaskListAC = (todoListId: string):RemoveTaskListAT => {
    return {type: REMOVE_TASK_LIST, todoListId}
}


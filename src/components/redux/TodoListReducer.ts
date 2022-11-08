import {FilterValuesType, TodoListType} from "../../App";

type ActionType =
    RemoveTodoListAT | RemoveTodoListTitleAT | AddTodoListAT |ChangeTodoListFilterAT

type RemoveTodoListAT = {
    type: 'REMOVE_TODOLIST'
    todoListId: string
}

type RemoveTodoListTitleAT = {
    type: 'REMOVE_TODOLIST_TITLE'
    todoListId: string
    title: string
}

type AddTodoListAT = {
    type: 'ADD_TODOLIST'
    todoListId: string
    title: string
}

type ChangeTodoListFilterAT = {
    type: 'CHANGE_TODOLIST_FILTER'
    todoListId: string
    filter: FilterValuesType
}

const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const REMOVE_TODOLIST_TITLE = 'REMOVE_TODOLIST_TITLE'
const ADD_TODOLIST = 'ADD_TODOLIST'
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'

export const todoListReducer = (state: TodoListType[], action: ActionType): TodoListType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(el => el.id !== action.todoListId)

        case REMOVE_TODOLIST_TITLE:
            return state.map(el => el.id === action.todoListId ? {...el, title: action.title} : el)

        case ADD_TODOLIST:
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: 'all',
            }

            return [newTodoList, ...state]

        case CHANGE_TODOLIST_FILTER:
            return state.map(el => el.id === action.todoListId ? {...el, filter: action.filter} : el)

        default:
            return state
    }
}

export const removeTodoListAC = (todoListId: string): RemoveTodoListAT => {
    return {type: REMOVE_TODOLIST, todoListId}
}

export const removeTodoListTitleAC = (todoListId: string, title: string): RemoveTodoListTitleAT => {
    return {type: REMOVE_TODOLIST_TITLE, todoListId, title}
}

export const addTodoListAC = (todoListId: string, title: string): AddTodoListAT => {
    return {type: ADD_TODOLIST, todoListId, title}
}

export const changeTodoListFilterAC = (todoListId: string, filter:FilterValuesType):ChangeTodoListFilterAT => {
    return {type: CHANGE_TODOLIST_FILTER, todoListId, filter}
}
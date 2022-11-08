import {v1} from 'uuid'
import {TodoListType} from "../../App";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    removeTodoListAC,
    removeTodoListTitleAC,
    todoListReducer
} from "./TodoListReducer";

test('remove todolist', () => {
    let todoListId_1 = v1()
    let todoListId_2 = v1()

    const startState: TodoListType[] = [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListReducer(startState, removeTodoListAC(todoListId_1))

    expect(endState).not.toBe(startState)
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId_2)
})

test('remove todolist title', () => {
    let todoListId_1 = v1()
    let todoListId_2 = v1()

    const startState: TodoListType[] = [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ]

    const newTitle = 'Hello i am Test'
    const endState = todoListReducer(startState, removeTodoListTitleAC(todoListId_1, newTitle))

    expect(endState).not.toBe(startState)
    expect(endState[0].title).toBe(newTitle)
})

test('add new todolist ', () => {
    let todoListId_1 = v1()
    let todoListId_2 = v1()
    let todoListId_3 = v1()

    const startState: TodoListType[] = [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ]

    const newTodoListTitle = 'What to sell'
    const endState = todoListReducer(startState, addTodoListAC(todoListId_3, newTodoListTitle))

    expect(endState).not.toBe(startState)
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodoListTitle)
    expect(endState[0].id).toBe(todoListId_3)
})

test('change todolist filter ', () => {
    let todoListId_1 = v1()
    let todoListId_2 = v1()

    const startState: TodoListType[] = [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListReducer(startState, changeTodoListFilterAC(todoListId_1, 'active'))

    expect(endState).not.toBe(startState)
    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('active')
})
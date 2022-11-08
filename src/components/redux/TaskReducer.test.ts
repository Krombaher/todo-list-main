import {v1} from "uuid";
import {TasksStateType} from "../../App";
import {
    addEmptyTaskAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, removeTaskListAC,
    taskReducer
} from "./TaskReducer";

test('add task', () => {
    let todoListId_1 = v1()
    let taskId_1 = v1()
    let taskId_2 = v1()
    let taskId_3 = v1()

    const startState: TasksStateType = {
        [todoListId_1]: [
            {id: taskId_1, title: "HTML&CSS", isDone: true},
            {id: taskId_2, title: "JS/TS", isDone: true},
            {id: taskId_3, title: "JS/TS", isDone: true},
        ]
    }

    const endState = taskReducer(startState, addTaskAC(todoListId_1, "REACT"))

    expect(endState).not.toBe(startState)
    expect(endState[todoListId_1].length).toBe(4)
})


test('remove task', () => {
    let todoListId_1 = v1()
    let taskId_1 = v1()
    let taskId_2 = v1()
    let taskId_3 = v1()

    const startState: TasksStateType = {
        [todoListId_1]: [
            {id: taskId_1, title: "HTML&CSS", isDone: true},
            {id: taskId_2, title: "JS/TS", isDone: true},
            {id: taskId_3, title: "JS/TS", isDone: true},
        ]
    }

    const endState = taskReducer(startState, removeTaskAC(todoListId_1, taskId_1))

    expect(endState).not.toBe(startState)
    expect(endState[todoListId_1].length).toBe(2)
})

test('change task title ', () => {
    let todoListId_1 = v1()
    let taskId_1 = v1()
    let taskId_2 = v1()
    let taskId_3 = v1()

    const startState: TasksStateType = {
        [todoListId_1]: [
            {id: taskId_1, title: "HTML&CSS", isDone: true},
            {id: taskId_2, title: "JS/TS", isDone: true},
            {id: taskId_3, title: "JS/TS", isDone: true},
        ]
    }

    const endState = taskReducer(startState, changeTaskTitleAC(todoListId_1, taskId_1, 'REDUX'))

    expect(endState).not.toBe(startState)
    expect(endState[todoListId_1][0].title).toBe("REDUX")
    expect(endState[todoListId_1].length).toBe(3)
})

test('change task status ', () => {
    let todoListId_1 = v1()
    let taskId_1 = v1()
    let taskId_2 = v1()
    let taskId_3 = v1()

    const startState: TasksStateType = {
        [todoListId_1]: [
            {id: taskId_1, title: "HTML&CSS", isDone: true},
            {id: taskId_2, title: "JS/TS", isDone: true},
            {id: taskId_3, title: "JS/TS", isDone: true},
        ]
    }

    const endState = taskReducer(startState, changeTaskStatusAC(todoListId_1, taskId_1, false))

    expect(endState).not.toBe(startState)
    expect(endState[todoListId_1][0].isDone).toBe(false)
})

test('add an empty task in todolist ', () => {
    let todoListId_1 = v1()
    let taskId_1 = v1()

    const startState: TasksStateType = {
        [todoListId_1]: []
    }

    const endState = taskReducer(startState, addEmptyTaskAC(todoListId_1))

    expect(endState).not.toBe(startState)
    expect(endState[todoListId_1].length).toBe(0)
})

test('remove task and todolist ', () => {
    let todoListId_1 = v1()
    let todoListId_2 = v1()
    let taskId_1 = v1()
    let taskId_2 = v1()

    const startState: TasksStateType = {
        [todoListId_1]: [
            {id: taskId_1, title: "REACT", isDone: true},
        ],
        [todoListId_2]: [
            {id: taskId_2, title: "HTML&CSS", isDone: true},
        ]
    }

    const endState = taskReducer(startState, removeTaskListAC(todoListId_1))

    expect(endState[todoListId_1]).not.toBeDefined()
    expect(endState[todoListId_2]).toBeDefined()
})
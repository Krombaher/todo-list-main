import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./components/Toodolist";
import {v1} from "uuid";
import {Header} from "./components/Header";
import s from "./components/css/Todolist.module.css";
import {ButtonAppBar} from "./components/NavBar";
import {
    addTodoListAC,
    changeTodoListFilterAC, removeTodoListAC,
    removeTodoListTitleAC,
    todoListReducer
} from "./components/redux/TodoListReducer";
import {
    addEmptyTaskAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, removeTaskListAC,
    taskReducer
} from "./components/redux/TaskReducer";

//Type
export type FilterValuesType = "all" | "active" | "completed";
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string,
    title: string
    filter: FilterValuesType
    // isOpen: boolean
}
export type TasksStateType = {
    [todoListId: string]: TaskType[]
}


function App() {
    // BLL:
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, dispatch] = useReducer(todoListReducer, [
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"}
    ])

    const [tasks, dispatchTask] = useReducer(taskReducer, {
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "RTK", isDone: false},
        ],

        [todoListId_2]: [
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Toilet paper", isDone: false},
            {id: v1(), title: "Buckwheat", isDone: false},
            {id: v1(), title: "Meet", isDone: false},
        ]
    })

    //TodoList

    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatch(removeTodoListTitleAC(title, todoListId))
    }

    const addTodoList = (title: string) => {
        if (title !== '') {
            let newTodolistID = v1();
            dispatch(addTodoListAC(newTodolistID, title))
            dispatchTask(addEmptyTaskAC(newTodolistID))
        }
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatch(changeTodoListFilterAC(todoListId, filter))
    }

    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
        dispatchTask(removeTaskListAC(todoListId))
    }

    //Task

    const changeTaskTitle = (title: string, todoListId: string, taskId: string) => {
        dispatchTask(changeTaskTitleAC(title, todoListId, taskId))
    }

    const addTask = (title: string, todoListId: string) => {
        dispatchTask(addTaskAC(title, todoListId))
    }

    const removeTask = (taskId: string, todoListId: string) => {
        dispatchTask(removeTaskAC(taskId, todoListId))
    }

    const changeIsDone = (todoListId: string, taskId: string, newIsDone: boolean) => {
        dispatchTask(changeTaskStatusAC(todoListId, taskId, newIsDone))
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType) => {
        let tasksForTodoList = tasks;
        if (filter === "active") {
            tasksForTodoList = tasks.filter(t => !t.isDone)
        }
        if (filter === "completed") {
            tasksForTodoList = tasks.filter(t => t.isDone)
        }
        return tasksForTodoList
    }

    const todoListComponents = todoLists.map(tl => {
        return (
            <Todolist
                key={tl.id}
                todoListId={tl.id}
                nameTitle={tl.title}
                tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                filter={tl.filter}
                removeTask={removeTask}
                addTask={addTask}
                changeIsDone={changeIsDone}
                changeTodoListFilter={changeTodoListFilter}
                removeTodoList={removeTodoList}
                changeTodoListTitle={changeTodoListTitle}
                changeTaskTitle={changeTaskTitle}
            />
        )
    })

    return (
        <div className={s.app}>
            <ButtonAppBar/>
            <Header addTodoList={addTodoList}/>
            <div className={s.todoListSection}>
                {todoListComponents}
            </div>
        </div>
    );
}

export default App;

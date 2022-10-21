import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Toodolist";
import {v1} from "uuid";
import {Header} from "./components/Header";
import s from "./components/css/Todolist.module.css";
import {ButtonAppBar} from "./components/NavBar";
import {Paper} from "@mui/material";

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
    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
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

    // Function

    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title} : tl))
    }

    const changeTaskTitle = (title: string, todoListId: string, id: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(el => el.id === id ? {...el, title: title} : el)
        })
    }

    const addTodoList = (title: string) => {
        let id = v1();
        const newTodo: TodoListType = {
            id,
            title: title,
            filter: 'all',
        }

        setTodoLists([newTodo, ...todoLists])
        setTasks({...tasks, [id]: []})
    }

    const addTask = (title: string, todoListId: string) => {
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const removeTask = (id: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== id)})
    }

    const changeIsDone = (newId: string, newIsDone: boolean, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(el => el.id === newId ? {...el, isDone: newIsDone} : el)
        })
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
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
            <ButtonAppBar />
            <Header addTodoList={addTodoList}/>
            <div className={s.todoListSection}>
                {todoListComponents}
            </div>
        </div>
    );
}

export default App;

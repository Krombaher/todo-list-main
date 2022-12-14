import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "../App";
import s from './css/Todolist.module.css'
import {MainEditableSpan} from "./universal-components/main-span/MainEditableSpan";
import {Button, Checkbox, Icon, IconButton, TextField} from "@mui/material";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import {Delete} from "@mui/icons-material";

export type PropsType = {
    filter: string
    tasks: TaskType[]
    nameTitle: string
    removeTask: (todoListId: string, taskId: string) => void
    addTask: (todoListId: string, title: string) => void
    changeIsDone: (todoListId: string, taskId: string, newIsDone: boolean) => void
    todoListId: string
    changeTodoListFilter: (todoListId: string, filter:FilterValuesType) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, title: string) => void
}

export const Todolist: React.FC<PropsType> = (
    {
        tasks,
        nameTitle,
        removeTask,
        addTask,
        changeIsDone,
        todoListId,
        changeTodoListFilter,
        removeTodoList,
        changeTodoListTitle,
        changeTaskTitle,
        filter
    }
) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && title.trim() !== '') {
            addTask(todoListId, title.trim())
            setTitle('')
        } else {
            setError('Enter text')
        }
    }

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            addTask(todoListId, title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const setAll = () => {
        changeTodoListFilter(todoListId, 'all')
    }

    const setComplete = () => {
        changeTodoListFilter(todoListId, 'completed')
    }

    const setActive = () => {
        changeTodoListFilter(todoListId, 'active')
    }

    const mappedTasks = tasks.map(t => {
        const changeTitleTaskHandler = (title: string) => {
            changeTaskTitle(todoListId, t.id, title)
        }
        const changeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            changeIsDone(todoListId, t.id, newIsDoneValue)
        }

        return (
            <li className={s.li + ' ' + (t.isDone ? s.isDone : '')}>
                <Checkbox key={t.id} checked={t.isDone} onChange={changeIsDoneHandler}/>
                <MainEditableSpan title={t.title} onChangeSpanHandler={changeTitleTaskHandler}/>
                <IconButton onClick={() => removeTask(todoListId, t.id)}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })

    const removeTodoListHandler = () => {
        removeTodoList(todoListId)
    }

    const onChangeSpanHandler = (title: string) => {
        changeTodoListTitle(todoListId, title)
    }

    return (
        <div className={s.todoListBlock}>
            <div className={s.removeTodoSection}>
                <MainEditableSpan onChangeSpanHandler={onChangeSpanHandler} title={nameTitle}/>
                <IconButton onClick={removeTodoListHandler}>
                    <Delete/>
                </IconButton>
            </div>
            <div className={s.addTaskSection}>
                <TextField
                    helperText={error}
                    error={!!error}
                    label="Enter text"
                    variant="outlined"
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <ControlPointIcon
                    style={{fontSize: '30px', marginLeft: '10px'}}
                    onClick={addTaskHandler}
                    color={'primary'}
                />
            </div>
            <ul className={s.taskBlock}>
                {mappedTasks}
            </ul>
            <div className={s.buttonBlock}>
                <Button size="medium" variant={filter === 'all' ? 'contained' : 'outlined'}
                        onClick={setAll}>All</Button>
                <Button size="medium" variant={filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={setComplete}>Complete</Button>
                <Button size="medium" variant={filter === 'active' ? 'contained' : 'outlined'}
                        onClick={setActive}>Active</Button>
            </div>
        </div>
    )
}
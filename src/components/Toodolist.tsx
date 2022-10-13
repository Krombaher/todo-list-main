import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {MainButton} from "./universal-components/main-button/MainButton";
import {MainCheckBox} from "./universal-components/main-checkbox/MainCheckBox";
import {MainInput} from "./universal-components/main-input/MainInput";
import {FilterValuesType, TaskType} from "../App";
import s from './css/Todolist.module.css'

export type PropsType = {
    filter:string
    tasks: TaskType[]
    nameTitle: string
    removeTask: (id: string, todoListId:string) => void
    addTask: (title: string, todoListId:string) => void
    changeIsDone: (newId: string, newIsDone: boolean, todoListId:string) => void
    todoListId: string
    changeTodoListFilter:(filter: FilterValuesType, todoListId: string) => void
    removeTodoList:(todoListId: string) => void
}

export const Todolist: React.FC<PropsType> = ({
                                                  tasks,
                                                  nameTitle,
                                                  removeTask,
                                                  addTask,
                                                  changeIsDone,
                                                  todoListId,
                                                  changeTodoListFilter,
                                                  removeTodoList
                                              }) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)
    const [activeButton, setActiveButton] = useState('all')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && title.trim() !== '') {
            addTask(title.trim(), todoListId)
            setTitle('')
        } else {
            setError('Enter text')
        }
    }

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            addTask(title.trim(), todoListId)
            setTitle('')
        } else {
            setError('Enter text')
        }
    }

    const setAll = () => {
        changeTodoListFilter ('all', todoListId)
        setActiveButton('all')
    }

    const setComplete = () => {
        changeTodoListFilter ('completed', todoListId)
        setActiveButton('completed')
    }

    const setActive = () => {
        changeTodoListFilter ('active', todoListId)
        setActiveButton('active')
    }

    const changeIsDoneHandler = (tId: string, isDone: boolean) => {
        changeIsDone(tId, isDone, todoListId)
    }

    const mappedTasks = tasks.map(t => {
        return (
            <li className={s.li + ' ' + (t.isDone ? s.isDone : '')}>
                <MainCheckBox key={t.id} checked={t.isDone}
                              callBack={(isDone: boolean) => changeIsDoneHandler(t.id, isDone)}/>
                <span>{t.title}</span>
                <MainButton classname={s.buttonRemove} name={'x'} callback={() => removeTask(t.id, todoListId)}/>
            </li>
        )
    })

    const removeTodoListHandler = () => {
        removeTodoList(todoListId)
    }

    return (
        <div className={s.todoListBlock}>
            <MainButton classname={s.button} name={'Delete'} callback={removeTodoListHandler}/>
            <h3>{nameTitle}</h3>
            <div>
                <MainInput
                    error={error}
                    value={title}
                    callback={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <MainButton
                    name={'+'}
                    classname={s.button}
                    callback={addTaskHandler}
                />
            </div>
            {error && <div className={s.errorMessage}>{error}</div>}
            <ul className={s.taskBlock}>
                {mappedTasks}
            </ul>
            <div>
                <MainButton classname={s.button + ' ' + (activeButton === 'all' ? s.activeFilter : '')} name={'All'}
                            callback={setAll}/>
                <MainButton classname={s.button + ' ' + (activeButton === 'completed' ? s.activeFilter : '')}
                            name={'Complete'} callback={setComplete}/>
                <MainButton classname={s.button + ' ' + (activeButton === 'active' ? s.activeFilter : '')}
                            name={'Active'} callback={setActive}/>
            </div>
        </div>
    )
}
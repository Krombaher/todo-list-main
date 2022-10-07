import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {MainButton} from "./universal-components/main-button/MainButton";
import {MainCheckBox} from "./universal-components/main-checkbox/MainCheckBox";
import {MainInput} from "./universal-components/main-input/MainInput";
import {FilterValuesType, TaskType} from "../App";
import s from './css/Todolist.module.css'

export type PropsType = {
    tasks: TaskType[]
    title: string
    removeTask:(id:string) => void
    addTask:(title: string) => void
    filter: FilterValuesType
    setFilter:(filter: FilterValuesType) => void
    changeIsDone:(newId:string, newIsDone:boolean) => void
}

export const Todolist = (props: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)
    const [activeButton, setActiveButton] = useState('')

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && title !== '') {
            props.addTask(title)
            setTitle('')
        } else {
            setError('Enter text')
        }
    }

    const addTaskHandler = () => {
        if (title !== '') {
            props.addTask(title)
            setTitle('')
        } else {
            setError('Enter text')
        }

    }

    const setAll = () => {
        props.setFilter('all')
        setActiveButton('all')
    }

    const setComplete = () => {
        props.setFilter('completed')
        setActiveButton('completed')
    }

    const setActive = () => {
        props.setFilter('active')
        setActiveButton('active')
    }

    const changeIsDoneHandler = (tId: string, isDone: boolean) => {
        props.changeIsDone(tId, isDone)
    }

    const mappedTasks = props.tasks.map(t => {
        return (
            <li className={s.li + ' ' + (t.isDone ? s.isDone : '')}>
                <MainCheckBox key={t.id} checked={t.isDone} callBack={(isDone:boolean) => changeIsDoneHandler(t.id, isDone)}/>
                <span>{t.title}</span>
                <MainButton classname={s.buttonRemove} name={'x'} callback={() => props.removeTask(t.id)}/>
            </li>
        )
    })

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <MainInput
                        value={title}
                        classname={`${s.input} ${error && s.errorInput}`}
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
                    <MainButton classname={s.button + ' ' + (activeButton === 'all' ? s.activeFilter : '')} name={'All'} callback={setAll}/>
                    <MainButton classname={s.button + ' ' + (activeButton === 'completed' ? s.activeFilter : '')} name={'Complete'} callback={setComplete}/>
                    <MainButton classname={s.button + ' ' + (activeButton === 'active' ? s.activeFilter : '')} name={'Active'} callback={setActive}/>
                </div>
            </div>
        </div>
    )
}
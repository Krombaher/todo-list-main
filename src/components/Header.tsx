import React, {ChangeEvent, useState} from "react";
import s from './css/Todolist.module.css'
import {MainInput} from "./universal-components/main-input/MainInput";
import {MainButton} from "./universal-components/main-button/MainButton";

export type HeaderPropsType = {
    addTodoList: (title: string) => void
}

export const Header = (props: HeaderPropsType) => {
    const [newTodoList, setNewTodoList] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodoList(e.currentTarget.value)
    }

    const addTodoHandler = () => {
        if (newTodoList.trim() !== '') {
            props.addTodoList(newTodoList)
            setNewTodoList('')
        }
    }

    return (
        <div className={s.header}>
            <MainInput value={newTodoList} classname={s.input} callback={onChangeHandler} onKeyPress={() => {
            }}/>
            <MainButton classname={s.button} name={'Add Todolist'} callback={addTodoHandler}/>
        </div>
    )
}
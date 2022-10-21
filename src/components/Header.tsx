import React, {ChangeEvent, useState} from "react";
import s from './css/Todolist.module.css'
import {Button, TextField} from "@mui/material";

export type HeaderPropsType = {
    addTodoList: (title: string) => void
}

export const Header: React.FC<HeaderPropsType> = ({addTodoList}) => {
    const [newTodoList, setNewTodoList] = useState('')
    const [error, setError] = useState<null | string>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodoList(e.currentTarget.value)
        setError('')
    }

    const addTodoHandler = () => {
        if (newTodoList.trim() !== '') {
            addTodoList(newTodoList)
            setNewTodoList('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div className={s.header}>
            <TextField
                helperText={error}
                error={!!error}
                label="Enter text"
                variant="outlined"
                value={newTodoList}
                onChange={onChangeHandler}
            />
            <Button style={ { marginLeft: '30px' } } size="medium" variant={'contained'} onClick={addTodoHandler}>Add</Button>
        </div>
    )
}
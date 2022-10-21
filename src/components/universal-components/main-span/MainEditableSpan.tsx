import React, {ChangeEvent, useState} from "react";
import s from './MainEditableSpan.module.css'
import {TextField} from "@mui/material";

type MainEditableSpanPropsType = {
    title: string
    onChangeSpanHandler: (text: string) => void
}

export const MainEditableSpan: React.FC<MainEditableSpanPropsType> = (
    {
        title,
        onChangeSpanHandler
    }
) => {

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setNewTitle(title)
    }

    const activateViewMode = () => {
        setEditMode(false)
        onChangeSpanHandler(newTitle)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    return (
        editMode ?
                <TextField variant="standard" onChange={onChangeTitleHandler} value={newTitle} onBlur={activateViewMode} autoFocus/> :
                <span className={s.span} onDoubleClick={activateEditMode}>{title}</span>
    )
}
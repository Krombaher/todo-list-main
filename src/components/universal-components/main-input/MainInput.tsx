import React, {ChangeEvent, KeyboardEvent} from "react";
import s from '../../css/Todolist.module.css'

type SuperInputPropsType = {
    value?: string | undefined
    callback:(e:ChangeEvent<HTMLInputElement>) => void | undefined
    onKeyPress:(e: KeyboardEvent<HTMLInputElement>) => void
    classname?:any
    error?: string | null
}

export const MainInput = (props:SuperInputPropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callback(e)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        props.onKeyPress(e)
    }

    const inputClass = (props.error) ? (s.input + ' ' + s.errorInput) : s.input

    return (
        <input value={props.value} className={inputClass} onKeyPress={onKeyPressHandler} onChange={onChangeHandler}/>
    )
}
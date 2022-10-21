import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from "react";
import s from '../../css/Todolist.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

type MainInputPropsType = Omit<DefaultInputPropsType, 'type'> & {
    callback: (e: ChangeEvent<HTMLInputElement>) => void | undefined
    onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void
    classname?: any
    error?: string | null
}

export const MainInput: React.FC<MainInputPropsType> = (
    {
        callback,
        onKeyPress,
        classname,
        error,
        ...restProps
    }
) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress(e)
    }

    const inputClass = (error) ? (s.input + ' ' + s.errorInput) : s.input

    return (
        <input className={inputClass} onKeyPress={onKeyPressHandler} onChange={onChangeHandler} {...restProps}/>
    )
}
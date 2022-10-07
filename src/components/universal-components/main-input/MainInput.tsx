import React, {ChangeEvent, KeyboardEvent} from "react";

type SuperInputPropsType = {
    value: string
    callback:(e:ChangeEvent<HTMLInputElement>) => void | undefined
    onKeyPress:(e: KeyboardEvent<HTMLInputElement>) => void
    classname?:any
}

export const MainInput = (props:SuperInputPropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callback(e)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        props.onKeyPress(e)
    }

    return (
        <input value={props.value} className={props.classname} onKeyPress={onKeyPressHandler} onChange={onChangeHandler}/>
    )
}
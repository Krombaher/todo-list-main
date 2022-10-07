import React from "react";

type MainButtonPropsType = {
    name: string
    callback: () => void
    classname?: string
}

export const MainButton: React.FC<MainButtonPropsType> = ({callback, name, classname = ''}) => {

    const onClickHandler = () => {
        callback()
    }

    return (
        <button className={classname} onClick={onClickHandler}>{name}</button>
    )
}
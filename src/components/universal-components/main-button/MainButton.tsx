import React from "react";

type MainButtonPropsType =  {
    name: string
    callback: () => void
}

export const MainButton: React.FC<MainButtonPropsType> = (
    {
        name,
        callback
    }

) => {

    const onClickHandler = () => {
        callback()
    }

    return (
        <button onClick={onClickHandler}>{name}</button>
    )
}
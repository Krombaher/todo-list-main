import React, {ChangeEvent} from "react";

type SuperCheckBoxPropsType = {
    checked: boolean
    callBack: (isDone: boolean) => void
}

export const MainCheckBox = (props:SuperCheckBoxPropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }

  return (
      <input type="checkbox" checked={props.checked} onChange={onChangeHandler}/>
  )
}
import React from "react";
import s from './css/Todolist.module.css'
import {MainInput} from "./universal-components/main-input/MainInput";
import {MainButton} from "./universal-components/main-button/MainButton";

export const Header = () => {
  return (
      <div className={s.header}>
            <MainInput classname={s.input} callback={()=> {}} onKeyPress={() => {}}/>
            <MainButton classname={s.button} name={'Add Todolist'} callback={()=> {}}/>
      </div>
  )
}
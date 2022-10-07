import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Toodolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const filterTask = (tasks:TaskType[], filter:string):TaskType[] => {
    if (filter === "active") return tasks.filter(t => !t.isDone);
    if (filter === "completed") return tasks.filter(t => t.isDone);

    return tasks
}

function App() {
    const [tasks, setTasks] = useState( [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all');
    const filteredTask = filterTask(tasks, filter)

    const changeIsDone = (newId: string, newIsDone: boolean) => {
        setTasks(tasks.map(el => el.id === newId ? {...el, isDone: newIsDone} : el))
    }

    const addTask = (title:string) => {
        let task = {id: v1(), title:title, isDone: false}
        let newTask = [task, ...tasks]
        setTasks(newTask)
    }

    const removeTask = (id:string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={filteredTask}
                removeTask={removeTask}
                addTask={addTask}
                filter={filter}
                setFilter={setFilter}
                changeIsDone={changeIsDone}
            />
        </div>
    );
}

export default App;

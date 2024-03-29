import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditabeSpan} from "./EditabeSpan";
import {Button, IconButton, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, idDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}
export type TaskType = {
    id: string;
    title: string
    isDone: boolean

}

export function Todolist(props: PropsType) {
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle:string) => {
        props.changeTodolistTitle(props.id , newTitle)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    debugger
    return <div>
        <h3> <EditabeSpan title={props.title} onChange={changeTodolistTitle}/>

            <IconButton aria-label="delete" color="inherit" onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement> ) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    };
                    const onChangeTitleHandler = (newValue:string ) => {
                       props.changeTaskTitle(t.id, newValue, props.id)
                    };

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox

                        onChange={onChangeStatusHandler}
                        checked={t.isDone}/>
                        <EditabeSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton aria-label="delete" color="inherit" onClick={onClickHandler}>
                            <Delete />
                        </IconButton>

                    </div>
                })
            }


        </div>
        <div>
            <Button variant={props.filter == 'all' ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
            <Button color={"primary"} variant={props.filter == 'active' ? "contained" : "text"} onClick={onActiveClickHandler}>Active</Button>
            <Button color={"secondary"} variant={props.filter == 'completed' ? "contained" : "text"} onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}


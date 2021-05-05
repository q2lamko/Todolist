import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type AddItemFormPropsType = {
    addItem: (title: string) => void;

}

export function AddItemForm(props: AddItemFormPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null)

    const OnNewChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle("");
        } else {
            setError("Pustoe pole")
        }
    }


    return <div>
        <input
            value={newTaskTitle}
            onChange={OnNewChange}
            onKeyPress={onKeyPressHandler}
            className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className='error-message'>{error}</div>}
    </div>
}
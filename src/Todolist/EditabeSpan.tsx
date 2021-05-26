import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditabeSpanPropsType = {
    title: string
    onChange: (newValue: string) => void

}

export function EditabeSpan(props: EditabeSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    let activateMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    let activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <TextField
            value={title}
            onChange={onChangeTitleHandler}
            onBlur={activateViewMode}
            autoFocus/>
        : <span onDoubleClick={activateMode}>{props.title}</span>
}
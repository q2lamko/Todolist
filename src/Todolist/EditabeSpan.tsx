import React, {ChangeEvent, useState} from "react";

type EditabeSpanPropsType = {
    title: string

}

export function EditabeSpan(props: EditabeSpanPropsType) {
    let[editMode, setEditMode]=useState(false)
    let[title, setTitle]=useState("")

    let activateMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    let activateViewMode = () => setEditMode(false)

    const onChangeTitleHandler= (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateMode}>{props.title}</span>
}
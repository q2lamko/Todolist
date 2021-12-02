import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist/Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./Todolist/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./state/store";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const dispatch = useDispatch()
    const todolists = useSelector<AppStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppStateType, TasksStateType>(state => state.tasks)

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string,) {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }

    let removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }

    function addTodolist(title: string) {
        dispatch(addTodolistAC(title))

    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{marginBottom: "10px", marginTop: "10px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodoList = tasks[tl.id];
                            if (tl.filter === "completed") {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone);
                            }
                            if (tl.filter === "active") {
                                tasksForTodoList = tasksForTodoList.filter(t => !t.isDone);
                            }
                            return <Grid item>
                                <Paper style={{padding: "15px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

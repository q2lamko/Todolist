import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist/Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./Todolist/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import classes from "*.module.css";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


function AppWithReducers() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "35", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "C++", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "book", isDone: false},
            {id: v1(), title: "shoose", isDone: false},
        ],
    })
    let [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "what to learn", filter: "all"},
        {id: todolistId2, title: "what to buy", filter: "all"},
    ])

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasksReducer(action)
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string,) {
        dispatchToTodolistReducer(changeTodolistFilterAC(todolistId, value))
    }

    let removeTodolist = (todolistId: string) => {
        dispatchToTodolistReducer(removeTodolistAC(todolistId))
        dispatchToTasksReducer(removeTodolistAC(todolistId))
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        dispatchToTodolistReducer(changeTodolistTitleAC(todolistId, newTitle))
    }

    function addTodolist(title: string) {
        dispatchToTodolistReducer(addTodolistAC(title))
        dispatchToTasksReducer(addTodolistAC(title))
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
                            let tasksForTodoList = tasksObj[tl.id];
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

export default AppWithReducers;

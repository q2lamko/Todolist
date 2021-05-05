import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist/Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./Todolist/AddItemForm";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistTYpe = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
[key:string]:Array<TaskType>
}

function App() {


    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj})
    }

    function changeStatus(taskId: string, idDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = idDone;
            setTasks({...tasksObj})
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string,) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolist([...todolists])
        }
    }

    let removeTodolist = (todolistId: string) => {
        let filteredTodolists = todolists.filter((tl) => tl.id !=todolistId)
        setTodolist(filteredTodolists);
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }

    let todolistId1 = v1();
    let todolistId2 = v1();
    let [tasksObj, setTasks] = useState<TasksStateType>({
            [todolistId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "35", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "C++", isDone: false}
            ], [todolistId2]: [
                {id: v1(), title: "book", isDone: false},
                {id: v1(), title: "shoose", isDone: false},
            ],
        }
    )

    let [todolists, setTodolist] = useState<Array<TodolistTYpe>>([
        {id: todolistId1, title: "what to learn", filter: "all"},
        {id: todolistId2, title: "what to buy", filter: "all"},
    ])

function addTodolist(title:string) {
        let todolist: TodolistTYpe = {
           id: v1(),
           filter: "all",
           title: title
        }
    setTodolist([todolist, ...todolists])
    setTasks({...tasksObj,
    [todolist.id]:[]
    })
}

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {
                todolists.map((tl) => {


                    let tasksForTodoList = tasksObj[tl.id];
                    debugger;

                    if (tl.filter === "completed") {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone);
                    }
                    if (tl.filter === "active") {
                        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone);
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }

        </div>
    );
}

export default App;

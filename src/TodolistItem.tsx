import type {FilterValues, Task} from './App'
import {Button} from './Button'
import {ChangeEvent, useState} from "react";
import * as React from "react";


type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    addTask: (title: string) => void
}

export const TodolistItem = ({
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 addTask
                             }: Props) => {

    const [newTitle, setNewTitle] = useState('')

    // const changeFilterAllHandler = () => changeFilter('all')
    // const changeFilterActiveHandler = () => changeFilter('active')
    // const changeFilterCompletedHandler = () => changeFilter('completed')

    const changeFilterHandler = (value: FilterValues) => {
        changeFilter(value)
    }

    const deleteTaskHandler = (taskId: string) => {
        deleteTask(taskId)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)

    const addTaskHandler = () => {
        addTask(newTitle)
        setNewTitle('')
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }


        return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={newTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                />
                <Button title={'+'}
                        onClick={addTaskHandler}
                />
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'x'}
                                        onClick={() => deleteTaskHandler(task.id)}
                                />
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'}
                        onClick={() => changeFilterHandler('all')}
                />
                <Button title={'Active'}
                        onClick={() => changeFilterHandler('active')}
                />
                <Button title={'Completed'}
                        onClick={() => changeFilterHandler('completed')}
                />
            </div>
        </div>
    )
}

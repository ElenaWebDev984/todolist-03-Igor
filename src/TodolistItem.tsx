import type {FilterValues, Task} from './App'
import {Button} from './Button'
import {KeyboardEvent, ChangeEvent, useState} from "react";


type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    addTask: (title: string) => void
    changeIsDone: (taskId: string, isDone: boolean) => void
}

export const TodolistItem = ({
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 addTask,
                                 changeIsDone,
                             }: Props) => {

    const [newTitle, setNewTitle] = useState('')

    const mappedTasks = tasks.map(task => {
        const deleteTaskHandler = (taskId: string) => deleteTask(taskId)

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeIsDone(task.id, e.currentTarget.checked)
        }

        return (
            <li key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={onChangeHandler}
                />
                <span>{task.title}</span>
                <Button title={'x'}
                        onClick={() => deleteTaskHandler(task.id)}
                />
            </li>
        )
    })


    const changeFilterHandler = (value: FilterValues) => {
        changeFilter(value)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (newTitle.trim()) {
            addTask(newTitle.trim())
            setNewTitle('')
        }
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
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
                    {mappedTasks}
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

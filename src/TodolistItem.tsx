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
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState<FilterValues>('all')

    const onChangeHandler = (taskId: string, isDone: boolean) => {
        changeIsDone(taskId, isDone)
    }

    const mappedTasks = tasks.map(task => {
        const deleteTaskHandler = (taskId: string) => deleteTask(taskId)


        return (
            <li className={task.isDone ? 'isDone' : ''}
                key={task.id}
            >
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={(e) => onChangeHandler(task.id, e.currentTarget.checked)}
                />
                <span>{task.title}</span>
                <Button title={'x'}
                        onClick={() => deleteTaskHandler(task.id)}
                />
            </li>
        )
    })


    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(filter)
        setFilter(filter)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (newTitle.trim()) {
            addTask(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required!')
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
                <input className={error ? 'error' : ''}
                       value={newTitle}
                       onChange={onChangeTitleHandler}
                       onKeyDown={onKeyDownHandler}
                />
                <Button title={'+'}
                        onClick={addTaskHandler}
                />
                {error &&  <p className={'errorMessage'}>{error}</p>}

            </div>

            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {mappedTasks}
                </ul>
            )}
            <div>
                <Button className={filter === 'all' ? 'activeFilter' : ''}
                        title={'All'}
                        onClick={() => changeFilterHandler('all')}
                />
                <Button className={filter === 'active' ? 'activeFilter' : ''}
                        title={'Active'}
                        onClick={() => changeFilterHandler('active')}
                />
                <Button className={filter === 'completed' ? 'activeFilter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilterHandler('completed')}
                />
            </div>
        </div>
    )
}

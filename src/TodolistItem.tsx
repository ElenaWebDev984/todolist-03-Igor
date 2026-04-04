import type {FilterValues, Task} from './App'
import {Button} from './Button'
import {useState} from "react";


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




    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={newTitle}
                       onChange={(e) => setNewTitle(e.currentTarget.value)}
                />
                <Button title={'+'}
                        onClick={() => {
                            addTask(newTitle)
                            setNewTitle('')
                        }}
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
                                        onClick={() => deleteTask(task.id)}
                                />
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'}
                        onClick={() => changeFilter('all')}
                />
                <Button title={'Active'}
                        onClick={() => changeFilter('active')}
                />
                <Button title={'Completed'}
                        onClick={() => changeFilter('completed')}
                />
            </div>
        </div>
    )
}

import type {FilterValues, Task} from './App'
import {Button} from './Button'
import {useRef} from "react";

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

    const inputRef = useRef<HTMLInputElement>(null)
    console.log(inputRef.current)


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input ref={inputRef}/>
                <Button title={'+'}
                        onClick={() => {
                            if (inputRef.current) {
                                addTask(inputRef.current.value)
                                inputRef.current.value = ''
                            }
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

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTasks, isFetching, reset, tasks as tasksSelector } from '../../../features/task/tasksSlice'
import TopControll from '../../commonComponents/TopControll'
import NewTask from './NewTask'
import Task from './Task'


const Tasks = ({ projectId, editable }) => {
    const [newTaskMenuOpen, setNewTaskMenuOpen] = useState(false)
    const dispatch = useDispatch()
    const tasks = useSelector(tasksSelector)
    const pending = useSelector(isFetching)
    const handleToggleMenuOpen = () => {
        setNewTaskMenuOpen(prev => !prev)
    }
    // console.log(tasks)

    useEffect(
        () => {
            if (tasks.length === 0 && !pending.tasksLoading) {
                dispatch(getTasks(projectId))
            }
        }, [dispatch, tasks.length, pending.tasksLoading, projectId]
    )

    useEffect(
        () => {
            return () => {
                dispatch(reset())
            }
        }, [dispatch]
    )

    return (
        <>
            <TopControll disabled={editable} createNewText='New Task' listText='Tasks' open={newTaskMenuOpen} toggleOpen={handleToggleMenuOpen} />
            <NewTask projectId={projectId} open={newTaskMenuOpen} />
            {tasks.map((task, i) => {
                return (
                    <Task key={i} projectId={projectId} task={task} />
                )
            })}

        </>

    )
}

export default Tasks
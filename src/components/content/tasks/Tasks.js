import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getTasks, isFetched, isFetching, reset, tasks as tasksSelector } from '../../../features/task/tasksSlice'
import TopControll from '../../commonComponents/TopControll'
import ProjectSkeleton from '../projects/ProjectSkeleton'
import NewTask from './NewTask'
import Task from './Task'


const Tasks = ({ projectId, editable }) => {
    const taskRef = useRef(null)
    const history = useHistory()
    const [newTaskMenuOpen, setNewTaskMenuOpen] = useState(false)
    const dispatch = useDispatch()
    const tasks = useSelector(tasksSelector)
    const pending = useSelector(isFetching)
    const isFirstLoadComplete = useSelector(isFetched)
    const handleToggleMenuOpen = () => {
        setNewTaskMenuOpen(prev => !prev)
    }



    useEffect(
        () => {
            if (tasks.length === 0 && !pending.tasksLoading && !isFirstLoadComplete) {
                dispatch(getTasks(projectId))
            }
        }, [dispatch, tasks.length, pending.tasksLoading, projectId, isFirstLoadComplete]
    )

    useEffect(
        () => {
            return () => {
                dispatch(reset())
            }
        }, [dispatch]
    )

    const tasksPreload = () => {
        let result = []
        for (let i = 0; i < 5; i++) {
            result.push(<ProjectSkeleton key={i} />)
        }
        return result
    }

    return (
        <>
            <TopControll context='tasks' disabled={editable} createNewText='New Task' listText='Tasks'
                open={newTaskMenuOpen} toggleOpen={handleToggleMenuOpen} />
            <NewTask projectId={projectId} open={newTaskMenuOpen} />
            {pending.tasksLoading ? tasksPreload() :
                tasks.length ? tasks.map((task, i) => {
                    return (
                        <Task propRef={taskRef} hash={history.location.hash} key={i} projectId={projectId} task={task} />
                    )
                }) : <h1>No tasks created yet</h1>}
        </>

    )
}

export default Tasks
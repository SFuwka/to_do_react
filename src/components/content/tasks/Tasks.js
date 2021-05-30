import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getTasks, isFetched, isFetching, reset, taskPage, tasks as tasksSelector } from '../../../features/task/tasksSlice'
import TopControll from '../../commonComponents/TopControll'
import ProjectSkeleton from '../projects/ProjectSkeleton'
import NewTask from './NewTask'
import Task from './Task'
import InfiniteScroll from 'react-infinite-scroll-component'



const Tasks = ({ projectId, editable }) => {
    const taskRef = useRef(null)
    const history = useHistory()
    const [newTaskMenuOpen, setNewTaskMenuOpen] = useState(false)
    const dispatch = useDispatch()
    const [lookingForTask, setLookingForTask] = useState(false)
    const tasks = useSelector(tasksSelector)
    const pending = useSelector(isFetching)
    const page = useSelector(taskPage)
    const isFirstLoadComplete = useSelector(isFetched)
    const handleToggleMenuOpen = () => {
        setNewTaskMenuOpen(prev => !prev)
    }

    useEffect(
        () => {
            if (tasks.length === 0 && !pending.tasksLoading && !isFirstLoadComplete) {
                dispatch(getTasks(projectId))
            }
        }, [dispatch, tasks.length, pending.tasksLoading, projectId, isFirstLoadComplete, history.location]
    )

    useEffect(
        () => {
            if (!tasks.length) return
            history.location.hash && setLookingForTask(true)
            let t = tasks.find(task => {
                return task._id === history.location.hash.slice(1)
            })
            if (!t && !pending.tasksLoading && history.location.hash && page.currentPage <= page.totalPagesCount) {
                dispatch(getTasks(projectId, page.currentPage))
            }
            if (t) setLookingForTask(false)
        }, [history.location.hash, tasks, dispatch, page.currentPage, pending.tasksLoading, projectId, page.totalPagesCount]
    )

    useEffect(
        () => {
            return () => {
                dispatch(reset())
            }
        }, [dispatch]
    )

    const fetchMore = () => {
        dispatch(getTasks(projectId, page.currentPage))
    }

    const tasksPreload = () => {
        let result = []
        for (let i = 0; i < 5; i++) {
            result.push(<ProjectSkeleton key={i} />)
        }
        return result
    }


    if (!isFirstLoadComplete) return tasksPreload()
    if (lookingForTask) return tasksPreload()

    return (
        <>
            <TopControll context='tasks' disabled={editable} createNewText='New Task' listText='Tasks'
                open={newTaskMenuOpen} toggleOpen={handleToggleMenuOpen} />
            <NewTask projectId={projectId} open={newTaskMenuOpen} />

            {(isFirstLoadComplete && !tasks.length) ? <h2>No tasks created yet :(</h2> : < InfiniteScroll
                dataLength={page.currentPage}
                hasMore={page.currentPage <= page.totalPagesCount}
                next={fetchMore}
                loader={<ProjectSkeleton />}
                scrollableTarget='content'
            > {tasks.map((task, i) => {
                return (
                    <Task propRef={taskRef} hash={history.location.hash} key={i} projectId={projectId} task={task} />
                )
            })} </InfiniteScroll>}
        </>

    )
}

export default Tasks
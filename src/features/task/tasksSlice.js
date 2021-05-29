import { createSlice } from '@reduxjs/toolkit';
import { COMPLETE_STATUS, CREATE, DELETE, EDIT, TASKS_LOADING } from '../actions';
import taskApi from './apiCalls';

const TASKS_PER_REQUEST = 20

const initialState = {
    tasks: [],
    pending: {
        create: false,
        tasksLoading: false,
        delete: [],
        edit: [],
        completeStatus: [],
    },
    taskPage: {
        currentPage: 1,
        totalPagesCount: 0,
    },
    isFetched: false,
    editMode: [],
    error: null
}


export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        pending: (state, action) => {
            if ([DELETE, EDIT, COMPLETE_STATUS].some(item => item === action.payload.action)) {
                state.pending[action.payload.action] = [...state.pending[action.payload.action], action.payload.id]
                return
            }
            state.pending[action.payload.action] = true
        },
        stopPending: (state, action) => {
            if ([DELETE, EDIT, COMPLETE_STATUS].some(item => item === action.payload.action)) {
                state.pending[action.payload.action] = [...state.pending[action.payload.action].filter(id => id !== action.payload.id)]
                return
            }
            state.pending[action.payload.action] = false
        },
        firstLoadComplete: state => {
            state.isFetched = true
        },
        setTasks: (state, action) => {
            state.tasks = [...state.tasks, ...action.payload]
        },
        turnEditModeOn: (state, action) => {
            state.editMode = [...state.editMode, action.payload]
        },
        turnEditModeOff: (state, action) => {
            state.editMode = [...state.editMode.filter(id => id !== action.payload)]
        },
        addTaskToBegining: (state, action) => {
            state.tasks = [action.payload, ...state.tasks]
        },
        updateTask: (state, action) => {
            let isFinded = false
            state.tasks = state.tasks.map(task => {
                if (!isFinded && task._id === action.payload._id) {
                    isFinded = true
                    return action.payload
                }
                return task
            })

        },
        updateTaskCompleteStatus: (state, action) => {
            let isFinded = false
            state.tasks = state.tasks.map(task => {
                if (!isFinded && task._id === action.payload._id) {
                    isFinded = true
                    return { ...task, finished: !task.finished }
                }
                return task
            })
        },
        setPagesCount: (state, action) => {
            state.taskPage.totalPagesCount = action.payload
        },
        incrementPage: state => {
            state.taskPage.currentPage++
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task._id !== action.payload)
        },
        reset: () => initialState
    }
})

export const { pending, stopPending, setTasks, addTaskToBegining, turnEditModeOn, turnEditModeOff,
    deleteTask, updateTask, updateTaskCompleteStatus, reset, firstLoadComplete, setPagesCount, incrementPage } = taskSlice.actions

//selectors
export const isFetching = state => state.task.pending
export const tasks = state => state.task.tasks
export const error = state => state.task.error
export const isFetched = state => state.task.isFetched
export const taskEditMode = state => state.task.editMode
export const taskPage = state => state.task.taskPage

//thunks
export const createTask = (projectId, task) => dispatch => {
    dispatch(pending({ action: CREATE }))
    taskApi.newTask(projectId, task).then(res => {
        dispatch(addTaskToBegining(res.task))
        dispatch(stopPending({ action: CREATE }))
    })
}

export const getTasks = (projectId, page) => dispatch => {
    dispatch(pending({ action: TASKS_LOADING }))
    taskApi.getTasks(projectId, page).then(res => {
        dispatch(firstLoadComplete())
        if (res.data.tasks) {
            dispatch(setTasks(res.data.tasks))
            dispatch(stopPending({ action: TASKS_LOADING }))
            dispatch(incrementPage())
            dispatch(setPagesCount(Math.ceil(res.data.tasksCount / TASKS_PER_REQUEST)))
        } else {
            dispatch(stopPending({ action: TASKS_LOADING }))
        }
    })
}

export const editTask = (projectId, taskId, task) => dispatch => {
    dispatch(pending({ action: EDIT, id: taskId }))
    taskApi.editTask(projectId, taskId, task).then(res => {
        if (res.data.task) {
            dispatch(updateTask(res.data.task))
            dispatch(stopPending({ action: EDIT, id: taskId }))
            dispatch(turnEditModeOff(taskId))
        }
    })
}

export const changeCompleteStatus = (projectId, taskId, status) => dispatch => {
    dispatch(pending({ action: COMPLETE_STATUS, id: taskId }))
    const startFetchTime = new Date()
    taskApi.changeCompleteStatus(projectId, taskId, { status }).then(res => {
        dispatch(updateTaskCompleteStatus({ _id: taskId }))
        const endFetch = new Date()
        const test = setTimeout(() => {
            dispatch(stopPending({ action: COMPLETE_STATUS, id: taskId }))
        }, 2000)
        if ((endFetch - startFetchTime) > 2000) {
            dispatch(stopPending({ action: COMPLETE_STATUS, id: taskId }))
            clearTimeout(test)
        }
    })


}

export const removeTask = (projectId, taskId) => dispatch => {
    dispatch(pending({ action: DELETE, id: taskId }))
    taskApi.deleteTask(projectId, taskId).then(res => {
        dispatch(deleteTask(taskId))
        dispatch(stopPending({ action: DELETE, id: taskId }))
    })
}

export default taskSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { CREATE, DELETE, TASKS_LOADING } from '../actions';
import taskApi from './apiCalls';

const initialState = {
    tasks: [],
    pending: {
        create: false,
        tasksLoading: false,
        delete: [],
    },
    isFetched: false,
    error: null
}


export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        pending: (state, action) => {
            if (action.payload.action === DELETE) {
                state.pending[action.payload.action] = [...state.pending[action.payload.action], action.payload.id]
                return
            }
            state.pending[action.payload.action] = true
        },
        stopPending: (state, action) => {
            if (action.payload.action === DELETE) {
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
        addTaskToBegining: (state, action) => {
            state.tasks = [action.payload, ...state.tasks]
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task._id !== action.payload)
        },
        reset: () => initialState
    }
})

export const { pending, stopPending, setTasks, addTaskToBegining, deleteTask, reset, firstLoadComplete } = taskSlice.actions

//selectors
export const isFetching = state => state.task.pending
export const tasks = state => state.task.tasks
export const error = state => state.task.error
export const isFetched = state => state.task.isFetched

//thunks
export const createTask = (projectId, task) => dispatch => {
    dispatch(pending({ action: CREATE }))
    taskApi.newTask(projectId, task).then(res => {
        dispatch(addTaskToBegining(res.task))
        dispatch(stopPending({ action: CREATE }))
    })
}

export const getTasks = (projectId) => dispatch => {
    dispatch(pending({ action: TASKS_LOADING }))
    taskApi.getTasks(projectId).then(res => {
        dispatch(firstLoadComplete())
        if (res.data.tasks) {
            dispatch(setTasks(res.data.tasks))
            dispatch(stopPending({ action: TASKS_LOADING }))
        } else {
            dispatch(stopPending({ action: TASKS_LOADING }))
        }
    })
}

export const removeTask = (projectId, taskId) => dispatch => {
    dispatch(pending({ action: DELETE, id: taskId }))
    taskApi.deleteTask(projectId, taskId).then(res => {
        console.log(res)
        dispatch(deleteTask(taskId))
        dispatch(stopPending({ action: DELETE, id: taskId }))
    })
}

export default taskSlice.reducer;
